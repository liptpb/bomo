
import Vue from 'vue'
import App from './App'
import router from './router'
/* Vant UI 引入*/

import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
import { Toast ,Notify} from "vant";
Vue.use(Toast,Notify); 
// import { VueAxios } from './utils/request'
// Vue.use(VueAxios)
import qs from 'qs'
Vue.config.productionTip = false

// 软键盘弹出问题
import keyboard from '@/utils/softKeyboard'
Vue.prototype.$blur = keyboard.blur;
Vue.prototype.$focus = keyboard.focusInput;


/**Axios**/
import Axios from 'axios'
Vue.prototype.$axios = Axios
Vue.prototype.HOST = '/api' //全局定义

import {post,get} from '@/api/http'
//定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$get = get;

/**结合lib-flexible、px2rem实现移动端适配**/
import 'amfe-flexible/index.js'


Axios.defaults.timeout = 5000;
Axios.defaults.baseURL ='';
// 添加请求拦截器，在请求头中加token
Axios.interceptors.request.use(
  config => {
    if(config.url!='/login'){ //登录页面不验证token
      let token = localStorage.getItem('userToken');
      // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBpZCI6NDMsIm9wZW5pZCI6IiIsImlkIjoxLCJvcmdpZCI6IjIifQ.m5LnpQlggxTJlhYUCM9axAu82p6_Iv0dl4O66CUh2kQ'
      // token = token.replace(/\"/g, "")
      if (token) {
       config.headers.etoken = `${token}`;
       config.headers['content-type'] = 'application/json;charset=UTF-8';
      }
      // if(config.method == 'post') {
      //   config.Accept = 'application/json'
      // }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });
// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
  if(response.data.code == 1001){
    localStorage.clear()
    router.push({
      path: "/login",  //从哪个页面跳转
    })
  }else{
    return response.data
  }

}, function (error) {
  return Promise.reject(error);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
