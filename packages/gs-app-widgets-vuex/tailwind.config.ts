import type { Config } from "tailwindcss";
import { preset } from "@greenspark-task/lib-ui";

export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        "./../../packages/gs-lib-ui/**/*.{vue,js,ts,jsx,tsx}",
    ],
    darkMode: "media",
    plugins:  [],
    presets:  [
        preset,
    ],
} satisfies Config;
