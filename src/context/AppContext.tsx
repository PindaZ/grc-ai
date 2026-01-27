'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole } from '@/types';
import { Client } from '@/types/client';

export type ThemeMode = 'light' | 'dark';

const MOCK_CLIENTS: Client[] = [
    { id: '1', name: 'TechCorp Solutions', industry: 'FinTech', status: 'active' },
    { id: '2', name: 'HealthData Inc', industry: 'Healthcare', status: 'audit-mode' },
    { id: '3', name: 'Global Logistics', industry: 'Industrial', status: 'onboarding' },
];

interface AppContextType {
    currentRole: UserRole;
    setCurrentRole: (role: UserRole) => void;
    currentClient: Client;
    setCurrentClient: (client: Client) => void;
    clients: Client[];
    aiSidebarOpen: boolean;
    setAiSidebarOpen: (open: boolean) => void;
    navSidebarCollapsed: boolean;
    setNavSidebarCollapsed: (collapsed: boolean) => void;
    themeMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => void;
    toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [currentRole, setCurrentRole] = useState<UserRole>('control-owner');
    const [currentClient, setCurrentClient] = useState<Client>(MOCK_CLIENTS[0]);
    const [aiSidebarOpen, setAiSidebarOpen] = useState(true);
    const [navSidebarCollapsed, setNavSidebarCollapsed] = useState(false);
    const [themeMode, setThemeMode] = useState<ThemeMode>('light');

    // Initialize theme from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('grc-theme-mode');
        if (stored === 'light' || stored === 'dark') {
            setThemeMode(stored);
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setThemeMode(prefersDark ? 'dark' : 'light');
        }
    }, []);

    // Persist theme to localStorage
    useEffect(() => {
        localStorage.setItem('grc-theme-mode', themeMode);
    }, [themeMode]);

    const toggleTheme = () => {
        setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <AppContext.Provider
            value={{
                currentRole,
                setCurrentRole,
                currentClient,
                setCurrentClient,
                clients: MOCK_CLIENTS,
                aiSidebarOpen,
                setAiSidebarOpen,
                navSidebarCollapsed,
                setNavSidebarCollapsed,
                themeMode,
                setThemeMode,
                toggleTheme,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
}
