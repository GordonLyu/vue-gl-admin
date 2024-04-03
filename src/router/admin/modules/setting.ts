import type { RouteRecordRaw } from "vue-router";

import setting from '@/views/admin/pages/setting/index.vue'

// 设置
export default {
    path: 'setting',
    name: 'adminSetting',
    component: setting,
    meta: {
        title: '设置',
        index: '3',
        icon:'ant-design:setting-outlined'
    }
} as RouteRecordRaw;