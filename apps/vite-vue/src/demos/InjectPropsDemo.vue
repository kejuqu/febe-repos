<script setup lang="tsx">
  import { inject, ref } from 'vue';
  import type { Ref } from 'vue';

  // inject(key, defaultValue)
  const user = inject<{
    name: string;
    age: number;
    sex: string;
  }>('user');

  const countObj = inject<{
    count: Ref<number>;
    updateCount: (gap?: number) => void;
  }>('count', {
    count: ref(0),
    updateCount: () => {},
  });
</script>

<template>
  <div>
    <h2>注入原则</h2>
    <ul>
      <li>
        就近原则： 如果有多个父组件提供了相同键的数据，注入将解析为组件链上最近的父组件所注入的值。
      </li>
      <li>
        保持 ref 的响应式： 如果提供的值是一个 ref，注入进来的会是该 ref
        对象，而不会自动解包为其内部的值。这使得注入方组件能够通过 ref
        对象保持了和供给方的响应性链接。
      </li>
    </ul>
  </div>
  <div>
    inject props value: <span class="text-red-500">{{ user?.name }}</span> inject props count:
    <span class="text-green-500">{{ countObj.count }}</span>

    <button @click="countObj.updateCount(1)">count++</button>
  </div>
</template>
