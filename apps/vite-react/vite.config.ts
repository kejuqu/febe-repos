import { defineConfig } from "vite";
import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3005,
  },
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    federation({
      name: "customer",
      filename: "vite-react.js",
      // // exposes 暴露 组件或者使用的工具函数
      // exposes: {
      //   "./button": "./src/components/button.tsx",
      // },
      remotes: {
        remote: {
          type: "module",
          name: "remote",
          entry: "http://localhost:3006/remoteEntry.js",
          entryGlobalName: "remote",
          shareScope: "default",
        },
      },
      shared: ["react", "react-dom"],
    }),
  ],
});
