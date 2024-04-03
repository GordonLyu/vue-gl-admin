<template>
    <template  v-for="item,index in props.list">
        <el-sub-menu :index="item.meta!.index" v-if="item.children">
            <template #title>
                <el-icon v-if="item.meta!.icon">
                    <Icon :icon="item.meta!.icon" />
                </el-icon>
                <span>{{ item.meta!.title }}</span>
            </template>
            <MenuItem :list="item.children" :path="`${props.path}/${item.path}`"></MenuItem>
        </el-sub-menu>
        <el-menu-item :index="item.meta!.index" v-else @click="to(`${props.path}/${item.path}`)">
            <el-icon v-if="item.meta!.icon">
                <Icon :icon="item.meta!.icon" />
            </el-icon>
            <template #title>{{ item.meta!.title }}</template>
        </el-menu-item>
        
    </template>
</template>

<script setup lang="ts">
import router from '@/router';
import { Icon } from '@iconify/vue';
import type { RouteRecordRaw } from 'vue-router';

// 用递归组件来渲染菜单的层级关系

const props = defineProps<{
    list: Readonly<RouteRecordRaw[]> | any,
    path: string
}>()

const to = (path:string) => {
    router.push({
        path:path
    })
}



</script>

<style scoped></style>