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
console.log(routerList)
// require.context(url,bool,reg) url查找路径 bool是否查找子目录 reg正则表达式
importAll(require.context('./',true,/\.routes\.js/));

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: _import('Index'),
      redirect: '/Index',
      children: [
        ...routerList,
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: _import('login/Login'),
      meta: {
        title: '登录',
        tree: 0
      }
    }
  ]
})
// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  
  if (to.path === '/login') {
    next();
  } else {
    // let token = localStorage.getItem('userToken');
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBpZCI6NDMsIm9wZW5pZCI6IiIsImlkIjoxLCJvcmdpZCI6IjIifQ.m5LnpQlggxTJlhYUCM9axAu82p6_Iv0dl4O66CUh2kQ'
    // console.log(token)
    if (token === 'null' || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});
export default router;