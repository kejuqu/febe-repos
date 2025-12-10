<template>
  透传 attribute”指的是传递给一个组件，却没有被该组件声明为 props 或 emits 的 attribute 或者 v-on
  事件监听器。最常见的例子就是 class、style 和 id
  <TransforBtn class="bg-amber-700" @click="click">ClickMe</TransforBtn>

  <article class="text-yellow-400">
    透传属性是做的事情
    <ul>
      <li>对 class 和 style 的合并</li>
      <li>v-on 监听器的继承</li>
    </ul>

    <ol
      class="bg-linear-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text text-transparent"
    >
      <li>
        请注意： 透传的 attribute 不会包含 组件 上声明过的 props 或是针对 emits 声明事件的 v-on
        侦听函数，换句话说，声明过的 props 和侦听函数被 组件“消费”了
      </li>
      <li>透传的 attribute 若符合声明，也可以作为 props 传入 组件/li></li>
    </ol>
  </article>

  <p>透传进来的 attrbute 可以在模板表达式中直接使用 $attrs 访问到</p>

  <AttributeBtn class="text-purple-600 font-bold text-base" />
</template>

<script setup lang="ts">
  import TransforBtn from './TransformBtn.vue';
  import AttributeBtn from './AttributeBtn.vue';

  function click() {
    alert('clicked');
  }

  // 如果不想一个组件自动地继承 attribute， 可以在组件选项中设置 inheritAttrs: false
  // defineOptions({
  //   inheritAttrs: false,
  // });
  //
</script>
<style scoped></style>
