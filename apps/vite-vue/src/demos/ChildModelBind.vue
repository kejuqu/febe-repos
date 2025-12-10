<script setup lang="ts">
  import { capitalize } from 'lodash-es';
  import { ref, watch, reactive, watchEffect, useTemplateRef, onMounted } from 'vue';

  const modelV = defineModel({
    type: Number,
    default: 0,
  });

  const [name, modifiers] = defineModel('name', {
    set(newVal: string) {
      if (modifiers.capitalize) {
        return capitalize(newVal);
      }
    },
  }); // 定义一个具名的 model ，用来实现父子组件的通信

  function update() {
    modelV.value++;
  }
</script>

<template>
  <p>Parent Bound v-model is: {{ modelV }}</p>
  <button @click="update">+1 by children component</button>

  <input class="border rounded-2xl" type="text" v-model="name" />
</template>

<style scoped></style>
