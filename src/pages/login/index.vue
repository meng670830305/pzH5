<template>
  <h1>アサイン</h1>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field v-model="form.userName"
                 name="用户名"
                 label="用户名"
                 placeholder="用户名"
                 :rules="[{ required: true, message: '请填写用户名' }]" />
      <van-field v-model="form.passWord"
                 type="password"
                 name="密码"
                 label="密码"
                 placeholder="密码"
                 :rules="[{ required: true, message: '请填写密码' }]" />
    </van-cell-group>
    <div class="btn">
      <van-button round
                  block
                  type="primary"
                  native-type="submit">
        登録
      </van-button>
    </div>
  </van-form>
</template>
<script setup>
import { reactive, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
//获取当前vue实例
const { proxy } = getCurrentInstance()
//form data
const form = reactive({
  userName: '',
  passWord: ''
})
//from submit
const onSubmit = async () => {
  const { data } = await proxy.$api.login(form)
  console.log(data)
  if (data.code === 10000) {
    localStorage.setItem('h5_token', data.data.token)
    localStorage.setItem('h5_userInfo', JSON.stringify(data.data.userInfo))
    router.push('/home')
  }

}
</script>
<style lang="less" scoped>
h1 {
  text-align: center;
}
.btn {
  margin: 16px;
}
</style>