<script setup lang="ts">
  import { shuffle as _shuffile } from 'lodash-es';
  import { ref } from 'vue';

  const getInitialItems = () => [1, 2, 3, 4, 5];

  const items = ref(getInitialItems());
  let id = items.value.length + 1;

  function insert() {
    const i = Math.round(Math.random() * items.value.length);

    items.value.splice(i, 0, id++);
  }

  function reset() {
    items.value = getInitialItems();
    id = items.value.length + 1;
  }

  function shuffle() {
    items.value = _shuffile(items.value);
  }

  function remove(item: number) {
    const i = items.value.indexOf(item);

    if (i > -1) {
      items.value.splice(i, 1);
    }
  }
</script>

<template>
  <button @click="insert">Insert at random index</button>
  <button @click="reset">Reset</button>
  <button @click="shuffle">Shuffle</button>

  <TransitionGroup tag="ul" name="fade" class="container">
    <li v-for="item in items" :key="item" class="item">
      <span class="px-4 text-cyan-600"> {{ item }}</span>
      <button @click="remove(item)">X</button>
    </li>
  </TransitionGroup>
</template>

<style scoped>
  .container {
    text-align: left;
    position: relative;
    padding: 0;
    max-height: 500px;
    overflow: auto;
    list-style-type: decimal;
    color: #333;
  }

  .item {
    width: 100%;
    height: fit-content;
    background-color: #f3f3f3;
    border: 1px solid #666;
    box-sizing: border-box;
  }

  /* 1. 声明过度效果 */
  .fade-move,
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  }

  /* 2. 声明进入和离开的状态 */
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: scaleY(0.01) translate(30px, 0);
  }

  /* 3. 确保离开的项目被移除了不布局流，以便正确地计算移动时的动画效果 */
  .fade-leave-active {
    position: absolute;
  }
</style>
