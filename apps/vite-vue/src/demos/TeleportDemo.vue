<template>
  <div class="text-left text-green-500">
    Teleport 是一个内置组件，它可以将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外层的位置去。
    <p>
      一个组件模板的一部分在逻辑上从属于该组件，但从整个应用视图的角度来看，它在 DOM
      中应该被渲染在其他地方，甚至在整个 Vue 应用外部。比如全屏的模态框，或者一个抽屉。
    </p>

    <ModalDemo />
  </div>
</template>

<script setup lang="ts">
  import ModalDemo from './ModalDemo.vue';

  defineOptions({
    name: 'TeleportDemo', // 显示的声明组件的名字
  });
</script>
