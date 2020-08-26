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
        },
      },
        // children: [
          {
            path: 'tichengAll',
            name: 'tichengAll',
            component: _import('pages/tichengAll'),
            meta: {
              title: '全部提成',
              tree: 0
            },
          },
          {
            path: 'otherSee',
            name: 'otherSee',
            component: _import('pages/otherSee'),
            meta: {
              title: '查看他人',
              tree: 0
            },
          },
          {
            path: 'serviceAll',
            name: 'serviceAll',
            component: _import('pages/serviceAll'),
            meta: {
              title: '全部服务',
              tree: 0
            },
          }
        // ]
 
]