
'use client';

import {
    makeStyles,
    tokens,
    Text,
    Button,
    Input,
    shorthands,
    useToastController,
    Toast,
    ToastTitle,
    ToastIntent,
} from '@fluentui/react-components';
import { AgentCard } from '@/components/agent/AgentCard';
import { AgentActivityFeed } from '@/components/agent/ActivityFeed';
import {
    ArrowRightRegular,
    SparkleRegular,
    ShieldCheckmarkRegular,
    PulseRegular,
    SettingsRegular,
    InfoRegular,
    CheckmarkCircleRegular
} from '@fluentui/react-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedNumber } from '@/components/atoms/AnimatedNumber';
import { PageHeader } from '@/components/atoms';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const useStyles = makeStyles({
    container: {
        padding: tokens.spacingHorizontalXXL,
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        minHeight: '100vh',
        // Adaptive background: Light Mode (Blue-ish Tint), Dark Mode (Dark Radial)
        background: 'radial-gradient(circle at 50% -20%, rgba(0, 112, 173, 0.15) 0%, transparent 70%)',
        backgroundColor: tokens.colorNeutralBackground1, // Fallback base
    },
    heroSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        marginBottom: '16px',
    },
    heroStats: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
    },
    heroStatCard: {
        ...shorthands.padding('16px', '24px'),
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
            backgroundColor: tokens.colorNeutralBackgroundAlpha2,
            transform: 'translateY(-4px)',
            boxShadow: tokens.shadow16,
        }
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
    },
    sectionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
    }
});

const agents = [
    {
        name: 'Access Agent',
        role: 'Security Analyst',
        status: 'active' as const,
        skills: ['access-reviewer', 'provisioner', 'identity-mapper'],
        stats: { actionsToday: 12, pendingApprovals: 3, confidence: 99 },
        lastActive: '2 mins ago'
    },
    {
        name: 'Vendor Agent',
        role: 'Risk Officer',
        status: 'listening' as const,
        skills: ['audit-report-analyzer', 'doc-parser'],
        stats: { actionsToday: 4, pendingApprovals: 8, confidence: 85 },
        lastActive: '1 hr ago'
    },
    {
        name: 'Policy Agent',
        role: 'Change Manager',
        status: 'busy' as const,
        skills: ['policy-enforcer', 'event-listener', 'communicator'],
        stats: { actionsToday: 156, pendingApprovals: 1, confidence: 97 },
        lastActive: 'Now'
    },
    {
        name: 'Privacy Agent',
        role: 'DPO Assistant',
        status: 'paused' as const,
        skills: ['privacy-manager', 'identity-mapper'],
        stats: { actionsToday: 0, pendingApprovals: 0, confidence: 100 },
        lastActive: '2 days ago'
    }
];

import { useStats, useAgentActivity } from '@/hooks/useData';
import { Spinner } from '@fluentui/react-components';
import { useState } from 'react';

