<template>
  <el-header class="flex bg-white items-center justify-between px-4 border-b border-b-zinc-300">
    <section>
      <h1 class="flex items-center gap-2">
        <el-icon size="30" color="#10b981">
          <Orange />
        </el-icon>
        <span
          class="text-3xl font-bold bg-linear-to-r from-green-600 to-red-600 bg-clip-text text-transparent"
          >农产品管理后台</span
        >
      </h1>
    </section>
    <section>
      <el-button type="success" plain @click="clickAbout">About</el-button>
    </section>
  </el-header>
</template>

<script setup lang="ts">
  import { Orange } from '@element-plus/icons-vue';
  import { useRouter } from 'vue-router';
  const router = useRouter();

  function clickAbout() {
    router.push('/about');
  }
</script>
