'use client';

import { makeStyles, tokens, shorthands } from '@fluentui/react-components';
import { SparkleRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        gap: '12px',
        padding: '12px 20px',
        background: tokens.colorBrandBackground2,
        backdropFilter: 'blur(8px)',
        borderRadius: '16px',
        ...shorthands.border('1px', 'solid', tokens.colorBrandStroke2),
        marginBottom: '32px',
        alignItems: 'center',
    },
    label: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: tokens.colorBrandForeground1,
        fontSize: '11px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
        marginRight: '8px',
        flexShrink: 0,
    },
});

interface QuickActionsBarProps {
    children: React.ReactNode;
}

export function QuickActionsBar({ children }: QuickActionsBarProps) {
    const styles = useStyles();

    return (
        <div className={styles.root}>
            <span className={styles.label}>
                <SparkleRegular fontSize={14} /> AI Actions:
            </span>
            {children}
        </div>
    );
}
