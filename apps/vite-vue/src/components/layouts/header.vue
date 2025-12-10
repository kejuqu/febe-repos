<template>
  <header class="bg-gray-100 h-14 flex items-center justify-between px-4">
    <h1>Home page</h1>
    <section>
      <el-button type="primary" @click="() => $router.push('/about')">About</el-button>
    </section>
  </header>
</template>
