<template>
  <main role="main" aria-labelledyb="main-title">
    <h1 id="main-title">Main Title</h1>
    <section aria-labelledby="section-title-1">
      <h2 id="section-title-1">Section Title</h2>
      <h3>Section Subtitle</h3>
    </section>

    <section aria-labelledby="section-title2">
      <h2 id="section-title-2">Section Title</h2>
      <h3>Section Subtitle</h3>
      <h3>Section Subtitle</h3>
    </section>
  </main>
</template>

<script setup lang="ts">
  defineOptions({
    name: 'TitleDemo', // 显示的声明组件的名字
  });
</script>
