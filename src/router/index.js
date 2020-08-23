import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import techInfo from '@/views/pages/techInfo'
Vue.use(Router)

const router = new Router({
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
// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('userToken');
    console.log(token)
    if (token === 'null' || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});
export default router;