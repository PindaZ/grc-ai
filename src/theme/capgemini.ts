import { webLightTheme, webDarkTheme, Theme } from '@fluentui/react-components';

// Capgemini Brand Colors
const brandPrimary = '#0070AD'; // Capgemini Blue
const brandSecondary = '#17ABDA'; // Vibrant Blue
const brandDark = '#1F3A93'; // Deep Blue style

// Custom overrides for "Modern" and "Less Rectangly" look
const commonOverrides = {
    fontFamilyBase: '"Ubuntu", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    borderRadiusSmall: '4px',
    borderRadiusMedium: '8px',
    borderRadiusLarge: '12px',
    borderRadiusXLarge: '16px',
};

export const capgeminiLight: Theme = {
    ...webLightTheme,
    ...commonOverrides,
    // Brand Color Overrides (Simplified Palette)
    colorBrandBackground: brandPrimary,
    colorBrandBackgroundHover: '#005a8f', // Darker shade
    colorBrandBackgroundPressed: '#00456e', // Even darker
    colorBrandBackgroundSelected: '#005a8f',

    colorBrandForeground1: brandPrimary,
    colorBrandForeground2: brandDark,
    colorBrandForegroundLink: brandPrimary,
    colorBrandForegroundLinkHover: '#005a8f',

    // Interactive Overrides
    colorCompoundBrandBackground: brandPrimary,
    colorCompoundBrandBackgroundHover: '#005a8f',
    colorCompoundBrandBackgroundPressed: '#00456e',

    colorCompoundBrandStroke: brandPrimary,
    colorCompoundBrandStrokeHover: '#005a8f',
    colorCompoundBrandStrokePressed: '#00456e',
};

export const capgeminiDark: Theme = {
    ...webDarkTheme,
    ...commonOverrides,
    // Brand Color Overrides for Dark Mode
    // Usually lighter for accessibility on dark backgrounds
    colorBrandBackground: brandSecondary, // Brighter blue for dark mode
    colorBrandBackgroundHover: '#33b9e0', // Lighten
    colorBrandBackgroundPressed: '#5bc5e6', // Even lighter

    colorBrandForeground1: brandSecondary,
    colorBrandForeground2: '#5bc5e6',
    colorBrandForegroundLink: brandSecondary,
    colorBrandForegroundLinkHover: '#33b9e0',

    colorCompoundBrandBackground: brandSecondary,
    colorCompoundBrandBackgroundHover: '#33b9e0',
    colorCompoundBrandBackgroundPressed: '#5bc5e6',

    colorCompoundBrandStroke: brandSecondary,
};
