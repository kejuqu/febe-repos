<template>
  <section>
    <p>
      $attrs 对象包含了除组件所声明的 props 和 emits 之外的所有其他 attribute，例如
      class，style，v-on 监听器等等。
    </p>
    Fallthrough attribute: {{ $attrs }}
  </section>
</template>

<script setup lang="ts"></script>
