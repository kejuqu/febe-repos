// api/services/BaseService.ts
import type { RequestConfig } from '@/types/global';
import service from '@/utils/request/instance';

export class BaseService {
  protected request<T>(config: RequestConfig<T>): Promise<T> {
    return service.request<any, T>(config as any);
  }

  protected get<T>(url: string, params?: any, config?: RequestConfig<T>) {
    return this.request<T>({
      url,
      method: 'GET',
      params,
      ...(config || {}),
    });
  }

  protected post<T>(url: string, data?: any, config?: RequestConfig<T>) {
    return this.request<T>({
      url,
      method: 'POST',
      data,
      ...(config || {}),
    });
  }

  protected put<T>(url: string, data?: any, config?: RequestConfig<T>) {
    return this.request<T>({
      url,
      method: 'PUT',
      data,
      ...(config || {}),
    });
  }

  protected delete<T>(url: string, params?: any, config?: RequestConfig<T>) {
    return this.request<T>({
      url,
      method: 'DELETE',
      params,
      ...(config || {}),
    });
  }
}
