import type { Directive } from 'vue';

type HighlightDirective = Directive<HTMLElement, string>;

declare module 'vue' {
  export interface ComponentCustomProperties {
    // 使用 v 作为自定义指令的前缀
    vHighlight: HighlightDirective;
    $t: (key: string) => string;
  }
}
