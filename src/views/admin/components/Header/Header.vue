<template>
  <el-page-header>
    <template #breadcrumb>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: './page-header.html' }">
          首页
        </el-breadcrumb-item>
      </el-breadcrumb>
    </template>
    <template #content>
      <span class="text-large font-600 mr-3"> {{ router.currentRoute.value.meta.title }} </span>
    </template>
  </el-page-header>
</template>

<script setup lang="ts">
import router from '@/router';

</script>

<style scoped>
.el-page-header {
  height: 80px;
  background-color: #fff;
  padding: 0 20px;
  border-bottom: solid 1px #f1f1f1;
}
</style>