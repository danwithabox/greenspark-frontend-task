import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        env: {
            VITEST: "true",
        },
    },
});

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
        interface ProcessEnv {
            VITEST: string | undefined,
        }
    }
}
