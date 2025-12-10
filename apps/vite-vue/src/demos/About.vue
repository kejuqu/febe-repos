<template>
  <div class="text-left text-red-500">About</div>

  <button @click="countStore.increment()">About count is: {{ countStore.count }}</button>
</template>

<script setup lang="ts">
  import { countStore } from './hooks/count';
  defineOptions({
    name: 'About', // 显示的声明组件的名字
  });
</script>
