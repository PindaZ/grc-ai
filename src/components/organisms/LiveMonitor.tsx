'use client';

import { makeStyles, tokens, Text, ProgressBar, Badge } from '@fluentui/react-components';
import { useAgentStore } from '@/store/useAgentStore';
import { motion, AnimatePresence } from 'framer-motion';
import { SparkleRegular, BotRegular, CheckmarkCircleRegular, InfoRegular } from '@fluentui/react-icons';
import { useMemo } from 'react';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
    },
    pulseHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
        backgroundColor: tokens.colorBrandBackground2,
        borderRadius: '12px',
        border: `1px solid ${tokens.colorBrandStroke2}`,
    },
    stream: {
        maxHeight: '300px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    logEntry: {
        display: 'flex',
        gap: '12px',
        padding: '12px',
        backgroundColor: tokens.colorNeutralBackgroundAlpha,
        borderRadius: '8px',
        border: `1px solid ${tokens.colorNeutralStrokeSubtle}`,
    }
});

interface LiveMonitorProps {
    controlId: string;
}

export function LiveMonitor({ controlId }: LiveMonitorProps) {
    const styles = useStyles();
    const allEvents = useAgentStore(state => state.events);
    const events = useMemo(() => allEvents.filter(e => e.controlId === controlId), [allEvents, controlId]);

    return (
        <div className={styles.container}>
            <div className={styles.pulseHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <motion.div
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10ba80', boxShadow: '0 0 10px #10ba80' }}
                    />
                    <div>
                        <Text weight="bold" block>Autonomous Monitoring Active</Text>
                        <Text size={200} style={{ opacity: 0.8 }}>AccessBot is watching Azure AD & Workday</Text>
                    </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <Text size={200} block weight="semibold">Next Check in 42s</Text>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                        <SparkleRegular style={{ fontSize: '12px' }} />
                        <Text size={100}>Confidence 98%</Text>
                    </div>
                </div>
            </div>

            <div style={{ padding: '0 8px' }}>
                <Text weight="bold" size={400} block style={{ marginBottom: '16px' }}>Real-time Reasoning Stream</Text>
                <div className={styles.stream}>
                    <AnimatePresence initial={false}>
                        {events.length > 0 ? events.map((event) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={styles.logEntry}
                            >
                                <BotRegular style={{ color: tokens.colorBrandForeground1 }} />
                                <div style={{ flex: 1 }}>
                                    <Text size={200} block style={{ opacity: 0.6 }}>{new Date(event.timestamp).toLocaleTimeString()}</Text>
                                    <Text size={200} weight="semibold" block>{event.message}</Text>
                                </div>
                            </motion.div>
                        )) : (
                            <div style={{ padding: '24px', textAlign: 'center', opacity: 0.5 }}>
                                <InfoRegular fontSize={32} />
                                <Text block style={{ marginTop: '8px' }}>Waiting for agent events...</Text>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div style={{ padding: '16px', backgroundColor: tokens.colorNeutralBackground2, borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <Text size={200} weight="semibold">Continuity of Monitoring</Text>
                    <Text size={200}>99.9% Up</Text>
                </div>
                <ProgressBar value={0.999} color="success" thickness="large" />
            </div>
        </div>
    );
}
