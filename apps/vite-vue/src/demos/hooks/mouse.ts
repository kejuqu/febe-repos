import { ref, onMounted, onUnmounted } from 'vue';

export function useEventListener(target: Window | HTMLElement, event: string, handler: any) {
  onMounted(() => target.addEventListener(event, handler));
  onUnmounted(() => target.removeEventListener(event, handler));
}

// 按照惯例，组合式函数名以 use 开头
export function useMouse() {
  // 组合式函数的状态
  const x = ref(0);
  const y = ref(0);

  // 组合式函数可以随时更改其状态
  function update(e: MouseEvent) {
    x.value = e.pageX;
    y.value = e.pageY;
  }

  // 组合式函数也可以挂靠到所属组件的生命周期上
  useEventListener(window, 'mousemove', update);

  return { x, y, update };
}
