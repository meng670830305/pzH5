import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import api from './api';

const app = createApp(App);
//全局属性挂载api
app.config.globalProperties.$api = api;
//路由挂载
app.use(router);
app.mount('#app');
