'use client';

import { Fragment } from 'react';

import { makeStyles, tokens, Text, Badge, Button, Avatar } from '@fluentui/react-components';
import {
    AlertUrgentRegular,
    ArrowTrendingLinesRegular,
    ShieldDismissRegular,
    MoreHorizontalRegular,
    TargetArrowRegular
} from '@fluentui/react-icons';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedChart } from '@/components/visuals/AnimatedChart';
import { useRisks } from '@/hooks/useData';
import { Spinner } from '@fluentui/react-components';
import { Risk } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    useToastController,
    Toast,
    ToastTitle,
    ToastIntent
} from '@fluentui/react-components';

const useStyles = makeStyles({
    bentoGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'auto auto',
        gap: '24px',
        maxWidth: '1600px',
        margin: '0 auto',
        '@media (max-width: 1200px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
        },
        '@media (max-width: 768px)': {
            gridTemplateColumns: '1fr',
        },
    },
    colSpan2: {
        gridColumn: 'span 2',
        '@media (max-width: 768px)': {
            gridColumn: 'span 1',
        },
    },
    rowSpan2: {
        gridRow: 'span 2',
    },
    widgetHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: tokens.spacingVerticalL,
    },
    iconBox: {
        width: '40px',
        height: '40px',
        borderRadius: '12px',
        background: tokens.colorNeutralBackgroundAlpha,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: tokens.colorNeutralForeground1,
    },
    sectionTitle: {
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '16px',
        color: tokens.colorNeutralForeground1,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    heatmap: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gridTemplateRows: 'repeat(5, 1fr)',
        gap: '4px',
        height: '250px',
        marginTop: '16px',
        background: tokens.colorNeutralBackgroundAlpha,
        padding: '8px',
        borderRadius: '8px',
    },
    heatmapCell: {
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        color: tokens.colorNeutralForeground4,
        fontWeight: 'bold',
        transition: 'all 0.2s',
        cursor: 'pointer',
        '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            zIndex: 1,
        },
    },
    listContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    listItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px',
        borderRadius: '8px',
        background: tokens.colorNeutralBackgroundAlpha,
        border: `1px solid ${tokens.colorNeutralStrokeSubtle}`,
        transition: 'background 0.2s',
        '&:hover': {
            background: tokens.colorNeutralBackgroundAlpha2,
        },
    },
    statWidget: {
        cursor: 'pointer',
        textDecorationLine: 'none',
        color: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
            backgroundColor: tokens.colorNeutralBackgroundAlpha2,
        }
    }
});

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

