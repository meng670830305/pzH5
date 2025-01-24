import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import api from './api';

const app = createApp(App);
//全局属性挂载api
app.config.globalProperties.$api = api;
router.beforeEach((to, from) => {
  if (to.path !== '/login') {
    if (!localStorage.getItem('h5_token')) {
      return '/login';
    }
  }
});

//路由挂载
app.use(router);
app.mount('#app');
