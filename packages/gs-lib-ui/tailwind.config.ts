import type { Config } from "tailwindcss";
import { preset } from "./src/tailwind/preset";

export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    darkMode: "media",
    plugins:  [],
    presets:  [
        preset,
    ],
} satisfies Config;
