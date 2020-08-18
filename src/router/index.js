import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import techInfo from '@/views/pages/techInfo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'techInfo',
      component: techInfo
    },
    {
      path: '/techInfo',
      component: techInfo,
      name: 'main',
    }
  ]
})
