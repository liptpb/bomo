
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


// Axios.defaults.timeout = 5000;
// Axios.defaults.baseURL ='';
// // 添加请求拦截器，在请求头中加token
// Axios.interceptors.request.use(
//   config => {
//     if(config.url!='/login'){ //登录页面不验证token
//       let token = localStorage.getItem('userToken')
//       token = token.replace(/\"/g, "")
//       console.log(token)
//       if (token) {
//        config.headers.etoken = `${token}`;
//        config.headers['content-type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//       }
//       console.log(config)
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   });
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
