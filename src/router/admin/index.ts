import admin from '@/views/admin/Admin.vue'
import login from '@/views/admin/login/index.vue'

import type { RouteRecordRaw } from 'vue-router'

// 群体导入~
const modules: any = import.meta.glob('./modules/*', {
    eager: true
})

const route = []

for (const path in modules) {
    route.push(modules[path].default)
}

export default [{
    path: '/admin',
    name: 'admin',
    redirect: 'admin/index',
    component: admin,
    children: route
}, {
    path: '/admin/login',
    name: 'adminLogin',
    component: login
}] as Readonly<RouteRecordRaw[]>