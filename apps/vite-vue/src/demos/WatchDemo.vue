<script setup lang="ts">
  import { ref, watch, reactive, watchEffect } from 'vue';

  const mockRequest = (question: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`${Math.random() * 10000} ${question}`);
      }, 1000);
    });
  };

  const question = ref('');
  const answer = ref('Questions usually contain a question mark (?).');
  const loading = ref(false);

  // watch 的第一个参数可以是一个 ref/computedVal  或一个响应式对象，或者是一个 getter 函数也可以是镀铬数据源组成的数组
  watch(question, async (newQuestion, oldQuestion) => {
    if (newQuestion.includes('?')) {
      loading.value = true;
      answer.value = 'Thinking...';

      try {
        answer.value = await mockRequest(newQuestion);
      } catch (error) {
        if (error instanceof Error) {
          answer.value = error.message;
        } else {
          answer.value = 'An error occurred';
        }
      } finally {
        loading.value = false;
      }
    }
  });

  /**
   对于有多个依赖的侦听器来说， watchEffect 可以消除手动维护依赖列表的负担，因为它只跟踪回调中被使用到的属性，而不是递归地跟踪所有的属性

   watchEffect 仅在同步执行期间才会追踪依赖。
   
   在使用异步回调时，只有在第一个 await 正常工作钱访问到的属性才会被追踪

   默认情况下： 侦听器回调会在伏组件更新只有，所属组件的 DOM 更新之前被调用，如果在侦听器中访问所属组件的 DOM，那么 DOM 将处于更新前的状态
   如果想在侦听器回调中能访问被 Vue 更新之后的所属组件的 DOM，那么需要将 侦听器的 flush option 设置为 flush: 'post' 或者使用 watchPostEffect

   */

  // watchEffect 函数来简化 watch，而且不需要指定 immediate:true, 也不需要指定依赖哪个状态， watchEffect 会自动追踪的依赖
  const goodsId = ref(1);
  watchEffect(async () => {
    // 自动监听 goodsId 状态， 初始化和 goodsId 状态变化时都会触发
    try {
      const res = await fetch(`https://api.example.com/goods/${goodsId.value}`);
      const data = await res.json();
      console.log('watchEffect: ', data);
    } catch (error) {}
  });

  // // getter 作为第一个参数
  // watch(
  //   () => question.value,
  //   async (newQuestion) => {
  //     console.log('watch 一个 getter 函数');
  //   }
  // );

  // // 不能watch 一个 nil 值 和 基本数据类型，如果非得使用，可以使用 getter 函数来处理,
  // watch(
  //   () => null,
  //   () => {
  //     console.log('watch 一个 nil 值');
  //   }
  // );

  // watch([question, answer], ([q, a]) => {
  //   console.log('watch 一个数组: ', q, a);
  // });

  const obj = reactive({
    count: 0,
    count2: 0,
  });

  // 当接听一个 reactive 对象的时候，只要改变对象中的属性值，就会触发 watch 监听
  watch(obj, (newValue, oldValue) => {
    /**
     * 直接给 watch 传入一个响应式对象，会隐式地创建一个深层监听器，该回调函数在所有嵌套的变更时都会被触发
     */
    console.log(
      'watch 一个对象: ',
      newValue,
      oldValue,
      'newValue === oldValue: ',
      newValue === oldValue
    );
  });

  obj.count++;

  // 即时回调的监听器
  // 默认 watch 默认时懒执行的，仅当数据变化的时候才触发回调函数。如果在创建的时候要理解执行，可以指定 immediate: true 来强制触发回调函数

  const source = ref('');
  watch(
    source,
    (newValue, oldValue) => {
      //  // 立即执行，当 `source` 改变时也会再次执行
    },
    {
      immediate: true,
      // once: true, // 如果监听的 对象只在源变化时触发一次，可以使用 once 选项
    }
  );

  // 如果侦听器使用异步创建一个侦听器，那么它不会绑定到当前组件上，必须手动停止它才能防止内存泄露
  watchEffect(() => {
    // 同步语句创建的 侦听器，组件卸载的时候会自动停止
  });

  setTimeout(() => {
    // 异步语句创建一个异步侦听器，需要自定去取消侦听器
    const unwatch = watchEffect(() => {
      return 3;
    });

    unwatch();
  });
</script>

<template>
  <button @click="obj.count++">change obj.count</button>
  <button @click="obj.count2++">change obj.count2</button>
  <p>
    watch 函数可以在状态变化的时候执行一些副作用： 比如更改 DOM 或者根据异步结果去修改另一处状态。
  </p>

  <section>
    <label for="question">Ask a yes/no question:</label>
    <input id="question" v-model="question" :disabled="loading" class="border rounded-md" />
    <p>answer is: {{ answer }}</p>
  </section>

  <p>同步侦听器； watch 或者 watchEffect 指定 flush:async 或者 watchSyncEffect((() => { }))</p>
  <p>
    在 setup 中使用同步语句创建侦听器，会自动绑定到宿主组件实例上，并且会在宿主组件卸载时自动停止
  </p>
  <section></section>
</template>

<style scoped></style>
