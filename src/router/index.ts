import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import adminRouter from './admin'

const routes:Readonly<RouteRecordRaw[]> = [{
  path:'/test',
  name:'test',
  component:()=> import('@/views/test/Test.vue')
}]

routes.push(...adminRouter)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
