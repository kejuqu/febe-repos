import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// dev config
export const devConfig: UserConfig = {
  root: process.cwd(), // project root
  base: "/", // base public path when served in dev
  plugins: [react()], // plugins
  server: {
    host: true, // listen on all address, useful for LAN testing
    port: 3010, // dev server port
    open: true, // open browser on server start
    strictPort: false, // exit if port is already in use
    hmr: {
      protocol: "ws",
      host: "localhost",
    },
    proxy: {
      // proxy API calls to backend during development
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "src"),
    },
  },
  css: {
    devSourcemap: true, // generate css sourcemaps for easier debugging
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  define: {
    // define global variables
    __DEV__: true,
  },
  optimizeDeps: {
    include: ["react-router-dom", "react-router-config"], // pre-bundle these dependencies
    exclude: ["@types/react-dom", "@types/react"],
  },
  esbuild: {
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment",
  },
  build: {
    sourcemap: true,
    minify: false,
    outDir: "dist",
  },
};

// production config
export const prodConfig: UserConfig = {
  root: process.cwd(),
  base: "/app/", // adjust if site will be deployed to a subdirectory
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "src"),
    },
  },
  build: {
    target: "es2019",
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) {
              return "vendor_react";
            }

            return "vendor";
          }
        },
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
      },
    },
  },
};
