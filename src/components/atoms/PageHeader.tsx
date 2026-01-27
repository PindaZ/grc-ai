'use client';

import { makeStyles, tokens, Text, shorthands } from '@fluentui/react-components';

const useStyles = makeStyles({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: '40px',
        borderBottom: `1px solid ${tokens.colorNeutralStrokeSubtle}`,
        paddingBottom: '24px',
    },
    titleGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        fontSize: '40px',
        fontWeight: '800',
        color: tokens.colorNeutralForeground1,
        letterSpacing: '-0.02em',
        lineHeight: '1.2',
    },
    subtitle: {
        color: tokens.colorNeutralForeground3,
        fontSize: tokens.fontSizeBase400,
        fontWeight: '400',
        marginTop: '4px',
    },
    actions: {
        display: 'flex',
        gap: tokens.spacingHorizontalS,
        alignItems: 'center',
    },
});

interface PageHeaderProps {
    title: string;
    description?: string;
    children?: React.ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
    const styles = useStyles();

    return (
        <header className={styles.header}>
            <div className={styles.titleGroup}>
                <Text as="h1" className={styles.title}>
                    {title}
                </Text>
                {description && (
                    <Text className={styles.subtitle}>
                        {description}
                    </Text>
                )}
            </div>
            {children && <div className={styles.actions}>{children}</div>}
        </header>
    );
}
