import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import inheritAttrs from "vite-plugin-vue-setup-inherit-attrs";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === "development";
  const base = "/SIGNooo/";

  return {
    base,
    plugins: [
      vue(),
      vueJsx(),
      inheritAttrs(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver({ importStyle: "sass" })],
      }),
      VitePWA({
        includeAssets: ["favicon.ico", "apple-touch-icon.png"],
        registerType: "autoUpdate",
        manifest: {
          name: "SIGNooo",
          short_name: "SIGNooo",
          description: "隨時隨地都能簽， SIGNooo 幫你省下大筆時間！",
          theme_color: "#ffffff",
          icons: [
            {
              src: "android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
        devOptions: {
          enabled: true,
        },
      }),
    ],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/style/global/index.scss" as *;',
        },
      },
    },
    server: {
      host: "0.0.0.0",
      port: 8080,
      open: base,
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vue: [
              "vue",
              "vue-router",
              "vue-cryptojs",
              "element-plus",
              "@element-plus/icons-vue",
            ],
          },
        },
      },
    },
  };
});
