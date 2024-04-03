import type { RouteRecordRaw } from "vue-router";

import page1 from '@/views/admin/pages/multipage/page1/index.vue'
import page2 from '@/views/admin/pages/multipage/page2/index.vue'
import page3_1 from '@/views/admin/pages/multipage/page3/page3_1/index.vue'
import page3_2 from '@/views/admin/pages/multipage/page3/page3_2/index.vue'

// 多级菜单
export default {
    path: 'multipage',
    name: 'multipage',
    redirect:{
        name:'adminPage1'
    },
    meta: {
        title: '一级菜单',
        index: '2',
        icon: 'icon-park-outline:more-app'
    },
    children: [{
        path: 'page1',
        name: 'adminPage1',
        component: page1,
        meta: {
            title: '二级页面1',
            index: '2-1'
        }
    }, {
        path: 'page2',
        name: 'adminPage2',
        component: page2,
        meta: {
            title: '二级页面2',
            index: '2-2'
        }
    },{
        path: 'page3',
        name: 'adminPage3',
        meta: {
            title: '二级页面1',
            index: '2-3'
        },
        children:[{
            path: 'page3_1',
            name: 'adminPage3_1',
            component: page3_1,
            meta: {
                title: '三级页面1',
                index: '2-3-1'
            }
        },{
            path: 'page3_2',
            name: 'adminPage3_2',
            component: page3_2,
            meta: {
                title: '三级页面2',
                index: '2-3-2'
            }
        }]
    },]
} as RouteRecordRaw;