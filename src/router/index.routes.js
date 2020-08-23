const _import = require('./_import_' + process.env.NODE_ENV);

// 首页模块
export default [
    {
        path: '/index',
        name: 'Index',
        component: _import('pages/index'),
        meta: {
          title: '首页',
          tree: 0
        }
      },
]