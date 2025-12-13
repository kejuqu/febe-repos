<template>
  <header class="bg-gray-100 h-14 flex  text-black items-center justify-between px-4">
    <h1>Home page</h1>
    <section>
      <el-button type="primary" @click="clickAbout">About</el-button>
    </section>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
function clickAbout() {
  router.push('/about')
}
</script>
