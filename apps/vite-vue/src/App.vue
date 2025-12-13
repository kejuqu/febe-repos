<script setup lang="ts">
  import MainHeader from './components/layouts/MainHeader.vue';
  import MainSidebar from './components/layouts/MainSidebar.vue';
</script>

<template>
  <!-- <AllDemos /> -->
  <main-header></main-header>
  <main class="flex gap-2">
    <main-sidebar></main-sidebar>
    <router-view></router-view>
  </main>
</template>

<style scoped></style>
