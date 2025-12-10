<script setup lang="ts">
  import ChildModelBind from './ChildModelBind.vue';
  import { ref, watch, reactive, watchEffect, useTemplateRef, onMounted } from 'vue';

  const parentV = ref(0);
  const name = ref(0);

  // v-model:title="bookTitle"
</script>

<template>
  <p>
    v-model 可以在组件上使用以实现双向绑定, 从 Vue 3.4 开始，推荐的实现方式是使用 defineModel() 宏：
  </p>
  <p>parentV: {{ parentV }}</p>

  <br />
  <p>parent name: {{ name }} by capitalize modifier</p>
  <ChildModelBind v-model="parentV" v-model:name.capitalize="name" />

  <p>
    v-model:name="refValue", 这里的 name 是一个具名的 v-modal 用来实现父子组件之间的双向通信，解决
    vue2 中一个组件只能有一个 v-model 的问题
  </p>
</template>

<style scoped></style>
