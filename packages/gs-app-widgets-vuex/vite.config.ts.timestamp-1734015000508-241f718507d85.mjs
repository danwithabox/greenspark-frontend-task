// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///A:/_DEV/_PERSONAL/danwithabox/greenspark-frontend-task/node_modules/vite/dist/node/index.js";
import vue from "file:///A:/_DEV/_PERSONAL/danwithabox/greenspark-frontend-task/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueDevTools from "file:///A:/_DEV/_PERSONAL/danwithabox/greenspark-frontend-task/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import { execa } from "file:///A:/_DEV/_PERSONAL/danwithabox/greenspark-frontend-task/node_modules/execa/index.js";
var __vite_injected_original_import_meta_url = "file:///A:/_DEV/_PERSONAL/danwithabox/greenspark-frontend-task/packages/gs-app-widgets-pinia/vite.config.ts";
var port = process.env.PORT ? Number.parseInt(process.env.PORT) : 5202;
async function customCommands() {
  console.info(`Running "npm run watch:gs-lib-ui"`);
  execa({ stdout: ["pipe", "inherit"], stderr: ["pipe", "inherit"] })`npm run watch:gs-lib-ui`;
}
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    {
      name: "custom-commands",
      apply: "serve",
      buildStart: async () => {
        await customCommands();
      }
    }
  ],
  server: {
    port
  },
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        /** This will be auto-prepended to every Vue component's `<style lang="scss">` block */
        additionalData: `@use "~/assets/scss/base.scss" as *;
`
      }
    }
  },
  optimizeDeps: {
    exclude: [
      "@greenspark-task/lib-ui"
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJBOlxcXFxfREVWXFxcXF9QRVJTT05BTFxcXFxkYW53aXRoYWJveFxcXFxncmVlbnNwYXJrLWZyb250ZW5kLXRhc2tcXFxccGFja2FnZXNcXFxcZ3MtYXBwLXdpZGdldHMtcGluaWFcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkE6XFxcXF9ERVZcXFxcX1BFUlNPTkFMXFxcXGRhbndpdGhhYm94XFxcXGdyZWVuc3BhcmstZnJvbnRlbmQtdGFza1xcXFxwYWNrYWdlc1xcXFxncy1hcHAtd2lkZ2V0cy1waW5pYVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQTovX0RFVi9fUEVSU09OQUwvZGFud2l0aGFib3gvZ3JlZW5zcGFyay1mcm9udGVuZC10YXNrL3BhY2thZ2VzL2dzLWFwcC13aWRnZXRzLXBpbmlhL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSBcIm5vZGU6dXJsXCI7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xyXG5pbXBvcnQgdnVlRGV2VG9vbHMgZnJvbSBcInZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29sc1wiO1xyXG5pbXBvcnQgeyBleGVjYSB9IGZyb20gXCJleGVjYVwiO1xyXG5cclxuY29uc3QgcG9ydCA9IHByb2Nlc3MuZW52LlBPUlQgPyBOdW1iZXIucGFyc2VJbnQocHJvY2Vzcy5lbnYuUE9SVCkgOiA1MjAyO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gY3VzdG9tQ29tbWFuZHMoKSB7XHJcbiAgICBjb25zb2xlLmluZm8oYFJ1bm5pbmcgXCJucG0gcnVuIHdhdGNoOmdzLWxpYi11aVwiYCk7XHJcbiAgICBleGVjYSh7IHN0ZG91dDogW1wicGlwZVwiLCBcImluaGVyaXRcIl0sIHN0ZGVycjogW1wicGlwZVwiLCBcImluaGVyaXRcIl0sIH0pYG5wbSBydW4gd2F0Y2g6Z3MtbGliLXVpYDtcclxufVxyXG5cclxuLy8gaHR0cHM6Ly92aXRlLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgdnVlKCksXHJcbiAgICAgICAgdnVlRGV2VG9vbHMoKSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICAgICAgIFwiY3VzdG9tLWNvbW1hbmRzXCIsXHJcbiAgICAgICAgICAgIGFwcGx5OiAgICAgIFwic2VydmVcIixcclxuICAgICAgICAgICAgYnVpbGRTdGFydDogYXN5bmMgKCkgPT4geyBhd2FpdCBjdXN0b21Db21tYW5kcygpOyB9LFxyXG4gICAgICAgIH0sXHJcbiAgICBdLFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgICAgcG9ydCxcclxuICAgIH0sXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgYWxpYXM6IHtcclxuICAgICAgICAgICAgXCJ+XCI6IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vc3JjXCIsIGltcG9ydC5tZXRhLnVybCkpLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgY3NzOiB7XHJcbiAgICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICAgICAgICBzY3NzOiB7XHJcbiAgICAgICAgICAgICAgICBhcGk6IFwibW9kZXJuLWNvbXBpbGVyXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgLyoqIFRoaXMgd2lsbCBiZSBhdXRvLXByZXBlbmRlZCB0byBldmVyeSBWdWUgY29tcG9uZW50J3MgYDxzdHlsZSBsYW5nPVwic2Nzc1wiPmAgYmxvY2sgKi9cclxuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgQHVzZSBcIn4vYXNzZXRzL3Njc3MvYmFzZS5zY3NzXCIgYXMgKjtcXG5gLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICAgICAgZXhjbHVkZTogW1xyXG4gICAgICAgICAgICBcIkBncmVlbnNwYXJrLXRhc2svbGliLXVpXCIsXHJcbiAgICAgICAgXSxcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuZGVjbGFyZSBnbG9iYWwge1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1uYW1lc3BhY2VcclxuICAgIG5hbWVzcGFjZSBOb2RlSlMge1xyXG4gICAgICAgIGludGVyZmFjZSBQcm9jZXNzRW52IHtcclxuICAgICAgICAgICAgUE9SVDogc3RyaW5nIHwgdW5kZWZpbmVkLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRiLFNBQVMsZUFBZSxXQUFXO0FBQy9kLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLGlCQUFpQjtBQUN4QixTQUFTLGFBQWE7QUFKdVEsSUFBTSwyQ0FBMkM7QUFNOVUsSUFBTSxPQUFPLFFBQVEsSUFBSSxPQUFPLE9BQU8sU0FBUyxRQUFRLElBQUksSUFBSSxJQUFJO0FBRXBFLGVBQWUsaUJBQWlCO0FBQzVCLFVBQVEsS0FBSyxtQ0FBbUM7QUFDaEQsUUFBTSxFQUFFLFFBQVEsQ0FBQyxRQUFRLFNBQVMsR0FBRyxRQUFRLENBQUMsUUFBUSxTQUFTLEVBQUcsQ0FBQztBQUN2RTtBQUdBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVM7QUFBQSxJQUNMLElBQUk7QUFBQSxJQUNKLFlBQVk7QUFBQSxJQUNaO0FBQUEsTUFDSSxNQUFZO0FBQUEsTUFDWixPQUFZO0FBQUEsTUFDWixZQUFZLFlBQVk7QUFBRSxjQUFNLGVBQWU7QUFBQSxNQUFHO0FBQUEsSUFDdEQ7QUFBQSxFQUNKO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNMLE9BQU87QUFBQSxNQUNILEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDeEQ7QUFBQSxFQUNKO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDRCxxQkFBcUI7QUFBQSxNQUNqQixNQUFNO0FBQUEsUUFDRixLQUFLO0FBQUE7QUFBQSxRQUdMLGdCQUFnQjtBQUFBO0FBQUEsTUFDcEI7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUFBLEVBQ0EsY0FBYztBQUFBLElBQ1YsU0FBUztBQUFBLE1BQ0w7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
