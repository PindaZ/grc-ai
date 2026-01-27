
'use client';

import {
    makeStyles,
    tokens,
    Text,
    Badge,
    Button,
    Avatar,
    shorthands
} from '@fluentui/react-components';
import {
    BotRegular,
    BrainCircuitRegular,
    PlayRegular,
    InfoRegular
} from '@fluentui/react-icons';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedNumber } from '@/components/atoms/AnimatedNumber';

const useStyles = makeStyles({
    cardWrapper: {
        height: '100%',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
            transform: 'translateY(-4px)',
        },
    },
    card: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        ...shorthands.padding('24px'),
    },
    statusOrb: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        marginRight: '8px',
        position: 'relative',
        '&::after': {
            content: '""',
            position: 'absolute',
            top: '-4px',
            left: '-4px',
            right: '-4px',
            bottom: '-4px',
            borderRadius: '50%',
            animation: 'pulse-ring 2s infinite',
        }
    },
    activeOrb: {
        backgroundColor: '#10b981',
        '&::after': { border: '2px solid rgba(16, 185, 129, 0.4)' }
    },
    listeningOrb: {
        backgroundColor: '#3b82f6',
        '&::after': { border: '2px solid rgba(59, 130, 246, 0.4)' }
    },
    busyOrb: {
        backgroundColor: '#f59e0b',
        '&::after': { border: '2px solid rgba(245, 158, 11, 0.4)' }
    },
    pausedOrb: {
        backgroundColor: '#6b7280',
        '&::after': { border: '2px solid rgba(107, 114, 128, 0.4)' }
    },
    skillsList: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
        marginTop: '16px',
    },
    skillPill: {
        fontSize: '10px',
        backgroundColor: tokens.colorNeutralBackgroundAlpha,
        color: tokens.colorNeutralForeground4,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStrokeSubtle),
        ...shorthands.borderRadius('4px'),
        padding: '2px 8px',
    },
    statsContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        marginTop: '24px',
        paddingTop: '16px',
        borderTop: `1px solid ${tokens.colorNeutralStrokeSubtle}`,
    },
    statValue: {
        fontSize: '20px',
        fontWeight: '700',
        color: tokens.colorNeutralForeground1,
        display: 'block',
    },
    statLabel: {
        fontSize: '11px',
        color: tokens.colorNeutralForeground4,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    }
});

interface AgentCardProps {
    name: string;
    role: string;
    status: 'active' | 'listening' | 'busy' | 'paused';
    skills: string[];
    stats: {
        actionsToday: number;
        pendingApprovals: number;
        confidence: number;
    };
    lastActive: string;
    index: number;
}

export const AgentCard = ({ name, role, status, skills, stats, lastActive, index }: AgentCardProps) => {
    const styles = useStyles();

    const getOrbClass = () => {
        switch (status) {
            case 'active': return styles.activeOrb;
            case 'listening': return styles.listeningOrb;
            case 'busy': return styles.busyOrb;
            default: return styles.pausedOrb;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
            className={styles.cardWrapper}
        >
            <GlassCard>
                <div className={styles.card}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <div style={{ position: 'relative' }}>
                                <Avatar
                                    icon={<BotRegular />}
                                    color="brand"
                                    size={56}
                                    style={{ background: `linear-gradient(135deg, ${tokens.colorBrandBackground} 0%, ${tokens.colorBrandBackground2} 100%)` }}
                                />
                                <motion.div
                                    className={`${styles.statusOrb} ${getOrbClass()}`}
                                    style={{ position: 'absolute', bottom: '2px', right: '2px' }}
                                />
                            </div>
                            <div>
                                <Text weight="bold" style={{ color: tokens.colorNeutralForeground1, fontSize: '18px', display: 'block' }}>{name}</Text>
                                <Text style={{ color: tokens.colorNeutralForeground3, fontSize: '12px' }}>{role}</Text>
                            </div>
                        </div>
                        <Badge appearance="tint" color={status === 'active' ? 'success' : 'brand'} shape="rounded">
                            {status.toUpperCase()}
                        </Badge>
                    </div>

                    <div className={styles.skillsList}>
                        {skills.map(skill => (
                            <span key={skill} className={styles.skillPill}>
                                {skill.replace(/-/g, ' ')}
                            </span>
                        ))}
                    </div>

                    <div className={styles.statsContainer}>
                        <div>
                            <Text className={styles.statValue}>
                                <AnimatedNumber value={stats.actionsToday} />
                            </Text>
                            <Text className={styles.statLabel}>Actions</Text>
                        </div>
                        <div>
                            <Text className={styles.statValue}>
                                <AnimatedNumber value={stats.pendingApprovals} />
                            </Text>
                            <Text className={styles.statLabel}>Pending</Text>
                        </div>
                        <div>
                            <Text className={styles.statValue}>
                                <AnimatedNumber value={stats.confidence} format={(n) => `${Math.round(n)}%`} />
                            </Text>
                            <Text className={styles.statLabel}>Confidence</Text>
                        </div>
                    </div>

                    <div style={{ marginTop: 'auto', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: tokens.colorBrandBackground }} />
                            <Text style={{ color: tokens.colorNeutralForeground4, fontSize: '11px' }}>Active {lastActive}</Text>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <Button size="small" appearance="subtle" icon={<InfoRegular />} style={{ color: tokens.colorNeutralForeground3 }} />
                            <Button size="small" appearance="primary" icon={<PlayRegular />} style={{ minWidth: 'auto', padding: '0 8px' }}>Log</Button>
                        </div>
                    </div>
                </div>
            </GlassCard>

            <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.33); opacity: 0.8; }
          80%, 100% { opacity: 0; transform: scale(1.5); }
        }
      `}</style>
        </motion.div>
    );
};
