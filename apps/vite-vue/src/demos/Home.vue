<template>
  <div class="text-left text-green-500">Home</div>
  <button @click="countStore.increment()">Home count is: {{ countStore.count }}</button>
</template>

<script setup lang="ts">
  import { countStore } from './hooks/count';
  defineOptions({
    name: 'Home', // 显示的声明组件的名字
  });
</script>
