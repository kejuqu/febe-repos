<script setup lang="ts">
  import { ref, watch, reactive, watchEffect, useTemplateRef, onMounted } from 'vue';
  import Child from '../components/Child.vue';
  const myInputRef = useTemplateRef('myInputRef');

  const myChildRef = useTemplateRef('myChildRef');

  onMounted(() => {
    console.log('myChildRef.value: 持有对应组件的实例 ', myChildRef.value);
  });

  onMounted(() => {
    console.log('myInputRef.value: 持有对应组件的 input 元素 ', myInputRef.value);
    // myInputRef.value?.focus();
  });

  // v-for 中使用 ref
  const items = ref([1, 2, 3, 4, 5]);
  const buttons = useTemplateRef('buttons');

  console.log('需要注意的是 ref 数组不保证与原数组相同的顺序，buttons: ', buttons);

  // 定义 print 事件的处理方法，参数对应子组件传递的 msg
  const handlePrint = (msg: string) => {
    alert('接收到 print 事件的消息：' + msg);
  };

  // 定义 update 事件的处理方法，参数对应子组件传递的 msg
  const handleUpdate = (msg: string) => {
    alert('接收到 update 事件的消息：' + msg);
  };

  // 声明 props 的校验
  defineProps({
    // 给出 null 和 undefined 值会跳过任何类型检查
    propA: Number,
    propB: [String, Number], // 可能是多种类型，
    propC: {
      type: String,
      required: true, // 必传且类型为 String
    },
    propD: {
      type: [String, null],
      required: true,
    },
    propE: {
      type: Number,
      default: 100, // 默认值
    },
    // 对象类型的默认值
    propF: {
      type: Object,
      default(rowProps: any) {
        return {
          msg: 'hello',
          rowProps,
        };
      },
    },
  });
</script>

<template>
  <p>
    然而对于传递 props 来说，使用 camelCase 并没有太多优势, 推荐使用 kebab-case（更符合 HTML 规范）
  </p>
  <h2>ref 来直接访问底层 DOM 元素， 在 setup 中使用 useTemplateRef 来获取 ref 的引用</h2>
  <p>
    ⚠️：在 vue3.5 之前， useTemplateRef 并未引入，可以声明一个与模板里的 ref attribute 向同的
    ref，然后通过 ref.value 访问底层 DOM
    元素。不管怎样，组件挂载后才能访问模板引用，如果在模板中的表达式上访问 input， 请确保 ref.value
    存在，然后使用 ref.value?.xxx()
  </p>
  <input ref="myInputRef" />

  <h2>组件上使用 ref</h2>
  <Child ref="myChildRef" name="Ref 中引入 Child 组件" @print="handlePrint" @update="handleUpdate">
    <div class="text-purple-500">默认插槽内容</div>
    <slot name="footer"><footer class="text-amber-500">具名插槽内容</footer></slot>
  </Child>

  <p>
    如果一个字组件使用的是选项式 API
    <text class="text-red-500"> 没有使用 ` &lt; script setup &gt; &lt;/script&gt; ` </text>,
    被引用的组件实例和该字组件的 this
    完全一致，这意味着父组件对字组件的每一个属性和方法都有完全的访问权，这使得在伏组件和子组件之间创建紧密耦合的实现细节变得很容易
  </p>

  <section>
    使用
    <div>`&lt;script setup&gt; &lt;/script>` 的组件默认 <b>私有的</b></div>
    ，一个父组件无法访问到一个使用 `&lt;script setup&gt; &lt;/script&gt;`
    的字组件的任何东西，除非使用 defineExpose 宏显示暴露
  </section>

  <h2>v-for 中使用 ref</h2>
  <p>
    v-for 中使用模板引用时，对应的 ref
    中包含的值是一个数组，它将在元素被挂在后包含对应整个列表的所有元素
  </p>

  <ul>
    <li v-for="item in items">
      <button ref="buttons" @click="() => console.log(item)">{{ item }}</button>
    </li>
  </ul>

  <h2>
    函数模板使用， 需要使用 ref v-bind 的形式, 只有动态 :ref
    绑定才能传入一个函数，当绑定的元素被卸载时，函数也会被调用一次，此时的 el 参数时 null
  </h2>
  <input
    :ref="
      (el) => {
        // 将 el 赋值给 一个数据属性火。ref 变量）
      }
    "
  />

  <section>
    一些补充细节： 所有 prop 默认都是可选的，除非声明了 required: true。 除 Boolean 外的未传递的可选
    prop 将会有一个默认值 undefined。 Boolean 类型的未传递 prop 将被转换为 false。这可以通过为它设置
    default 来更改——例如：设置为 default: undefined 将与非布尔类型的 prop 的行为保持一致。
    如果声明了 default 值，那么在 prop 的值被解析为 undefined 时，无论 prop 是未被传递还是显式指明的
    undefined，都会改为 default 值。 当 prop 的校验失败后，Vue 会抛出一个控制台警告 (在开发模式下)。
  </section>
</template>

<style scoped></style>
