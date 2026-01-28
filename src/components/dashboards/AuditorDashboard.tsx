'use client';

import { makeStyles, tokens, Text, Badge, Button, Avatar, shorthands } from '@fluentui/react-components';
import {
    CalendarLtrRegular,
    ClipboardTaskRegular,
    GlobeRegular,
    CheckmarkCircleRegular,
    DismissCircleRegular,
    ClockRegular
} from '@fluentui/react-icons';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedChart } from '@/components/visuals/AnimatedChart';
import { evidence } from '@/data/fixtures';
import { allPendingFindings } from '@/data/aiFindings';
import { useControls, useRisks } from '@/hooks/useData';
import { Spinner } from '@fluentui/react-components';
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
    widgetHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    iconBox: {
        width: '42px',
        height: '42px',
        borderRadius: '12px',
        background: tokens.colorNeutralBackgroundAlpha,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: tokens.colorNeutralForeground1,
        boxShadow: tokens.shadow4,
    },
    sectionTitle: {
        fontSize: '20px',
        fontWeight: '700',
        marginBottom: '24px',
        color: tokens.colorNeutralForeground1,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
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
        padding: '16px',
        borderRadius: '12px',
        background: tokens.colorNeutralBackgroundAlpha,
        border: `1px solid ${tokens.colorNeutralStrokeSubtle}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
            background: tokens.colorNeutralBackgroundAlpha2,
            transform: 'translateX(4px)',
            ...shorthands.borderColor(tokens.colorBrandStroke1),
        },
    },
    statValue: {
        fontSize: '48px',
        fontWeight: '800',
        lineHeight: '1',
        marginBottom: '4px',
        letterSpacing: '-0.04em',
    },
    statLabel: {
        color: tokens.colorNeutralForeground3,
        fontSize: '12px',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        fontWeight: '600',
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

export const AuditorDashboard = () => {
    const styles = useStyles();
    const router = useRouter();
    const { risks, isLoading: isRisksLoading } = useRisks();
    const { controls, isLoading: isCtrlLoading } = useControls(); // In case we need it
    const isLoading = isRisksLoading || isCtrlLoading;
    const { dispatchToast } = useToastController('global-toaster');

    const notify = (title: string, intent: ToastIntent = 'success') => {
        dispatchToast(
            <Toast>
                <ToastTitle>{title}</ToastTitle>
            </Toast>,
            { intent }
        );
    };

    const handleReviewAction = (title: string, action: 'approved' | 'rejected') => {
        notify(`Evidence "${title}" has been ${action}.`);
    };

    // Data Processing
    // For now, we use external fixture for 'evidence' as we don't have an API yet,
    // but findings can come from Risks (identified/assessed status).
    const itemsToReview = evidence.filter(e => e.status === 'uploaded' || e.status === 'analyzed');
    const openFindings = risks.filter(r => r.status === 'identified' || r.status === 'assessed');

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '100px', width: '100%' }}>
                <Spinner label="Loading auditor dashboard..." />
            </div>
        );
    }

    // Mock audit schedule
    const upcomingAudits = [
        { id: 1, name: 'ISO 27001 Surveillance', date: 'Oct 15, 2024', auditor: 'BSI Group' },
        { id: 2, name: 'SOC 2 Type II Fieldwork', date: 'Nov 01, 2024', auditor: 'Big 4 Firm' },
    ];

    return (
        <motion.div
            className={styles.bentoGrid}
            variants={containerVariants}
            initial="hidden"
            animate="show"
        >
            {/* Widget 1: Pending Reviews */}
            <GlassCard variant="featured" onClick={() => router.push('/evidence')} className={styles.statWidget}>
                <div className={styles.widgetHeader}>
                    <div className={styles.iconBox} style={{ background: 'rgba(252, 225, 0, 0.15)', color: '#fce100', boxShadow: '0 0 15px rgba(252, 225, 0, 0.1)' }}>
                        <ClipboardTaskRegular fontSize={24} />
                    </div>
                    <Badge appearance="tint" color="warning">Action Needed</Badge>
                </div>
                <div>
                    <div className={styles.statValue} style={{ color: '#fce100' }}>{itemsToReview.length}</div>
                    <div className={styles.statLabel}>Items to Review</div>
                </div>
            </GlassCard>

            {/* Widget 2: Audit Schedule */}
            <GlassCard>
                <div className={styles.widgetHeader}>
                    <div className={styles.iconBox} style={{ color: '#17ABDA', background: 'rgba(23, 171, 218, 0.1)', boxShadow: '0 0 15px rgba(23, 171, 218, 0.05)' }}>
                        <CalendarLtrRegular fontSize={24} />
                    </div>
                </div>
                <div>
                    <div className={styles.statValue}>{upcomingAudits.length}</div>
                    <div className={styles.statLabel}>Upcoming Audits</div>
                </div>
                <div style={{ marginTop: '12px' }}>
                    <Text size={200} style={{ color: '#17ABDA', fontWeight: '600' }}>Next: {upcomingAudits[0]?.date}</Text>
                </div>
            </GlassCard>

            {/* Widget 3: Open Findings */}
            <GlassCard onClick={() => router.push('/risks')} className={styles.statWidget}>
                <div className={styles.widgetHeader}>
                    <div className={styles.iconBox} style={{ background: 'rgba(209, 52, 56, 0.15)', color: '#d13438', boxShadow: '0 0 15px rgba(209, 52, 56, 0.1)' }}>
                        <DismissCircleRegular fontSize={24} />
                    </div>
                </div>
                <div>
                    <div className={styles.statValue} style={{ color: '#d13438' }}>{openFindings.length}</div>
                    <div className={styles.statLabel}>Open Findings</div>
                </div>
                <AnimatedChart data={[10, 12, 15, 14, 18, 20, 22]} color="#d13438" height={60} />
            </GlassCard>

            {/* Widget 4: Regional Compliance */}
            <GlassCard>
                <div className={styles.widgetHeader}>
                    <div className={styles.iconBox} style={{ color: '#10ba80', background: 'rgba(16, 186, 128, 0.1)', boxShadow: '0 0 15px rgba(16, 186, 128, 0.05)' }}>
                        <GlobeRegular fontSize={24} />
                    </div>
                </div>
                <div>
                    <div className={styles.statValue} style={{ color: '#10ba80' }}>EU/US</div>
                    <div className={styles.statLabel}>Active Regions</div>
                </div>
            </GlassCard>

            {/* Review Queue */}
            <GlassCard className={styles.colSpan2} style={{ minHeight: '400px' }}>
                <div className={styles.sectionTitle}>
                    <ClipboardTaskRegular />
                    Evidence Review Queue
                </div>
                <div className={styles.listContainer}>
                    {itemsToReview.length === 0 ? (
                        <Text style={{ color: tokens.colorNeutralForeground3, textAlign: 'center', padding: '20px' }}>
                            Queue empty.
                        </Text>
                    ) : (
                        itemsToReview.map(item => (
                            <div key={item.id} className={styles.listItem}>
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                    <Avatar name={item.assignedTo || 'Unknown'} size={24} />
                                    <div>
                                        <Text weight="semibold" style={{ display: 'block', color: tokens.colorNeutralForeground1 }}>{item.title}</Text>
                                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>{item.fileName}</Text>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <Button size="small" className={styles.iconBox} style={{ background: 'var(--brand-blue)', width: 'auto', padding: '0 12px', height: '32px' }} icon={<CheckmarkCircleRegular />} onClick={() => handleReviewAction(item.title, 'approved')}>Approve</Button>
                                    <Button size="small" icon={<DismissCircleRegular />} onClick={() => handleReviewAction(item.title, 'rejected')}>Reject</Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </GlassCard>

            {/* Audit Timeline */}
            <GlassCard className={styles.colSpan2} style={{ minHeight: '400px' }}>
                <div className={styles.sectionTitle}>
                    <CalendarLtrRegular />
                    Audit Calendar
                </div>
                <div className={styles.listContainer}>
                    {upcomingAudits.map(audit => (
                        <div key={audit.id} className={styles.listItem}>
                            <div>
                                <Text weight="semibold" style={{ display: 'block', color: tokens.colorNeutralForeground1 }}>{audit.name}</Text>
                                <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>Auditor: {audit.auditor}</Text>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <ClockRegular color="#fce100" />
                                <Text style={{ color: '#fce100' }}>{audit.date}</Text>
                            </div>
                        </div>
                    ))}

                    <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: `1px solid ${tokens.colorNeutralStrokeSubtle}` }}>
                        <Text weight="semibold" style={{ marginBottom: '8px', display: 'block' }}>Recent Activity</Text>
                        <div className={styles.listItem} style={{ opacity: 0.7 }}>
                            <Text>SOC 2 Type I Report Issued</Text>
                            <Text size={200}>Aug 12, 2024</Text>
                        </div>
                    </div>
                </div>
            </GlassCard>
        </motion.div>
    );
};
