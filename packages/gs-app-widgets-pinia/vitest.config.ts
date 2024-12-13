import { configDefaults, defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";
import { fileURLToPath } from "url";

export default mergeConfig(viteConfig, defineConfig({
    test: {
        environment: "happy-dom",
        exclude:     [
            ...configDefaults.exclude,
        ],
        root: fileURLToPath(new URL("./", import.meta.url)),
    },
}));

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
        interface ProcessEnv {
            VITEST: string | undefined,
        }
    }
}
