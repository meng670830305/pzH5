<template>
  <div class="container">
    <div class="user">
      <van-image class="img"
                 :src="userInfo.avatar"
                 round
                 width="100"
                 height="100" />
      <div class="text">{{ userInfo.name }}</div>
    </div>
    <div class="order">
      <div class="top">
        <div class="text1">My注文</div>
        <div class="text2">全部</div>
      </div>
      <div class="buttom">
        <div class="item">
          <van-image @click="goOrder(1)"
                     width="40"
                     height="40"
                     src="/images/od_10.png">
          </van-image>
          <div>支払待</div>
        </div>
        <div class="item">
          <van-image @click="goOrder(2)"
                     width="40"
                     height="40"
                     src="/images/od_20.png">
          </van-image>
          <div>来院待</div>
        </div>
        <div class="item">
          <van-image @click="goOrder(3)"
                     width="40"
                     height="40"
                     src="/images/od_30.png">
          </van-image>
          <div>対応済</div>
        </div>
        <div class="item">
          <van-image @click="goOrder(4)"
                     width="40"
                     height="40"
                     src="/images/od_40.png">
          </van-image>
          <div>取消済</div>
        </div>
      </div>
    </div>
    <div class="foot">
      <div class="foot1">
        <div class="text1">
          <van-image width="20"
                     height="20"
                     src="/images/ic_clients.png" />
          予約オプション管理
        </div>
        <div class="text2">
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="foot2">
        <div class="text1">
          <van-image width="20"
                     height="20"
                     src="/images/ic_share.png" />
          シェアする
        </div>
        <div class="text2">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
    <van-button class="quit"
                type="danger"
                size="large"
                @click="showLogout=true">ログアウト</van-button>
    <van-dialog v-model:show="showLogout"
                @cancel="
                showLogout=false"
                @confirm="logout"
                show-cancel-button
                title="ログアウト">
      <div class="quit_text">ログアウトしますか？</div>
    </van-dialog>

  </div>

</template>
<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userInfo = computed(() => {
  return JSON.parse(localStorage.getItem('h5_userInfo')) || {}
})

//orderへ
const goOrder = (active) => {
  router.push(`/order?active=${active}`)
}
//logout
const showLogout = ref(false)
const logout = () => {
  localStorage.removeItem('h5_token')
  localStorage.removeItem('h5_userInfo')
  router.push('/login')
}

</script>

<style lang="less" scoped>
.container {
  background-color: #f0f0f0;
  height: 100vh;
  overflow: hidden;
  .user {
    width: 95%;
    height: 200px;
    background-color: #fff;
    text-align: center;
    border-radius: 10px;
    margin: 10px;
    .img {
      margin-top: 30px;
    }
    .text {
      line-height: 30px;
      font-weight: bold;
    }
  }
  .order {
    width: 90%;
    margin: 10px;
    border-radius: 5px;
    background-color: #fff;
    padding: 10px;
    .top {
      margin: 10px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      .text1 {
        color: #333;
      }
      .text2 {
        color: #999;
      }
      border-bottom: 0.5px solid #f5f5f5;
    }
    .buttom {
      padding: 10px;
      display: flex;
      justify-content: space-around;
      .item {
        font-size: 14px;
        color: #999;
      }
    }
  }
  .foot {
    margin: 0 10px;
    padding: 10px;
    line-height: 50px;
    background-color: #fff;
    .foot1,
    .foot2 {
      display: flex;
      justify-content: space-between;
      color: #555;
    }
    .foot1 {
      border-bottom: 0.5px solid #f5f5f5;
    }
  }
  .quit {
    width: 90%;
    margin: 20px;
  }
  .quit_text {
    margin: 20px 0;
    text-align: center;
  }
}
</style>