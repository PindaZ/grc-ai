import {
    Theme,
    webLightTheme,
    webDarkTheme,
    BrandVariants,
    createDarkTheme,
    createLightTheme,
} from "@fluentui/react-components";

// "Deep Indigo" Brand Palette - More fast/modern than standard Blue
const premiumBrand: BrandVariants = {
    10: "#020305",
    20: "#111723",
    30: "#16263D",
    40: "#193253",
    50: "#1B3F6A",
    60: "#1D4C82",
    70: "#1E599A",
    80: "#1F67B3",
    90: "#2576C8", // Primary
    100: "#3A85CF",
    110: "#5092D5",
    120: "#65A0DC",
    130: "#7BAEE2",
    140: "#92BCE8",
    150: "#A9CAEE",
    160: "#C1D9F4",
};

// Custom "Glass" and "Premium" tokens that extend the base theme visually
// Note: We'll apply these via inline styles or custom classes since Fluent v9 is strict
export const premiumTokens = {
    glass: {
        background: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(12px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.5)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
    },
    gradients: {
        hero: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        brand: "linear-gradient(135deg, #1E599A 0%, #2576C8 100%)",
    },
    shadows: {
        cardHover: "0 10px 40px -10px rgba(0,0,0,0.15)",
    }
};

export const lightTheme: Theme = {
    ...createLightTheme(premiumBrand),
    // We can override specific semantic tokens here if needed
    colorNeutralBackground1: "#F8FAFC", // Slightly cooler white for background
    colorNeutralBackground2: "#FFFFFF", // Cards
};

export const darkTheme: Theme = {
    ...createDarkTheme(premiumBrand),
};
