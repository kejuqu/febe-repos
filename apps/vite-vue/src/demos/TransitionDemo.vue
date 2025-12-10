<template>
  <button @click="show = !show">Toggle</button>
  Transition 是 vue 内置，不需要引入或注册
  <p>仅支持单个元素或组件作为其插槽内容。如果内容是一个组件，这个组件必须仅有一个根元素。</p>
  <Transition>
    <p v-if="show">hello</p>
  </Transition>

  <Transition name="slide-fade">
    <p v-if="show">slide fade</p>
  </Transition>

  <Transition name="bounce">
    <p v-if="show" class="text-center">Hello here is some bouncy text!</p>
  </Transition>

  <p>
    &lt; TransitionGroup &gt;是一个内置组件，用于对 v-for
    列表中的元素或组件的插入、移除和顺序改变添加动画效果。
  </p>

  <p>
    &lt; TransitionGroup> 支持和 &lt; Transition> 基本相同的 props、CSS 过渡 class 和 JavaScript
    钩子监听器，但有以下几点区别：
  </p>
  <ul class="flex flex-col text-left">
    <li>
      默认情况下，它不会渲染一个容器元素。但你可以通过传入 tag prop
      来指定一个元素作为容器元素来渲染。
    </li>
    <li>过渡模式在这里不可用，因为我们不再是在互斥的元素之间进行切换。</li>
    <li>列表中的每个元素都必须有一个独一无二的 key attribute。 CSS 过渡 class</li>
    <li>会被应用在列表内的元素上，而不是容器元素上。</li>
  </ul>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  const show = ref(true);

  defineOptions({
    inheritAttrs: false,
  });
</script>

<style scoped>
  /* 下面我们会解释这些 class 是做什么的 */
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }

  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.25);
    }
    100% {
      transform: scale(1);
    }
  }

  .bounce-enter-active {
    animation: bounce-in 0.5s;
  }

  .bounce-leave-active {
    animation: bounce-in 0.5s reverse;
  }
</style>
