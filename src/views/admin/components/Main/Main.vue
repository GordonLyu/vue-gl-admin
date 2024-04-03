<template>
    <div class="main">
        <RouterView></RouterView>
    </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<style scoped>
.main{
    flex: 1;
}
</style>