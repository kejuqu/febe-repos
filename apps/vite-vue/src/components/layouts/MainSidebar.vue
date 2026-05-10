<template>
  <el-aside>
    <el-menu
      mode="vertical"
      router
      default-active="/"
      class="h-full"
      width="100%"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
    >
      <el-menu-item index="/overview">
        <el-icon><DataAnalysis /></el-icon>
        <span>概览</span>
      </el-menu-item>
      <!-- <el-menu-item index="/upload-product">
        <el-icon><UploadFilled /></el-icon>
        <span>上传商品</span>
      </el-menu-item> -->
      <el-menu-item index="/product-management">
        <el-icon><Management /></el-icon>
        <span>商品管理</span>
      </el-menu-item>
      <el-menu-item index="/article-editing">
        <el-icon><Edit /></el-icon>
        <span>文章编辑</span>
      </el-menu-item>
      <el-menu-item index="/sales-statistics">
        <el-icon><Histogram /></el-icon>
        <span>销售统计</span>
      </el-menu-item>
      <el-menu-item index="/settings">
        <el-icon><Setting /></el-icon>
        <span>设置</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import {
    DataAnalysis,
    UploadFilled,
    Management,
    Edit,
    Histogram,
    Setting,
  } from '@element-plus/icons-vue';
  import type { MenuEmits, MenuItemClicked } from 'element-plus';
  import type { NavigationFailure } from 'vue-router';

  const isCollapse = ref(false);
  const handleOpen = (key: string, keyPath: string[]) => {
    console.log('open: ', key, keyPath);
  };
  const handleClose = (key: string, keyPath: string[]) => {
    console.log('close: ', key, keyPath);
  };

  const handleSelect = async (
    index: string,
    indexPath: string[],
    item: MenuItemClicked
    // routerResult?: Promise<void | NavigationFailure> | undefined
  ) => {
    console.log(" MenuEmits['select']", index, indexPath, item);
  };
</script>

<style></style>
