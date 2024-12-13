import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { execa } from "execa";

const port = process.env.PORT ? Number.parseInt(process.env.PORT) : 5202;

async function customCommands() {
    console.info(`Running "npm run watch:gs-lib-ui"`);
    execa({ stdout: ["pipe", "inherit"], stderr: ["pipe", "inherit"], })`npm run watch:gs-lib-ui`;
}

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
        {
            name:  "custom-commands",
            apply: (config, env) => {
                if (process.env.VITEST) return false;
                return env.mode === "serve";
            },
            buildStart: async () => { await customCommands(); },
        },
    ],
    server: {
        port,
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
    optimizeDeps: {
        exclude: [
            "@greenspark-task/lib-ui",
        ],
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
