<template>
  <p>
    条件插槽：结合 <span class="text-green-600">$slots.slotName</span> 和
    <span class="text-green-600">v-if</span> 根据内容是否传入了插槽来渲染某些内容
  </p>
  <header v-if="$slots.header">
    <slot name="header"></slot>
  </header>
  <main v-if="$slots.main">
    <slot name="main"></slot>
  </main>
  <footer v-if="$slots.footer">
    <slot name="footer"></slot>
  </footer>

  <p>作用域插槽：可以像对组件传递 props 那样，向一个插槽的出口上传递 attributes</p>
  <div>
    <!--:text="greetingMessage" :count="1" 这是向引用插槽的地方传递 props -->
    <slot name="scope" :text="greetingMessage" :count="1"></slot>
  </div>

  <div>
    注意插槽上的 name 是一个 Vue 特别保留的 attribute，不会作为 props 传递给插槽
    <slot text="这是默认插槽向引用插槽的地方传递 props" :count="2"></slot>
  </div>
</template>

<script setup lang="ts">
  const greetingMessage = 'hello';
</script>
