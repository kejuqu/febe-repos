<template>
  <h1>for 循环渲染</h1>
  <p>可以在 v-for 变量别名是使用解构，和常规解构没有什么区别</p>
  <ul>
    <li v-for="({ hidden, message, id }, index) in items" :key="id">
      {{ hidden ? '*******' : message + index + 1 }}
      <span v-if="index === items.length - 1">这是最后一个 item</span>
    </li>
  </ul>

  <h2>even numbers:</h2>
  <ol>
    <li v-for="n in evenNumbers" :key="n">{{ n }}</li>
  </ol>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';

  const items = ref([
    {
      message: 'Hello World',
      id: '1',
      idx: 0,
      hidden: false,
    },
    {
      message: 'Hello World',
      id: '12',
      idx: 0,
      hidden: true,
    },
    {
      message: 'Hello World',
      id: '13',
      idx: 0,
      hidden: false,
    },
  ]);

  items.value = items.value.map((item, idx) => {
    item.idx = idx;
    return item;
  });

  const numbers = ref([1, 2, 3, 4, 5]);

  const evenNumbers = computed(() => {
    return numbers.value.filter((n) => n % 2 === 0);
  });

  const reversNumbers = computed(() => {
    return [...numbers.value].reverse();
  });
  // console.log('reversNumbers: ', reversNumbers);
</script>

<style scoped></style>
