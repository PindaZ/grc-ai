'use client';

import {
    makeStyles,
    tokens,
    Text,
    Avatar,
    Badge,
    shorthands
} from '@fluentui/react-components';
import {
    SparkleRegular,
    PulseRegular
} from '@fluentui/react-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '20px',
        height: '100%',
    },
    tickerItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px',
        backgroundColor: tokens.colorNeutralBackgroundAlpha,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStrokeSubtle),
        ...shorthands.borderRadius('12px'),
        transition: 'all 0.2s ease',
        '&:hover': {
            backgroundColor: tokens.colorNeutralBackgroundAlpha2,
            transform: 'translateX(4px)',
        },
    },
    activityText: {
        flex: 1,
        fontSize: '13px',
    },
    timestamp: {
        fontSize: '11px',
        color: tokens.colorNeutralForeground4,
        fontWeight: '500',
    },
    titleLink: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        textDecorationLine: 'none',
        color: 'inherit',
        '&:hover': {
            color: tokens.colorBrandForeground1,
        }
    }
});

const initialActivities = [
    { id: 1, agent: 'Access Agent', action: 'Revoked access for unauthorized user', time: '1m ago', type: 'security' },
    { id: 2, agent: 'Evidence Agent', action: 'Auto-mapped Q3 technical logs to CTL-04', time: '5m ago', type: 'compliancy' },
    { id: 3, agent: 'Policy Agent', action: 'Flagged non-compliant S3 bucket configuration', time: '12m ago', type: 'warning' },
    { id: 4, agent: 'Vendor Agent', action: 'Validated SOC2 Type II for Cloud Provider', time: '24m ago', type: 'success' },
];

export const AgentActivityTicker = () => {
    const styles = useStyles();
    const [activities, setActivities] = useState(initialActivities);

    // Mock live updates
    useEffect(() => {
        const interval = setInterval(() => {
            const newActivity = {
                id: Date.now(),
                agent: ['Security Agent', 'Privacy Agent', 'SOC2 Agent'][Math.floor(Math.random() * 3)],
                action: ['Verified encryption keys', 'Anonymized user data', 'Updated audit trail'][Math.floor(Math.random() * 3)],
                time: 'Just now',
                type: 'success'
            };
            setActivities(prev => [newActivity, ...prev.slice(0, 3)]);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.container}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <Link href="/agents" className={styles.titleLink}>
                    <PulseRegular style={{ color: tokens.colorBrandForeground1 }} />
                    <Text weight="bold" size={400}>Live Agent Operations</Text>
                </Link>
                <Badge appearance="tint" color="success" size="small">Live Telemetry</Badge>
            </div>

            <AnimatePresence mode="popLayout">
                {activities.map((item) => (
                    <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={styles.tickerItem}
                    >
                        <Avatar
                            name={item.agent}
                            size={28}
                            color="brand"
                            icon={<SparkleRegular />}
                        />
                        <div className={styles.activityText}>
                            <Text weight="semibold" style={{ color: tokens.colorBrandForeground1 }}>{item.agent}</Text>
                            <Text style={{ marginLeft: '4px', color: tokens.colorNeutralForeground2 }}>{item.action}</Text>
                        </div>
                        <Text className={styles.timestamp}>{item.time}</Text>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};
