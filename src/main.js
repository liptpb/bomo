
import Vue from 'vue'
import App from './App'
import router from './router'
/* Vant UI 引入*/

// import Vant from 'vant'
// import 'vant/lib/index.css'
// Vue.use(Vant)

import { VueAxios } from './utils/request'
Vue.use(VueAxios)

Vue.config.productionTip = false


/**Axios**/
// import Axios from 'axios'
// Vue.prototype.$axios = Axios
// Vue.prototype.HOST = '/api' //全局定义

// import {post,get} from './api/http'
// //定义全局变量
// Vue.prototype.$post = post;
// Vue.prototype.$get = get;

/**结合lib-flexible、px2rem实现移动端适配**/
import 'amfe-flexible/index.js'


// 添加请求拦截器
// Axios.interceptors.request.use(function (config) {
//   return config;
// }, function (error) {
//   return Promise.reject(error);
// });

// // 添加响应拦截器
// Axios.interceptors.response.use(function (response) {
//   if(response.status == 200){
//     return response.data
//   }

// }, function (error) {
//   return Promise.reject(error);
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
