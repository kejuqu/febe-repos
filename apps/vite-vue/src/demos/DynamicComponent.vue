<template>
  <ul class="flex gap-2">
    <li v-for="(_v, k) in tabs" @click="activeTab = k" class="border">{{ k }}</li>
  </ul>
  <component :is="tabs[activeTab]"></component>
  <p>:is="..." 期望接收的是组件名或组件对象 而不是字符串</p>

  <pre>
    在上面的例子中，被传给 :is 的值可以是以下几种：

被注册的组件名
导入的组件对象
你也可以使用 is attribute 来创建一般的 HTML 元素。

当使用 <code>
  &lt; component :is="..." &gt; 来在多个组件间作切换时，被切换掉的组件会被卸载。我们可以通过 &lt; KeepAlive &gt; 组件强制被切换掉的组件仍然保持“存活”的状态。
</code>
  </pre>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import HomeItem from './HomeItem.vue';
  import AboutItem from './AboutItem.vue';

  const tabs = {
    Home: HomeItem,
    About: AboutItem,
  } as const;

  type Tab = keyof typeof tabs;
  const activeTab = ref<Tab>('Home');
</script>

<style scoped></style>
