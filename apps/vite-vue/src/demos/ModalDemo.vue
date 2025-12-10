<script setup lang="ts">
  import { ref } from 'vue';

  const open = ref(false);

  const props = defineProps<{ show: boolean }>();
</script>

<template>
  <button @click="open = true">Open Modal</button>

  <Teleport to="body">
    <div v-if="open" class="modal">
      <h2>Modal Title</h2>
      <p class="my-4">Hello from the modal!</p>
      <button class="w-full ml-auto" @click="open = false">Close</button>
    </div>
  </Teleport>
</template>

<style scoped>
  .modal {
    position: fixed;
    padding: 16px;
    z-index: 999;
    background-color: antiquewhite;
    top: 20%;
    left: 50%;
    width: 300px;
    margin-left: -150px;
  }
</style>
