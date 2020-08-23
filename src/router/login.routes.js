const _import = require('./_import_' + process.env.NODE_ENV);

// 登录模块
export default [
    {
        path: '/login',
        name: 'Login',
        component: _import('login/Login'),
        meta: {
          title: '登录',
          tree: 0
        }
      },
]