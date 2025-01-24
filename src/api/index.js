import request from '../utils/request';

export default {
  login(data) {
    return request.post('/login', data);
  },
  //Home
  index() {
    return request.get('/Index/index');
  },
  //Companion
  Companion() {
    return request.get('/h5/companion');
  },
  //orderCreate
  createOrder(data) {
    return request.post('/createOrder', data);
  },
  //orderList
  orderList(params) {
    return request.get('/order/list', { params });
  },
  //orderDetail
  orderDetail(params) {
    return request.get('/order/detail', { params });
  },
};
