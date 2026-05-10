<script setup lang="ts">
  import MainHeader from './components/layouts/MainHeader.vue';
  import MainSidebar from './components/layouts/MainSidebar.vue';
</script>

<template>
  <!-- <AllDemos /> -->
  <main-header></main-header>
  <el-container class="flex gap-2 content-wrapper w-full">
    <main-sidebar></main-sidebar>
    <el-main><router-view></router-view></el-main>
  </el-container>
</template>

<style scoped>
  .content-wrapper {
    height: calc(100dvh - (var(--spacing) * 14));
    overflow: auto;
  }
</style>
