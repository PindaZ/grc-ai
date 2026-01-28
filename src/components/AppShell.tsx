'use client';

import { makeStyles, tokens } from '@fluentui/react-components';
import { NavSidebar } from './organisms/NavSidebar';
import { TopBar } from './organisms/TopBar';
import { AISidebar } from './organisms/AISidebar';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
        // Use the mesh gradient background from body, but we can add a subtle overlay if needed
        // gap: tokens.spacingHorizontalL, // Separated layout
        padding: '0', // Full bleed for now, sidebars will float
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
    },
    content: {
        flex: 1,
        overflow: 'auto',
    },
});

import { usePathname } from 'next/navigation';

export function AppShell({ children }: { children: React.ReactNode }) {
    const styles = useStyles();
    const pathname = usePathname();
    const isAuthPage = pathname?.startsWith('/auth');

    if (isAuthPage) {
        return (
            <div className={styles.container}>
                <div className={styles.main}>
                    <main className={styles.content}>
                        {children}
                    </main>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <NavSidebar />
            <div className={styles.main}>
                <TopBar />
                <main className={styles.content}>
                    {children}
                </main>
            </div>
            <AISidebar />
        </div>
    );
}
