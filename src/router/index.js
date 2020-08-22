import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/views/Login'
// import techInfo from '@/views/pages/techInfo'
const _import = require('./_import_' + process.env.NODE_ENV);

Vue.use(Router);

let routerList = [];
function importAll(r) {
  r.keys().forEach(
    (key) => routerList = routerList.concat(r(key).default)
  )
}
// require.context(url,bool,reg) url查找路径 bool是否查找子目录 reg正则表达式
importAll(require.context('./',true,/\.routes\.js/));

const router = new Router({
  routes: [
<<<<<<< HEAD
    // {
    //   path: '/',
    //   name: 'techInfo',
    //   component: techInfo
    // },
    // {
    //   path: '/techInfo',
    //   component: techInfo,
    //   name: 'main',
    // }
=======
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/techInfo',
      component: techInfo,
      name: 'main',
    }
>>>>>>> a13867a952a75e82b81bf70ce14fefbcf4b65f10
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