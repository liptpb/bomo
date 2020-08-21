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

export default new Router({
  routes: [
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
  ]
})
