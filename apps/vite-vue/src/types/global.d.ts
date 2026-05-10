import type { Directive } from 'vue';

type HighlightDirective = Directive<HTMLElement, string>;

declare module 'vue' {
  export interface ComponentCustomProperties {
    // 使用 v 作为自定义指令的前缀
    vHighlight: HighlightDirective;
    $t: (key: string) => string;
  }
}

import type { AxiosRequestConfig } from 'axios';

export interface RequestConfig<T = any> extends AxiosRequestConfig {
  /** 是否直接返回 axios response */
  raw?: boolean;
  /** 是否显示错误提示 */
  showError?: boolean;
  /** 是否携带 token */
  withToken?: boolean;
}
