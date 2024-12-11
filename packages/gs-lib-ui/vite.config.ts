import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { execa } from "execa";

const port = process.env.PORT ? Number.parseInt(process.env.PORT) : 5201;

async function customCommands() {
    await execa({ stdout: ["pipe", "inherit"], stderr: ["pipe", "inherit"], })`npm run build:types`;
}

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
        {
            name:     "custom-commands",
            buildEnd: async () => { await customCommands(); },
        },
    ],
    server: {
        port,
    },
    build: {
        emptyOutDir: false,
        lib:         {
            name:    "@greenspark-task/lib-ui",
            entry:   fileURLToPath(new URL("./src/index.ts", import.meta.url)),
            formats: ["es", "umd"],
        },
        rollupOptions: {
            external: ["vue"],
            output:   {
                // Provide global variables to use in the UMD build for externalized deps
                globals: {
                    vue: "Vue",
                },
            },
        },
    },
    resolve: {
        alias: {
            "~": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: "modern-compiler",

                /** This will be auto-prepended to every Vue component's `<style lang="scss">` block */
                additionalData: `@use "~/assets/scss/base.scss" as *;\n`,
            },
        },
    },
});

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string | undefined,
        }
    }
}
