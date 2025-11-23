import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3006,
  },
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    federation({
      name: "remote",
      filename: "remoteEntry.js",
      // exposes 暴露 组件或者使用的工具函数
      exposes: {
        "./c-button": "./src/components/button.tsx",
      },
      shared: ["react", "react-dom"],
    }) as PluginOption[],
  ],
});
