<template>
  <p v-highlight="'bg-green-500'">This sentence is important(green by custom directive).</p>
  <p v-highlight>This sentence is important(red by custom directive)</p>
</template>

<script setup lang="ts">
  // 在 script setup 中，任何以 v 开头的驼峰式命名的变量都可以当作自定义指令使用
  const vHighlight = (el: HTMLElement, binding?: any) => {
    console.log(el, 'binding>>>>>: ', binding);
    el.classList.add(binding?.value ?? 'bg-red-500');
  };
</script>
