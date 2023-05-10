import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// 按需引入element-plus
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

const resolve = (dir:string) => path.join(__dirname,dir)

// https://vitejs.dev/config/
export default defineConfig({
  base:'/vue3-music/',
  resolve: {
    // 配置别名
    alias: {
      "@": resolve( "src"),
      "coms": resolve( "src/components"),
      "utils": resolve( "src/utils"),
    },
  },
  plugins: [
    vue(),

    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
});
