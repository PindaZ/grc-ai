'use client';

import { makeStyles, tokens, Text, Badge, Button, Avatar, ProgressBar } from '@fluentui/react-components';
import {
    CheckmarkCircleRegular,
    CalendarClockRegular,
    DocumentArrowUpRegular,
    GlanceRegular,
    MoreHorizontalRegular,
    ArrowRightRegular
} from '@fluentui/react-icons';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedChart } from '@/components/visuals/AnimatedChart';
import { controlActivities, controls, evidence } from '@/data/fixtures';
import Link from 'next/link';

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
        marginBottom: tokens.spacingVerticalL,
    },
    iconBox: {
        width: '40px',
        height: '40px',
        borderRadius: '12px',
        background: 'rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
    },
    sectionTitle: {
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '16px',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
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
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.05)',
        transition: 'background 0.2s',
        '&:hover': {
            background: 'rgba(255,255,255,0.06)',
        },
    },
    progressBar: {
        marginTop: '8px',
        marginBottom: '4px',
    }
});

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

export const ControlOwnerDashboard = () => {
    const styles = useStyles();

    // Data Processing
    // In a real app, filtering by current user ID would happen here.
    // We'll show all pending items for the demo.
    const myPendingActions = controlActivities.filter(a => a.status !== 'done');
    const myControls = controls;
    const evidenceNeeded = controls.filter(c => c.linkedEvidenceIds.length === 0);
    const effectivenessScore = 87; // Mock score

    return (
        <motion.div
            className={styles.bentoGrid}
            variants={containerVariants}
            initial="hidden"
            animate="show"
        >
            {/* Widget 1: Open Actions */}
            <GlassCard variant="featured">
                <div className={styles.widgetHeader}>
                    <div className={styles.iconBox} style={{ background: 'rgba(0, 120, 212, 0.2)', color: '#0078d4' }}>
                        <CheckmarkCircleRegular fontSize={24} />
                    </div>
                    <Badge appearance="tint" color="brand">{myPendingActions.length} Pending</Badge>
                </div>
                <div>
                    <Text size={600} weight="bold" style={{ color: '#0078d4', display: 'block' }}>{myPendingActions.length}</Text>
                    <Text size={200} style={{ color: 'rgba(255,255,255,0.5)' }}>Open Control Actions</Text>
                </div>
                <div style={{ marginTop: '12px' }}>
                    <ProgressBar value={0.7} color="brand" className={styles.progressBar} />
                    <Text size={100} style={{ color: 'rgba(255,255,255,0.4)' }}>70% Completion Rate</Text>
                </div>
            </GlassCard>

            {/* Widget 2: Effectiveness Score */}
            <GlassCard>
                <div className={styles.widgetHeader}>
                    <div className={styles.iconBox} style={{ background: 'rgba(16, 186, 128, 0.2)', color: '#10ba80' }}>
                        <GlanceRegular fontSize={24} />
                    </div>
                </div>
                <div>
                    <Text size={600} weight="bold" style={{ color: '#10ba80', display: 'block' }}>{effectivenessScore}%</Text>
                    <Text size={200} style={{ color: 'rgba(255,255,255,0.5)' }}>Control Effectiveness</Text>
                </div>
                <AnimatedChart data={[80, 82, 81, 85, 84, 86, 87, 87]} color="#10ba80" height={60} />
            </GlassCard>

            {/* Widget 3: Evidence Gaps */}
            <GlassCard>
                <div className={styles.widgetHeader}>
                    <div className={styles.iconBox} style={{ background: 'rgba(209, 52, 56, 0.2)', color: '#d13438' }}>
                        <DocumentArrowUpRegular fontSize={24} />
                    </div>
                </div>
                <div>
                    <Text size={600} weight="bold" style={{ color: '#d13438', display: 'block' }}>{evidenceNeeded.length}</Text>
                    <Text size={200} style={{ color: 'rgba(255,255,255,0.5)' }}>Evidence Missing</Text>
                </div>
            </GlassCard>

            {/* Widget 4: Upcoming Deadlines */}
            <GlassCard>
                <div className={styles.widgetHeader}>
                    <div className={styles.iconBox}><CalendarClockRegular fontSize={24} /></div>
                </div>
                <div>
                    <Text size={600} weight="bold" style={{ color: '#fff', display: 'block' }}>3</Text>
                    <Text size={200} style={{ color: 'rgba(255,255,255,0.5)' }}>Due This Week</Text>
                </div>
                <AnimatedChart data={[2, 3, 5, 2, 4, 3, 3]} color="#ffffff" height={60} />
            </GlassCard>

            {/* My Actions List */}
            <GlassCard className={styles.colSpan2} style={{ minHeight: '400px' }}>
                <div className={styles.sectionTitle}>
                    <CheckmarkCircleRegular />
                    My Action Items
                </div>
                <div className={styles.listContainer}>
                    {myPendingActions.slice(0, 5).map(action => (
                        <div key={action.id} className={styles.listItem}>
                            <div>
                                <Text weight="semibold" style={{ display: 'block', color: '#fff' }}>{action.title}</Text>
                                <Text size={200} style={{ color: 'rgba(255,255,255,0.5)' }}>
                                    Due: {new Date(action.dueDate).toLocaleDateString()}
                                </Text>
                            </div>
                            <Button appearance="primary" size="small" icon={<ArrowRightRegular />}>Execute</Button>
                        </div>
                    ))}
                    {myPendingActions.length === 0 && (
                        <Text style={{ color: 'rgba(255,255,255,0.5)', padding: '20px', textAlign: 'center' }}>
                            No pending actions. You're all caught up!
                        </Text>
                    )}
                </div>
            </GlassCard>

            {/* Evidence Requirements */}
            <GlassCard className={styles.colSpan2} style={{ minHeight: '400px' }}>
                <div className={styles.sectionTitle}>
                    <DocumentArrowUpRegular />
                    Required Evidence Uploads
                </div>
                <div className={styles.listContainer}>
                    {evidenceNeeded.slice(0, 5).map(control => (
                        <div key={control.id} className={styles.listItem}>
                            <div style={{ flex: 1 }}>
                                <Text weight="semibold" style={{ display: 'block', color: '#fff' }}>{control.title}</Text>
                                <Text size={200} style={{ color: 'rgba(255,255,255,0.5)' }}>
                                    {control.id}
                                </Text>
                            </div>
                            <Button size="small" icon={<DocumentArrowUpRegular />}>Upload</Button>
                        </div>
                    ))}
                </div>
            </GlassCard>
        </motion.div>
    );
};
