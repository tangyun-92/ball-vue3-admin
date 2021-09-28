import { createRouter, createWebHashHistory } from 'vue-router'

/**
 * affix -- true表示子路由下顶部的 tags 无法删除
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: {
      title: '404'
    }
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    meta: {
      title: '401'
    }
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/system',
    children: [
      {
        path: '/system',
        component: () => import('@/views/system/index.vue'),
        name: 'System',
        meta: { title: '系统管理', icon: 'el-icon-position', affix: false },
        redirect: '/system/dict',
        children: [
          {
            path: '/system/dict',
            name: 'Dict',
            component: () => import('@/views/system/dict/index.vue'),
            meta: { title: '字典管理', icon: 'el-icon-position' }
          }
          // {
          //   path: '/system/role',
          //   name: 'Role',
          //   component: () => import('@/views/system/role/index.vue'),
          //   meta: { title: '角色管理', icon: 'el-icon-position' }
          // }
        ]
      },
      {
        path: '/data-management',
        component: () => import('@/views/data-management/index.vue'),
        name: 'Player',
        meta: { title: '数据管理', icon: 'el-icon-position' },
        redirect: '/data-management/player',
        children: [
          {
            path: '/data-management/team',
            name: 'Team',
            component: () => import('@/views/data-management/team/index.vue'),
            meta: { title: '球队管理', icon: 'el-icon-position' }
          },
          {
            path: '/data-management/player',
            name: 'Player',
            component: () => import('@/views/data-management/player/index.vue'),
            meta: { title: '球员管理', icon: 'el-icon-position' }
          },
          {
            path: '/data-management/coach',
            name: 'Coach',
            component: () => import('@/views/data-management/coach/index.vue'),
            meta: { title: '教练管理', icon: 'el-icon-position' }
          }
        ]
      }
    ]
  }
]

export const asyncRoutes = []

export const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export default router
