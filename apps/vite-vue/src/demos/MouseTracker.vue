<script setup lang="tsx">
  import { ref, onMounted, onUnmounted } from 'vue';

  const x = ref(0);
  const y = ref(0);

  function update(e: MouseEvent) {
    x.value = e.pageX;
    y.value = e.pageY;
  }

  onMounted(() => {
    window.addEventListener('mousemove', update);
  });

  onUnmounted(() => {
    window.removeEventListener('mousemove', update);
  });
</script>

<template>
  <slot name="default" :x="x" :y="y"></slot>
</template>
