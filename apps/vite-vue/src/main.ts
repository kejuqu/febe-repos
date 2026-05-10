import { createApp } from 'vue';
import './global.css';
import App from './App.vue';
import i18nPlugin from './demos/plugins/i18n';
import { routes, handleHotUpdate } from 'vue-router/auto-routes';
import { createRouter, createWebHistory } from 'vue-router';
import './mock/index';

import '@/utils/request/interceptor';

const app = createApp(App);

/**
 * 全局注册一个组件
 */
const GlobalHelloWorld = {
  template:
    '<div class="p-4 mb-4 bg-blue-100 text-blue-800 rounded-lg border-2 border-blue-300 font-bold">🌍 全局注册的HelloWorld组件</div>',
};

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 应用层面提供依赖
app.provide('global', {
  name: 'global',
  value: 'global',
  msg: '应用级别提供的数据在该应用内的所有组件中都可以注入',
});

if (import.meta.hot) {
  handleHotUpdate(router);
}

app
  .use(i18nPlugin, {
    greetings: {
      hello: '你好',
    },
  })
  .use(router);

app.component('GlobalHelloWorld', GlobalHelloWorld);

// 注意 app.use, app.component, app.provide 一定要在 app.mount 之前执行
app.mount('#app');
