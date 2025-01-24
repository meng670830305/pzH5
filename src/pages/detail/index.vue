<template>
  <div class="container">
    <div class="header">
      <van-icon @click="goBack"
                name="arrow-left"
                class="header-left"
                size="30" />
      予約詳細
    </div>
    <status-bar :item="stateMap[detailData.trade_state]" />
    <div class="tips">
      <div class="dzf"
           v-if="detailData.trade_state==='待支付'">
        <div class="text1"> 予約支払い</div>
        <div class="text2">
          <counter :second="second" />まで支払ってください,支払時間超えた場合、予約は自動キャンセルされます
        </div>
        <div class="text3">
          <van-button @click="showCode=true"
                      type="success">
            支払い
          </van-button>
        </div>
      </div>
      <div class="dzf"
           v-if="detailData.trade_state==='待服务'">
        <div class="text1">
          予約をお取りしますので、クリニックからの連絡をお待ちください。
        </div>
        <div class="text2">ご指定の電話番号へこちらからご連絡いたします。しばらくお待ちください。</div>
      </div>
      <div class="dzf"
           v-if="detailData.trade_state==='已完成'">
        <div class="text1">
          対応済・・・
        </div>
        <div class="text2">ご利用いただきありがとうございます。</div>
      </div>
      <div class="dzf"
           v-if="detailData.trade_state==='已取消'">
        <div class="text1">
          取消済・・・
        </div>
        <div class="text2">予約がキャンセルされました。</div>
      </div>
    </div>
    <!-- 予約内容 -->
    <van-cell-group class="card">
      <div class="header-text">予約内容</div>
      <van-cell v-for="(item,key) in orderInfo"
                :key="key"
                :title="item"
                :value="formatData(key)">
      </van-cell>
    </van-cell-group>
    <!-- 注文内容 -->
    <van-cell-group class="card">
      <div class="header-text">予約内容</div>
      <van-cell v-for="(item,key) in billInfo"
                :key="key"
                :title="item"
                :value="formatData(key)">
      </van-cell>
    </van-cell-group>
    <!-- QRコードPOPUP -->
    <van-dialog v-model:show="showCode"
                :show-confirm-button="false">
      <van-icon name="cross"
                class="close"
                @click="closeQrcode" />
      <div>Line支払い</div>
      <van-image :src="codeImage"
                 width="150"
                 height="150" />
      <div>QRコードをスキャンしてください。</div>
    </van-dialog>
  </div>

</template>
<script setup>
import { ref, getCurrentInstance, reactive, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import statusBar from '../../components/statusBar.vue';
import counter from '../../components/counter.vue';
import QRcode from 'qrCode';

const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute()

//画面項目定義
const detailData = reactive({})
onMounted(async () => {
  const { data } = await proxy.$api.orderDetail({ oid: route.query.oid })
  //レスポンスデータを画面項目に反映
  Object.assign(detailData, data.data)
  console.log(detailData, 'detailData')
  if (detailData.trade_state === '待支付') {
    QRcode.toDataURL(data.data.code_url).then((url) => {
      codeImage.value = url
    })
  }
}
)
//カウントダウン
const second = computed(() => {
  return detailData.order_start_time ? detailData.order_start_time + 7200000 - Date.now() : 0
})
//state enumerate
const stateMap = {
  '待支付': 10,
  '待服务': 20,
  '已完成': 30,
  '已取消': 40,
}
const goBack = () => {
  router.go(-1)
}
//QRcode表示
const showCode = ref(false)
const codeImage = ref('')
const closeQrcode = () => {
  showCode.value = false
}
//orderDetail
const orderInfo = {
  service_name: 'オプション内容',
  hospital_name: 'クリニック名',
  starttime: '予約日付',
  'client.name': '顧客名',
  'client.mobile': '顧客携帯',
  receiveAddress: '顧客住所',
  demand: '顧客メモ',
}
//billDetail
const billInfo = {
  tell: '予約者携帯',
  order_start_time: '注文日付',
  price: '金額',
  out_trade_no: '注文番号',
}
//format関数
const formatData = (key) => {
  if (key.indexOf(".") === -1) {
    if (key === "order_start_time") {
      return formatTimestamp(detailData[key]);
    }
    return detailData[key];
  }
  let arr = key.split(".").reduce((o, p) => {
    return (o || {})[p];
  }, detailData);
  return arr;
}
function formatTimestamp (timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 月は0から始まりので、+1必要
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

</script>

<style lang="less" scoped>
.container {
  background-color: #f0f0f0;
  height: 100vh;
}
.header {
  background-color: #fff;
  line-height: 40px;
  text-align: center;
  .header-left {
    float: left;
  }
}
.card {
  margin: 15px 0;
  padding: 10px;
  .header-text {
    padding-left: 5px;
    line-height: 30px;
    font-size: 16px;
    font-weight: bold;
    border-left: 4px solid red;
  }
}
.dzf {
  padding: 20px;
  .text1 {
    font-size: 20px;
    font-weight: bold;
    line-height: 30px;
    color: #666;
  }
  .text2 {
    font-size: 14px;
    color: #666;
  }
  .text3 {
    text-align: center;
    .van-button {
      margin-top: 10px;
      margin-left: 10px;
      width: 80%;
      font-weight: bold;
    }
  }
}
::v-deep(.van-dialog__content) {
  text-align: center;
  padding: 20px;
  .close {
    position: absolute;
    left: 20px;
  }
}
</style>