export const RiskOwnerDashboard = () => {
    const styles = useStyles();
    const router = useRouter();
    const { risks, isLoading } = useRisks();
    const { dispatchToast } = useToastController('global-toaster');

    const notify = (title: string, intent: ToastIntent = 'success') => {
        dispatchToast(
            <Toast>
                <ToastTitle>{title}</ToastTitle>
            </Toast>,
            { intent }
        );
    };

    // Data Processing
    const highRisks = risks.filter(r => r.impact * r.likelihood >= 16); // High severity
    const missingMitigations = risks.filter(r => r.linkedControlIds.length === 0);
    const recentRisks = [...risks].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

    // Heatmap Logic
    const getRiskCountForCell = (impact: number, likelihood: number) => {
        return risks.filter(r => r.impact === impact && r.likelihood === likelihood).length;
    };

    const getCellColor = (impact: number, likelihood: number) => {
        const score = impact * likelihood;
        if (score >= 20) return '#d13438'; // Critical
        if (score >= 15) return '#ffaa44'; // High
        if (score >= 10) return '#fce100'; // Medium
        return '#6bb700'; // Low
    };

    // Fake trend data
    const riskTrend = [45, 42, 48, 40, 38, 35, 30, 28, 25, 22];

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '100px', width: '100%' }}>
                <Spinner label="Loading risk dashboard..." />
            </div>
        );
    }

    return (
        <motion.div
            className={styles.bentoGrid}
            variants={containerVariants}
            initial="hidden"
            animate="show"
        >
            {/* Widget 1: Total Risks */}
            <GlassCard onClick={() => router.push('/risks')} className={styles.statWidget}>
                <div className={styles.widgetHeader}>
                    <div className={styles.iconBox}><AlertUrgentRegular fontSize={24} /></div>
                </div>
                <div>
                    <Text size={600} weight="bold" style={{ color: tokens.colorNeutralForeground1, display: 'block' }}>{risks.length}</Text>
                    <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>Total Identified Risks</Text>
                </div>
                <div style={{ height: '20px' }} />
            </GlassCard>

            {/* Widget 2: Critical Risks */}
            <GlassCard variant="featured" onClick={() => router.push('/risks')} className={styles.statWidget}>
                <div className={styles.widgetHeader}>
                    <div className={styles.iconBox} style={{ background: 'rgba(209, 52, 56, 0.2)', color: '#d13438' }}>
                        <AlertUrgentRegular fontSize={24} />
                    </div>
                    <Badge appearance="tint" color="danger">Action Required</Badge>
                </div>
                <div>
                    <Text size={600} weight="bold" style={{ color: '#d13438', display: 'block' }}>{highRisks.length}</Text>
                    <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>Critical Risks ({'>'}16)</Text>
                </div>
                <AnimatedChart data={[5, 8, 6, 9, 12, 8, 6, 4]} color="#d13438" height={60} />
            </GlassCard>

            {/* Widget 3: Unmitigated Risks */}
            <GlassCard>
                <div className={styles.widgetHeader}>
                    <div className={styles.iconBox} style={{ background: 'rgba(252, 225, 0, 0.2)', color: '#fce100' }}>
                        <ShieldDismissRegular fontSize={24} />
                    </div>
                </div>
                <div>
                    <Text size={600} weight="bold" style={{ color: '#fce100', display: 'block' }}>{missingMitigations.length}</Text>
                    <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>Missing Controls</Text>
                </div>
            </GlassCard>

            {/* Widget 4: Risk Velocity */}
            <GlassCard onClick={() => router.push('/reporting')} className={styles.statWidget}>
                <div className={styles.widgetHeader}>
                    <div className={styles.iconBox}><ArrowTrendingLinesRegular fontSize={24} /></div>
                </div>
                <div>
                    <Text size={600} weight="bold" style={{ color: '#0078d4', display: 'block' }}>-12%</Text>
                    <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>Risk Exposure MoM</Text>
                </div>
                <AnimatedChart data={riskTrend} color="#0078d4" height={60} />
            </GlassCard>

            {/* Heatmap Section */}
            <GlassCard className={styles.colSpan2} style={{ minHeight: '400px' }}>
                <div className={styles.sectionTitle}>
                    <TargetArrowRegular />
                    Risk Heatmap
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px', color: tokens.colorNeutralForeground3 }}>
                    <span>High Impact</span>
                    <span>Low Impact</span>
                </div>
                <div className={styles.heatmap}>
                    {/* 5x5 Grid: Impact (y) vs Likelihood (x) */}
                    {[5, 4, 3, 2, 1].map(impact => (
                        <Fragment key={impact}>
                            {[1, 2, 3, 4, 5].map(likelihood => {
                                const count = getRiskCountForCell(impact, likelihood);
                                return (
                                    <div
                                        key={`${impact}-${likelihood}`}
                                        className={styles.heatmapCell}
                                        style={{
                                            backgroundColor: count > 0 ? getCellColor(impact, likelihood) : 'rgba(255,255,255,0.05)',
                                            opacity: count > 0 ? 1 : 0.3
                                        }}
                                        title={`Impact: ${impact}, Likelihood: ${likelihood}`}
                                        onClick={() => router.push(`/risks?impact=${impact}&likelihood=${likelihood}`)}
                                    >
                                        {count > 0 ? count : ''}
                                    </div>
                                );
                            })}
                        </Fragment>
                    ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: '8px', fontSize: '12px', color: tokens.colorNeutralForeground3 }}>
                    Likelihood (Low → High)
                </div>
            </GlassCard>

            {/* Unmitigated Risks List */}
            <GlassCard className={styles.colSpan2} style={{ minHeight: '400px' }}>
                <div className={styles.sectionTitle}>
                    <ShieldDismissRegular />
                    Missing Mitigations (Action Needed)
                    <Badge appearance="filled" color="danger" shape="circular" style={{ marginLeft: 'auto' }}>
                        {missingMitigations.length}
                    </Badge>
                </div>
                <div className={styles.listContainer}>
                    {missingMitigations.length === 0 ? (
                        <Text style={{ color: tokens.colorNeutralForeground3, textAlign: 'center', padding: '20px' }}>
                            All risks have associated controls. Good job!
                        </Text>
                    ) : (
                        missingMitigations.map(risk => (
                            <div key={risk.id} className={styles.listItem}>
                                <div>
                                    <Text weight="semibold" style={{ display: 'block', color: tokens.colorNeutralForeground1 }}>{risk.title}</Text>
                                    <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                                        Impact: {risk.impact} • Likelihood: {risk.likelihood}
                                    </Text>
                                </div>
                                <Button appearance="primary" size="small" onClick={() => notify(`Drafting control request for ${risk.title}...`)}>Add Control</Button>
                            </div>
                        ))
                    )}
                </div>
            </GlassCard>
        </motion.div>
    );
};
