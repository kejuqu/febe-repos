<script setup lang="ts">
  import { ref, watch, reactive, watchEffect, useTemplateRef, onMounted } from 'vue';
  import Child from '../components/Child.vue';
</script>

<template>
  <Child />
  <h2>
    单文件组件 .vue 文件 的 template 中推荐使用 PascalCase 命名，优势在于能和原生 HTML 元素区分开来
  </h2>

  <h2>
    直接在 DOM 中书写模板（如原生 template 元素、内联模板）：必须使用 kebab-case {{ JSON.stringify(`
    Vue.component('user-card', { template: '
    <div>用户卡片</div>
    ' })`) }}
  </h2>

  <h2>单文件组件用 PascalCase，DOM 内模板用 kebab-case。</h2>
</template>

<style scoped></style>
