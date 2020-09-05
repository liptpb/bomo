import Vue from 'vue'
import Router from 'vue-router'
import qs from 'qs' 
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
// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}


const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: _import('Index'),
      // redirect: '/Index',
      meta: {
        title: '首页',
        requireAuth: true
      },
      children: [
        ...routerList,
      ]
    },
    // {
    //   path: '/',
    //   name: 'login',
    //   component: _import('login/Login'),
    //   redirect: '/login',
    //   children: [
    //     ...routerList,
    //   ]
    // },
    {
      path: '/login',
      name: 'login',
      component: _import('login/Login'),
      meta: {
        title: '登录',
        tree: 0,
        // requireAuth: false
      }
    }
  ]
})
// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
// router.beforeEach((to, from, next) => {
//   debugger
//   // if(JSON.stringify(query) == "{}"){
//   //   // console.log('1111')
//   //   // next('/login');
//   // }

  
//   if (to.path === '/login') {
//     next();
//   } else {
//     // const query = qs.parse(location.search.substring(1))
//     // console.log(query.etoken)
//     // let token = localStorage.getItem('userToken');
//     // console.log(token)
//     let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBpZCI6NDMsIm9wZW5pZCI6IiIsImlkIjoxLCJvcmdpZCI6IjIifQ.m5LnpQlggxTJlhYUCM9axAu82p6_Iv0dl4O66CUh2kQ'
//     // console.log(token)
//     // if ( token === 'null' || token === '') {
//     if(!token){
//       next('/login');
//     } else {
//       // localStorage.setItem("userToken",query.etoken)
//       next();
//     }
//   }
// });
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
    document.title = to.meta.title
  }
  console.log(to)
  /* 判断该路由是否需要登录权限 */
  if (to.path === '/login') {
    
    next();
  } else {
    if(to.matched&&to.matched.some(record => record.meta.requireAuth)) {
    const query = qs.parse(location.search.substring(1))
    let token = null
    if(query&&query.token){
      token = query.token
      localStorage.setItem("userToken",token)
    }
    let token1 = localStorage.getItem('userToken')
    // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBpZCI6NDMsIm9wZW5pZCI6IiIsImlkIjoxLCJvcmdpZCI6IjIifQ.m5LnpQlggxTJlhYUCM9axAu82p6_Iv0dl4O66CUh2kQ'
    if (token || token1) {  // 判断当前的token是否存在
     
      next();
    }
    else {
      next({
        path: '/login',
      })
    }
  }
}
});
export default router;