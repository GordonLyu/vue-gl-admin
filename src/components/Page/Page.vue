<template>
    <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="prop.total"
        @current-change="handleCurrentChange"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentPage = ref(1);
const pageSize = ref(10);

const prop = defineProps<{
    total:number;
}>()

// 改变当前页数时触发
const handleCurrentChange = () => {

}

</script>

<style scoped>

</style>