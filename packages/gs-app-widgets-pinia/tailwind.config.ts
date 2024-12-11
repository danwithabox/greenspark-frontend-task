import type { Config } from "tailwindcss";

export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    darkMode: "media",
    theme:    {
        screens: {
            "tablet": "768px",
            // => @media (min-width: 640px) { ... }

            "laptop": "1024px",
            // => @media (min-width: 1024px) { ... }

            "desktop": "1280px",
            // => @media (min-width: 1280px) { ... }
        },
        extend: {
            fontSize: {
                "h1": "2.25rem",     // 36px
                "h2": "1.875rem",    // 30px
                "h3": "1.5rem",      // 24px
                "h4": "1.25rem",     // equivalent to 20px
                "h5": "1rem",        // equivalent to 16px
                "h6": "0.875rem",    // equivalent to 14px
                "lg": "17.86px",
                "md": "14px",
                "sm": "12px",
            },
        },
    },
    plugins: [],
} satisfies Config;
