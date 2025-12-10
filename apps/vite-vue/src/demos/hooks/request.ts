import { ref, watchEffect, toValue } from 'vue';

/**
组合式函数只能在 <script setup> 或 setup() 钩子中被调用。
在这些上下文中，它们也只能被同步调用。
在某些情况下，你也可以在像 onMounted() 这样的生命周期钩子中调用它们
 */
export function useFetch(url: string) {
  /**
   * 你可能已经注意到了，我们一直在组合式函数中使用 ref() 而不是 reactive()。
   * 我们推荐的约定是组合式函数始终返回一个包含多个 ref 的普通的非响应式对象，
   * 这样该对象在组件中被解构为 ref 之后仍可以保持响应性：
   */
  const data = ref(null);
  const error = ref(null);

  const fetchData = () => {
    data.value = null;
    error.value = null;

    /**
     * toValue 它的设计目的是将 ref 或 getter 规范化为值。如果参数是 ref，它会返回 ref 的值；如果参数是函数
     * 它会调用函数并返回其返回值。否则，它会原样返回参数。它的工作方式类似于 unref()，但对函数有特殊处理
     */
    fetch(toValue(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err));
  };

  watchEffect(() => fetchData());

  return { data, error };
}
