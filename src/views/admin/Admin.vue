<template>
  <div class="admin-page">
    <Menu></Menu>
    <div class="contain">
      <Header></Header>
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import api from '@/api';
import Header from './components/Header/Header.vue';
import Main from './components/Main/Main.vue';
import Menu from './components/Menu/Menu.vue';

api.mockTest.test().then((res: any) => {
  console.log('测试',res);
})

api.mockUser.getAll().then((res: any) => {
  console.log('所有用户',res);
})

api.mockUser.getOne(2).then((res: any) => {
  console.log('一个用户',res);
})
</script>

<style scoped>
.admin-page {
  height: 100vh;
  display: flex;
  justify-content: space-between;
  background-color: #f5f5f5;
}

.contain {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>