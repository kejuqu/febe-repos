import { ElMessage } from 'element-plus';

const pendingMap = new Map<string, AbortController>();

function getKey(config: any) {
  return `${config.method}:${config.url}`;
}

export function addPending(config: any) {
  const key = getKey(config);
  if (pendingMap.has(key)) {
    pendingMap.get(key)!.abort();
  }

  const controller = new AbortController();
  config.signal = controller.signal;
  pendingMap.set(key, controller);
}

export function removePending(config: any) {
  const key = getKey(config);
  pendingMap.delete(key);
}

export function handleError(error: any, showError = true) {
  if (!showError) return;

  const msg = error?.message || error?.response?.data?.message || '网络异常';

  ElMessage.error(msg);
}
