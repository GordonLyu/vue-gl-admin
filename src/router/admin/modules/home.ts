import type { RouteRecordRaw } from "vue-router";

import index from '@/views/admin/pages/index/index.vue'

// 首页
export default {
    path: 'index',
    name: 'adminIndex',
    component: index,
    meta: {
        title: '首页',
        index: '1',
        icon: 'icons8:home'
    }
} as RouteRecordRaw;