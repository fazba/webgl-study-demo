import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/middle'
  },
  {
    /**初级教程 */
    path: '/primary',
    component: () => import('@/pages/primary/index.vue'),
    redirect: '/primary/texture',
    children: [
      {
        /**基础图形 */
        path: 'basicShape',
        component: () => import('@/components/basicShape/index.vue'),
      },
      {
        /**基础图形模拟贪吃蛇 */
        path: 'snake',
        component: () => import('@/components/snake/index.vue'),
      },
      {
        /**纹理 */
        path: 'texture',
        component: () => import('@/components/texture/index.vue'),
      },
    ]
  },
  {
    /**中级教程 */
    path: '/middle',
    component: () => import('@/pages/middle/index.vue'),
    redirect: '/middle/camera',
    children: [
      {
        /**平移、旋转、缩放 */
        path: 'transform',
        component: () => import('@/components/transform/index.vue'),
      },
      {
        /**视点、视线 */
        path: 'camera',
        component: () => import('@/components/camera/index.vue'),
      },
    ]
  },
]

export default createRouter({
  history: createWebHistory(),
  routes
})