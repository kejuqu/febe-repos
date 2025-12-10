<script setup lang="ts">
  // 使用了 <script setup> 的组件是默认私有的：一个父组件无法访问到一个使用了 <script setup> 的子组件中的任何东西，
  // 除非子组件在其中通过 defineExpose 宏显式暴露

  import { ref } from 'vue';

  const a = 1;
  const b = ref(2);

  // 像 defineExpose 这样的编译器宏不需要导入， defineExpose 才能导出接口给父组件调用
  defineExpose({
    // 父组件通过模板引用获取到该组件的实例时，得到的实例类型为 { a: number, b: number} ref 都会自动解包，和一般的 实例一样
    a,
    b,
  });

  // 使用 ts 类型标注
  defineProps<{
    name: string;
    age?: number;
  }>();

  // // 在 Vue 3 的 Composition API 中， defineEmits 需要使用函数重载的语法来定义事件的类型
  const emit = defineEmits<{
    (e: 'print', msg: string): void; // 调用方式 emit('print', 'hello world')
    (e: 'update', msg: string): void; // 调用方式 emit('update', 'hello world')
  }>();

  /**
  如果没有使用 <script setup> 可以通过 emits 选项定义组件会抛出的时间，setup 的第二个参数 ctx.emit(emitterName, ...args)
    export default {
      emits: ['print', 'update'],
      setup(props, ctx) {
        ctx.emit('print', 'hello world');
        ctx.emit('update', 'hello world');
      }
    }
   */

  // const emitWithoutTs = defineEmits(['print', 'update']); // 不使用 ts 类型定义
</script>

<template>
  <div class="text-red-500">
    ⚠️： defineExpose 必须在任何 await 之前调用，否则在 await 操作后暴露的属性和方法将 无法 访问
  </div>
  使用 v-bind 语法正确的传递 prop 值，即事先不知道要渲染的确切内容时，就是用 v-bind 语法 组件的名字
  {{ name }}

  <!-- 子组件触发事件并传参 → 父组件监听事件并接收参数。 -->
  <button @click="emit('print', 'hello world')">打印</button>

  <!-- 插槽 -->
  <slot></slot>

  <!-- 具名插槽 -->
  <slot name="footer"></slot>

  <!--  -->
</template>

<style scoped></style>
