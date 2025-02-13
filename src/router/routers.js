import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  // 登录页面
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  // 主页面 --- 单页面
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      notCache: true,
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          notCache: true,
          icon: '_shouye'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  // 用户设置 -- 单页面
  {
    path: '/user_setting',
    name: '_user_setting',
    meta: {
      hideInMenu: true,
    },
    component: Main,
    children: [
      {
        path: '/user_setting',
        name: 'user_setting',
        meta: {
          icon: '_shezhi',
          title: '修改用户设置',
          notCache: true
        },
        component: () => import('@/view/single-page/setting/main.vue')
      }
    ]
  },
  // 店铺详情页 -- 单页面
  {
    path: '/welfare',
    name: '_welfare',
    component: Main,
    meta: {
      icon: '_tiaoxingtu',
      title: '营销信息',
    },
    children: [
      {
        path: '/welfare_list',
        name: '_welfare_list',
        meta: {
          icon: '_liebiaoshitucaidan',
          title: '福利列表',
          notCache: true,
        },
        component: () => import('@/view/welfare/welfare_list/main.vue')
      },
      {
        path: '/recharge_list',
        name: '_recharge_list',
        meta: {
          icon: '_caiwu',
          title: '充值列表',
          notCache: true,
        },
        component: () => import('@/view/welfare/recharge_list/main.vue')
      }
    ]
  },
  // 401
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  // 500
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  // 404
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
