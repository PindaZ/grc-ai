'use client';

import {
    makeStyles,
    tokens,
    Text,
    ProgressBar,
    Badge,
    shorthands
} from '@fluentui/react-components';
import {
    BotRegular,
    CheckmarkCircleRegular,
    WarningRegular,
    PulseRegular
} from '@fluentui/react-icons';
import { motion } from 'framer-motion';
import Link from 'next/link';

const useStyles = makeStyles({
    container: {
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        height: '100%',
    },
    statRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    healthBar: {
        marginTop: '8px',
        marginBottom: '4px',
    },
    statusFooter: {
        marginTop: 'auto',
        backgroundColor: tokens.colorNeutralBackground2,
        padding: '12px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        textDecorationLine: 'none',
        '&:hover': {
            backgroundColor: tokens.colorNeutralBackground2Hover,
            transform: 'translateY(-2px)',
        }
    },
    titleLink: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '4px',
        textDecorationLine: 'none',
        color: 'inherit',
        '&:hover': {
            color: tokens.colorBrandForeground1,
        }
    }
});

import { useStats } from '@/hooks/useData';
import { Spinner } from '@fluentui/react-components';

export const AgentStatusWidget = () => {
    const styles = useStyles();
    const { stats, isLoading } = useStats();

    const workforceStats = [
        { label: 'System Compliance', value: stats?.systemHealth || 94, color: 'success' as const, icon: <CheckmarkCircleRegular /> },
        { label: 'Agent Uptime', value: 99.8, color: 'brand' as const, icon: <PulseRegular /> },
        { label: 'Task Throughput', value: stats?.actions24h ? Math.min(100, (stats.actions24h / 500) * 100).toFixed(1) : 82, color: 'brand' as const, icon: <BotRegular /> },
    ];

    return (
        <div className={styles.container}>
            <Link href="/agents" className={styles.titleLink}>
                <BotRegular style={{ fontSize: '24px', color: tokens.colorBrandForeground1 }} />
                <Text size={500} weight="bold">Workforce Health</Text>
            </Link>

            {isLoading ? (
                <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Spinner size="small" />
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {workforceStats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className={styles.statRow}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ color: tokens.colorNeutralForeground3 }}>{stat.icon}</span>
                                    <Text size={200} weight="semibold" style={{ color: tokens.colorNeutralForeground2 }}>{stat.label}</Text>
                                </div>
                                <Text size={200} weight="bold">{stat.value}%</Text>
                            </div>
                            <ProgressBar
                                className={styles.healthBar}
                                value={typeof stat.value === 'string' ? parseFloat(stat.value) / 100 : stat.value / 100}
                                color={stat.color}
                                thickness="large"
                            />
                        </motion.div>
                    ))}
                </div>
            )}

            <Link href="/execution" className={styles.statusFooter}>
                <WarningRegular style={{ color: tokens.colorPaletteDarkOrangeForeground1 }} />
                <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>
                    {stats?.agentsActive || 4} autonomous agents are currently active. {stats?.pendingReview || 0} tasks require human verification.
                </Text>
            </Link>
        </div>
    );
};
