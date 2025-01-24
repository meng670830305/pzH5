<template>
  <div class="container">
    <div class="header">My予約</div>
    <van-tabs v-model:active="active"
              @click-tab="onClickTab">
      <van-tab title="全部"
               name="" />
      <van-tab title="支払待"
               name="1" />
      <van-tab title="来院待"
               name="2" />
      <van-tab title="対応済"
               name="3" />
      <van-tab title="取消済"
               name="4" />
    </van-tabs>
    <van-row v-for="item in order"
             :key="item.out_trade_no"
             @click="goDetail(item)">
      <van-col span="5">
        <van-image width="50"
                   height="50"
                   radius="5"
                   :src="item.serviceImg" />
      </van-col>
      <van-col span="14">
        <div class="text1">{{ item.service_name }}</div>
        <div class="text2">
          <div>{{ item.hospital_name }}</div>
          <div> {{`予約日付${item.starttime}`}}</div>
        </div>
      </van-col>
      <van-col span="5"
               class="text2"
               :style="{color:colorMap[item.trade_state]}">
        {{ item.trade_state }}
        <counter :second="item.timer"
                 v-if="item.trade_state==='待支付' " />
      </van-col>
    </van-row>
    <div class="bottom-text">以上です</div>
  </div>
</template>
<script setup>
import { ref, getCurrentInstance, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import counter from '../../components/counter.vue'
const router = useRouter()
onMounted(() => {
  getOrderList('')
})
const colorMap = {
  '待支付': '#ffa200',
  '待服务': '#1da6fd',
  '已完成': '#21c521',
  '已取消': '#999999',
}
const { proxy } = getCurrentInstance()
//getOrderList
const order = ref()
const getOrderList = async (state) => {
  const { data } = await proxy.$api.orderList({ state })
  console.log(data)
  order.value = data.data
  //支払待2時間
  data.data.forEach(item => {
    item.timer = item.order_start_time + 7200000 - Date.now()
  })

}
const onClickTab = (item) => {
  getOrderList(item.name)
}
//orderDetail
const goDetail = (item) => {
  router.push({ path: '/detail', query: { oid: item.out_trade_no } })
}
const active = ref()
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
  font-weight: bold;
}
.van-row {
  background-color: #fff;
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  .text1 {
    font-size: 16px;
    line-height: 25px;
    font-weight: bold;
  }
  .text2 {
    font-size: 14px;
    line-height: 20px;
    color: #999999;
  }
}
.bottom-text {
  font-size: 8px;
  line-height: 50px;
  text-align: center;
  color: #999999;
}
</style>