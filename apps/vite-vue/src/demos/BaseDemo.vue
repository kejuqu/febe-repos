<template>
  <span>Message: {{ msg }}</span>

  <span>inputVal: {{ val }}</span>

  <button @click="count++">click {{ count }} to add count</button>

  <button @click="state.count++">click to change val = {{ state.count }}</button>

  <div>{{ publishedBooksMessage }}</div>
  <div>{{ fullName }}</div>
  <div>{{ computedVal }}</div>

  <!-- threejs -->
  <!-- https://www.bilibili.com/video/BV1Gg411X7FY?spm_id_from=333.788.player.switch&vd_source=242a8f935973276a2bc5c149bc30661a&p=11 -->
  <p class="text-green-500 mt-3">
    避免直接修改计算属性值​
    从计算属性返回的值是派生状态。可以把它看作是一个“临时快照”，每当源状态发生变化时，
    就会创建一个新的快照。更改快照是没有意义的，因此计算属性的返回值应该被视为只读的，
    并且永远不应该被更改——应该更新它所依赖的源状态以触发新的计算。
  </p>

  <div>
    <a href="https://cn.vuejs.org/guide/essentials/class-and-style.html" target="_blank">
      学到这里 vue 文档</a
    >
  </div>

  <div :class="classObject">test</div>

  <div :class="{ active: isActive, 'text-red-400': hasError }">v-bind:class object syntax</div>
  <div :class="computedClassObject">computed class name</div>
</template>

<script setup lang="ts">
  import { computed, reactive, ref } from 'vue';
  const msg = ref('Hello World!');
  const val = ref('');
  const count = ref(0);

  const isActive = ref(true);
  const hasError = ref(false);

  const computedClassObject = computed(() => ({
    active: isActive.value && !hasError.value,
    'text-red-400': hasError.value,
  }));

  const classObject = reactive({
    active: true,
    'text-red-400': true,
  });

  const state = reactive({
    count: 0,
  });

  // 计算属性
  const author = reactive({
    name: 'zhang3',
    books: [
      {
        name: 'book1',
      },
      {
        name: 'book2',
      },
    ],
  });

  // 一个 计算属性 ref, 有响应式依赖使用 computed 才有意义
  const publishedBooksMessage = computed(() => {
    return `${author.name} has published ${author.books.length} books`;
  });

  // console.log("publishedBooksMessage: ", publishedBooksMessage.value)

  // 可写计算属性
  const firstName = ref('John');
  const lastName = ref('Doe');

  const fullName = computed({
    // getter
    get() {
      return `${firstName.value} ${lastName.value}`;
    },
    // setter
    set(newValue) {
      [firstName.value, lastName.value] = newValue.split(' ') as [string, string];
    },
  });

  // 获取计算属性的上一个值
  const computedVal = computed((previous) => {
    if (count.value <= 3) {
      return count.value;
    }

    return previous;
  });
</script>

<style scoped>
  .active {
    border: 1px solid red;
  }
</style>
