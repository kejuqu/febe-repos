import { useRef, useEffect } from "react";

export default function useWorker<T = any, R = any>(workerUrl: string) {
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    return () => workerRef.current?.terminate(); // 组件卸载自动清理
  }, []);

  const run = (payload: T): Promise<R> =>
    new Promise((resolve, reject) => {
      // 创建 web worker 实例，并传入 workerUrl 和配置
      workerRef.current = new Worker(workerUrl, {
        type: "module",
      });
      // 将 web worker 的 onmessage 事件监听的数据返回给调用者，方便调用者处理
      workerRef.current.onmessage = (e) => {
        resolve(e.data);
        workerRef.current?.terminate();
      };
      workerRef.current.onerror = reject;
      workerRef.current.postMessage(payload);
    });

  return run;
}
