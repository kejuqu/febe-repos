import { defineConfig, type PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import autoImport from 'unplugin-auto-import/vite';
import components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import vueRouter from 'unplugin-vue-router/vite';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3004,
  },
  plugins: [
    vueRouter({
      /* options */
    }),
    vue(),
    tailwindcss(),
    autoImport({
      resolvers: [ElementPlusResolver()],
    }),
    components({
      resolvers: [ElementPlusResolver()],
    }),
  ] as PluginOption[],
});
