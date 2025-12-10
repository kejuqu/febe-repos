<template>
  <span class="text-zinc-600"> provide </span> 和
  <span class="text-zinc-600"> inject </span> 可以帮助我们解决跨组件 props 共享问题
  <p>
    父组件相对于其所有的后代组件，是依赖提供者，
    任何后代的组件树，不论层级又多深，都可以注入由父组件提供给整条链路的依赖（props）
  </p>

  要为组件后代提供数据，需要使用到 provide() 函数,一个组件可以多次调用
  provide()，使用不同的注入名，注入不同的依赖值

  <p>提供的响应式状态使后代组件可以由此和提供者建立响应式的联系。</p>

  <InjectPropsDemo></InjectPropsDemo>
  <p>parent count: {{ count }}</p>

  <b>
    当提供(provide) /
    注入(inject)响应式的数据时，建议尽可能将任何对响应式状态的变更都保持在供给方组件中。这样可以确保所提供状态的声明和变更操作都内聚在同一个组件内，使其更容易维护
  </b>

  <p>
    至此，我们已经了解了如何使用字符串作为注入名。但如果你正在构建大型的应用，包含非常多的依赖提供，或者你正在编写提供给其他开发者使用的组件库，建议最好使用
    <b>Symbol</b> 来作为注入名以避免潜在的冲突。
  </p>
</template>

<script setup lang="ts">
  import { provide, ref, readonly } from 'vue';

  import InjectPropsDemo from './InjectPropsDemo.vue';
  const count = ref(0);

  // provide(key,value)
  provide('user', {
    name: 'kejuqu',
    age: 18,
    sex: 'male',
  });

  function updateCount(gap: number = 1) {
    count.value += gap;
  }

  provide('count', {
    updateCount,
    count,
  });

  // 如果想确保提供的数据不能在 注入方组件使用，可以使用 readonly(val) 来包装提供的数据
  provide('readonlyCount', readonly(count));
</script>
