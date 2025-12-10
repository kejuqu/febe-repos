<script setup lang="ts">
  import { ref } from 'vue';
  const count = ref(0);

  const name = ref('Vue.js');

  function greet(event: Event) {
    alert(`Hello ${name.value}!`);

    if (event) {
      alert(`Event: ${(event.target as HTMLElement)?.tagName}`);
    }
  }

  function say(msg: string) {
    alert(msg);
  }

  function warn(msg: string, event: Event) {
    // 这里可以访问原生事件
    if (event) {
      event.preventDefault();
    }

    alert(msg);
  }

  function func() {}

  function submit() {
    alert('Submitted!');
  }
</script>

<template>
  <div>
    <!-- 内联事件处理器 -->
    <button @click="count++">count is: {{ count }}</button>
  </div>
  <!-- 方法事件处理器 -->
  <button @click="greet">Greet</button>

  <button @click="say('Hi!')">Say Hi</button>
  <button @click="say('Bye!')">Say Bye</button>

  <button @click="warn('Form cannot be submitted yet.', $event)">Submit</button>
  <button @click="(e) => warn('Form cannot be submitted yet.', e)">Submit</button>

  <h2>event decoration</h2>
  <div>
    <a href="" @click.stop="func">.stop 等于 event.stopPropagation()， 单击事件将停止传递</a>
    <a href="" @click.prevent="func"
      >.prevent 等于 event.preventDefault()， 提交时间将不会重新加载页面</a
    >

    <a href="" @click.stop.prevent="func">修饰可以链式书写</a>

    <from @submit.prevent="submit"></from>
  </div>
</template>
