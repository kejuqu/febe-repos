<template>
  <ul>
    <li v-if="!items.length" class="text-black">Loading items...</li>
    <li v-for="item in items">
      <!-- 具名插槽向使用的地方传递当前的数据项 -->
      <slot name="item" v-bind="item"></slot>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  // 定义 props（非 ts 类型申明）
  const props = defineProps(['api-url', 'per-page']);

  const items = ref<{ body: string; username: string; likes: number }[]>([]);

  // mock remote data fetching
  setTimeout(() => {
    items.value = [
      { body: 'Scoped Slots Guide', username: 'Evan You', likes: 20 },
      { body: 'Vue Tutorial', username: 'Natalia Tepluhina', likes: 10 },
    ];
  }, 1000);
</script>

<style scoped>
  ul {
    list-style-type: none;
    padding: 5px;
    background: linear-gradient(315deg, #42d392 25%, #647eff);
  }

  li {
    padding: 5px 20px;
    margin: 10px;
    background: white;
    border-radius: 6px;
  }
</style>
