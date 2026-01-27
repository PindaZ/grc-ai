'use client';

import { FluentProvider } from '@fluentui/react-components';
import { AppProvider, useApp } from '@/context/AppContext';
import { useState, useEffect } from 'react';
import { capgeminiLight, capgeminiDark } from '@/theme/capgemini';

// Wrapper component that can access the theme from context
function ThemeWrapper({ children }: { children: React.ReactNode }) {
    const { themeMode } = useApp();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch by only rendering after mount
    useEffect(() => {
        setMounted(true);
    }, []);

    const theme = themeMode === 'dark' ? capgeminiDark : capgeminiLight;

    // During SSR and initial hydration, use light theme to avoid mismatch
    if (!mounted) {
        return (
            <FluentProvider theme={capgeminiLight}>
                {children}
            </FluentProvider>
        );
    }

    return (
        <FluentProvider theme={theme}>
            {children}
        </FluentProvider>
    );
}

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AppProvider>
            <ThemeWrapper>
                {children}
            </ThemeWrapper>
        </AppProvider>
    );
}
