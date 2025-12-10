<script setup lang="ts">
  // import AllDemos from './AllDemos.vue';
  import { ElButton } from 'element-plus';

  function alertInfo() {
    alert('hello element plus');
  }
</script>

<template>
  <el-button @click="alertInfo">按钮</el-button>
  <!-- <AllDemos /> -->
</template>

<style scoped></style>
