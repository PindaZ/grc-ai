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

import { useAgentActivity } from '@/hooks/useData';
import { Spinner } from '@fluentui/react-components';

const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    return `${Math.floor(diffInSeconds / 3600)}h ago`;
};

export const AgentActivityTicker = () => {
    const styles = useStyles();
    const { activity, isLoading } = useAgentActivity();
    const tickerItems = Array.isArray(activity) ? activity.slice(0, 4) : [];

    return (
        <div className={styles.container}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <Link href="/agents" className={styles.titleLink}>
                    <PulseRegular style={{ color: tokens.colorBrandForeground1 }} />
                    <Text weight="bold" size={400}>Live Agent Operations</Text>
                </Link>
                <Badge appearance="tint" color="success" size="small">Live Telemetry</Badge>
            </div>

            {isLoading ? (
                <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Spinner size="small" />
                </div>
            ) : (
                <AnimatePresence mode="popLayout">
                    {tickerItems.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={styles.tickerItem}
                        >
                            <Avatar
                                name={item.agentName}
                                size={28}
                                color="brand"
                                icon={<SparkleRegular />}
                            />
                            <div className={styles.activityText}>
                                <Text weight="semibold" style={{ color: tokens.colorBrandForeground1 }}>{item.agentName}</Text>
                                <Text style={{ marginLeft: '4px', color: tokens.colorNeutralForeground2 }}>{item.action}</Text>
                            </div>
                            <Text className={styles.timestamp}>{formatTime(item.timestamp)}</Text>
                        </motion.div>
                    ))}
                </AnimatePresence>
            )}
        </div>
    );
};
