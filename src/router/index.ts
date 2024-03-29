import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/middle/light'
  },
  {
    /**初级教程 */
    path: '/primary',
    component: () => import('@/pages/primary/index.vue'),
    redirect: '/primary/basicShape',
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
    redirect: '/middle/hierarchicalModel',
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
      {
        /**可视域、投影矩阵 */
        path: 'visibility',
        component: () => import('@/components/visibility/index.vue'),
      },
      {
        /**深度缓冲区 */
        path: 'Z-buffer',
        component: () => import('@/components/Z-buffer/index.vue'),
      },
      {
        /**绘制正方体 */
        path: 'cube',
        component: () => import('@/components/cube/index.vue'),
      },
      {
        /**光照 */
        path: 'light',
        component: () => import('@/components/light/index.vue'),
      },
      {
        /**层次模型 */
        path: 'hierarchicalModel',
        component: () => import('@/components/hierarchicalModel/index.vue'),
      },
    ]
  },
]



export default createRouter({
  history: createWebHistory(),
  routes
})