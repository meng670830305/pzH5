import request from '../utils/request';

export default {
  login(data) {
    return request.post('/login', data);
  },
  //Home
  index() {
    return request.get('/Index/index');
  },
  //orderDetail
  orderDetail() {
    return request.get('/h5/companion');
  },
};
