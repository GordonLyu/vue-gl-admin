<template>
    <div id="menu" :class="isClose ? 'close' : ''">
        <div class="logo">
            <div><Icon icon="dashicons:admin-network" color="#0db8de" /></div>
        </div>
        <el-menu default-active="1" class="menu" :collapse="isClose">
            <MenuItem :list="menuItem!" path="/admin"></MenuItem>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import adminRouters from '@/router/admin';
import MenuItem from './MenuItem.vue';

const menuItem = ref(adminRouters[0].children)

const isClose = ref(false)

/*
closeWidth?:number  --600
    触发收缩菜单的浏览器宽度
*/
const props = withDefaults(
    defineProps<{
        width?: string;
        closeWidth?:number;
        LogoPaddingBottom?: string;
    }>(), {
        LogoPaddingBottom: '0px',
        closeWidth:600
    }
)

isClose.value = window.innerWidth<props.closeWidth;
window.addEventListener('resize',()=>{
    isClose.value = window.innerWidth<props.closeWidth;
})

</script>

<style scoped>
#menu {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-right: solid 1px #f1f1f1;
    transition: .3s;
}

#menu.close {
    width: auto;
}

.logo {
    display: grid;
    place-items: center;
    height: 80px;
    border-bottom: solid 1px #f1f1f1;
}

.logo div {
    display: grid;
    place-items: center;
    width: 50px;
    height: 50px;
}
.logo>div>*{
    width: 100%;
    height: auto;
}

.menu {
    flex: 1;
    overflow-y: overlay;
    overflow-x: clip;
    border-right: none;
}

</style>