export default function AgentsPage() {
    const styles = useStyles();
    const router = useRouter();
    const { stats, isLoading } = useStats();
    const { mutate: mutateActivity } = useAgentActivity();
    const { dispatchToast } = useToastController('global-toaster');
    const [isExecuting, setIsExecuting] = useState(false);
    const [lastResponse, setLastResponse] = useState<string | null>(null);

    const telemetry = [
        { label: 'Agents Active', value: stats?.agentsActive || 0, icon: <PulseRegular />, color: '#10b981', path: '#' },
        { label: 'Total Actions (24h)', value: stats?.actions24h || 0, icon: <ShieldCheckmarkRegular />, color: tokens.colorBrandForeground1, path: '#' },
        { label: 'Pending Human Review', value: stats?.pendingReview || 0, icon: <ArrowRightRegular />, color: '#f59e0b', path: '/execution' },
        { label: 'System Uptime', value: stats?.systemHealth || 99.9, icon: <PulseRegular />, color: '#10b981', suffix: '%', path: '#' }
    ];

    const notify = (title: string, intent: ToastIntent = 'success') => {
        dispatchToast(
            <Toast>
                <ToastTitle>{title}</ToastTitle>
            </Toast>,
            { intent }
        );
    };

    return (
        <div className={styles.container}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <PageHeader
                    title="Agent Command Center"
                    description="Operational Transparency: Live telemetry and neural activity feed of the autonomous digital workforce."
                >
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <Input
                                placeholder="Instruct the neural engine (e.g. 'Analyze risk impact' or 'Scan logs')..."
                                style={{ minWidth: '400px' }}
                                disabled={isExecuting}
                                onKeyDown={async (e) => {
                                    if (e.key === 'Enter') {
                                        const prompt = (e.currentTarget as HTMLInputElement).value;
                                        e.currentTarget.value = '';
                                        setIsExecuting(true);
                                        setLastResponse(null);
                                        notify('Neural engine processing request...', 'info');
                                        try {
                                            const res = await fetch('/api/agent/debug-execute', {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({ prompt, agentId: 'Admin' })
                                            });
                                            const data = await res.json();
                                            if (data.error) notify(data.error, 'error');
                                            else {
                                                notify('Knowledge base updated & command executed.', 'success');
                                                setLastResponse(data.text || 'Command processed successfully, but no direct response was returned.');
                                                // Mutate activity feed to show the new event immediately
                                                mutateActivity();
                                            }
                                        } catch (err) {
                                            notify('Neural link interrupted.', 'error');
                                        } finally {
                                            setIsExecuting(false);
                                        }
                                    }
                                }}
                            />
                            {isExecuting && (
                                <div style={{ position: 'absolute', right: '10px' }}>
                                    <Spinner size="tiny" />
                                </div>
                            )}
                        </div>
                        <Button
                            icon={<SettingsRegular />}
                            appearance="subtle"
                            style={{ color: tokens.colorNeutralForeground2 }}
                            onClick={() => notify('Workforce Settings module is currently in read-only mode.')}
                        >
                            Workforce Settings
                        </Button>
                    </div>
                    <div style={{ marginTop: '8px' }}>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground4 }}>
                            <InfoRegular style={{ fontSize: '12px', marginRight: '4px', verticalAlign: 'middle' }} />
                            Use this console for complex reasoning tasks. Use the top bar for navigation.
                        </Text>
                    </div>
                </PageHeader>

                <AnimatePresence>
                    {lastResponse && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4 }}
                            style={{ marginBottom: '24px', overflow: 'hidden' }}
                        >
                            <GlassCard style={{ padding: '24px', position: 'relative', borderLeft: `4px solid ${tokens.colorBrandBackground}` }}>
                                <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                                    <Button
                                        size="small"
                                        appearance="subtle"
                                        onClick={() => setLastResponse(null)}
                                        icon={<CheckmarkCircleRegular />}
                                    >
                                        Dismiss
                                    </Button>
                                </div>
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                    <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: tokens.colorBrandBackground2 }}>
                                        <SparkleRegular style={{ fontSize: '24px', color: tokens.colorBrandForeground1 }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <Text size={400} weight="bold" style={{ color: tokens.colorBrandForeground1, marginBottom: '8px', display: 'block' }}>Neural Engine Response</Text>
                                        <Text size={200} style={{ color: tokens.colorNeutralForeground2, lineHeight: '1.6', display: 'block' }}>
                                            {lastResponse}
                                        </Text>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className={styles.heroStats}>
                    {telemetry.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                            style={{ display: 'flex' }}
                        >
                            <GlassCard
                                onClick={() => stat.path !== '#' && router.push(stat.path)}
                                className={styles.heroStatCard}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                    <div style={{ color: stat.color }}>{stat.icon}</div>
                                    <Text size={200} style={{ color: tokens.colorNeutralForeground4, fontWeight: '600', textTransform: 'uppercase' }}>{stat.label}</Text>
                                </div>
                                <Text size={800} weight="bold" style={{ color: tokens.colorNeutralForeground1 }}>
                                    {isLoading ? (
                                        <Spinner size="tiny" />
                                    ) : (
                                        <AnimatedNumber value={stat.value} duration={1.5} format={(n) => `${(stat.value % 1 !== 0) ? n.toFixed(1) : Math.round(n)}${stat.suffix || ''}`} />
                                    )}
                                </Text>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className={styles.sectionHeader}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '2px', backgroundColor: tokens.colorBrandBackground, transform: 'rotate(45deg)' }} />
                        <Text size={600} weight="bold" style={{ color: tokens.colorNeutralForeground1 }}>Priority Duty Agents</Text>
                    </div>
                    <Button appearance="subtle" icon={<ArrowRightRegular />} iconPosition="after" style={{ color: tokens.colorBrandForeground1 }}>View Full Roster</Button>
                </div>

                <div className={styles.grid}>
                    {agents.map((agent, i) => (
                        <AgentCard key={agent.name} {...agent} index={i} />
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginTop: '16px' }}>
                <GlassCard style={{ padding: '0' }}>
                    <AgentActivityFeed />
                </GlassCard>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <GlassCard style={{ padding: '24px' }}>
                        <Text size={500} weight="bold" style={{ color: tokens.colorNeutralForeground1, marginBottom: '16px', display: 'block' }}>System Health</Text>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[
                                { label: 'Neural Engine', efficiency: 98 },
                                { label: 'Skill Loader', efficiency: 100 },
                                { label: 'API Gateway', efficiency: 94 }
                            ].map(engine => (
                                <div key={engine.label}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>{engine.label}</Text>
                                        <Text size={200} style={{ color: tokens.colorNeutralForeground1, fontWeight: 'bold' }}>{engine.efficiency}%</Text>
                                    </div>
                                    <div style={{ width: '100%', height: '4px', backgroundColor: tokens.colorNeutralStrokeSubtle, borderRadius: '2px', overflow: 'hidden' }}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${engine.efficiency}%` }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            style={{ height: '100%', backgroundColor: tokens.colorBrandBackground }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>

                    <GlassCard style={{ padding: '24px', background: `linear-gradient(135deg, ${tokens.colorBrandBackground2} 0%, transparent 100%)` }}>
                        <Text size={400} weight="bold" style={{ color: tokens.colorNeutralForeground1, marginBottom: '8px', display: 'block' }}>AI Insight</Text>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground2, fontStyle: 'italic' }}>
                            "System load is nominal. Recommend activating 'Policy-Enforcer' redundancy for the upcoming deployment window at 02:00 UTC."
                        </Text>
                        <Button
                            size="small"
                            appearance="primary"
                            style={{ marginTop: '16px', width: '100%' }}
                            onClick={() => notify('Recommendation adopted. "Policy-Enforcer" redundancy scheduled.')}
                        >
                            Adopt Recommendation
                        </Button>
                    </GlassCard>
                </div>
            </div>

        </div>
    );
}
