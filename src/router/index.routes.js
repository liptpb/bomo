const _import = require('./_import_' + process.env.NODE_ENV);

// 首页模块
export default [
    {
        path: '/index',
        name: 'Index',
        component: _import('pages/serviceAll'),
        meta: {
          title: '首页',
          tree: 0
        },children: [
          // {
          //   path: 'tichengAll',
          //   name: 'tichengAll',
          //   component: _import('/tichengAll'),
          // },
          // {
          //   path: 'otherSee',
          //   name: 'otherSee',
          //   component: _import('pages/otherSee'),
          // },
        ]
    },
]