import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Layout from '@/layouts';
import mainLayout from '@/layouts/mainLayout';

//基础路由
export const baseRoute = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/403',
    component: () => import('@/views/error/403'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/500',
    component: () => import('@/views/error/500'),
    hidden: true
  }
];

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/editor',
    hidden: true,
    children: [
      {
        name: 'editor',
        path: '/components/editor',
        component: () => import('@/views/editor/index'),
        meta: { title: '富文本编辑器', icon: 'component', role: ['admin', 'editor'] }
      },
      {
        name: 'Markdown',
        path: '/components/markdown',
        component: () => import('@/views/markdown/index'),
        meta: { title: 'Markdown', icon: 'position', role: ['admin', 'editor'] }
      },
      {
        name: 'userSystem',
        component: mainLayout,
        path: '/userSystem',
        redirect: '/userSystem/userInfo',
        meta: { title: '个人设置', icon: 'user' },
        children: [
          {
            name: 'userInfo',
            path: '/userSystem/userInfo',
            component: () => import('@/views/userSystem/userInfo/index'),
            meta: { title: '个人中心' }
          },
          {
            name: 'setting',
            path: '/userSystem/setting',
            component: () => import('@/views/userSystem/setting/index'),
            meta: { title: '用户设置' }
          }
        ]
      },

      {
        name: 'system',
        component: mainLayout,
        path: '/system',
        redirect: '/system/userManage',
        meta: {
          role: ['admin'],
          title: '系统设置',
          icon: 'system'
        },
        children: [
          {
            name: 'userManage',
            path: '/system/userManage',
            component: () => import('@/views/system/userManage/index'),
            meta: { title: '用户管理' }
          }
        ]
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
];

const createRouter = function() {
  return new VueRouter({
    routes: baseRoute,
    scrollBehavior: () => ({ y: 0 })
  });
};

const router = createRouter();

export function resetRouter() {
  router.matcher = createRouter().matcher;
}

//重定向时报错，用这个不让他报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};

export default router;
