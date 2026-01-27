'use client';

import { makeStyles, tokens, Text, Badge, Button, Avatar } from '@fluentui/react-components';
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

    // Data Processing
    const itemsToReview = evidence.filter(e => e.status === 'uploaded' || e.status === 'analyzed');
    const openFindings = allPendingFindings.filter(f => f.status === 'pending');

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
            <GlassCard variant="featured">
                <div className={styles.widgetHeader}>
                    <div className={styles.iconBox} style={{ background: 'rgba(252, 225, 0, 0.2)', color: '#fce100' }}>
                        <ClipboardTaskRegular fontSize={24} />
                    </div>
                    <Badge appearance="tint" color="warning">Action Needed</Badge>
                </div>
                <div>
                    <Text size={600} weight="bold" style={{ color: '#fce100', display: 'block' }}>{itemsToReview.length}</Text>
                    <Text size={200} style={{ color: 'rgba(255,255,255,0.5)' }}>Items to Review</Text>
                </div>
            </GlassCard>

            {/* Widget 2: Audit Schedule */}
            <GlassCard>
                <div className={styles.widgetHeader}>
                    <div className={styles.iconBox}><CalendarLtrRegular fontSize={24} /></div>
                </div>
                <div>
                    <Text size={600} weight="bold" style={{ color: '#fff', display: 'block' }}>{upcomingAudits.length}</Text>
                    <Text size={200} style={{ color: 'rgba(255,255,255,0.5)' }}>Upcoming Audits</Text>
                </div>
                <div style={{ marginTop: '8px' }}>
                    <Text size={200} style={{ color: '#0078d4' }}>Next: {upcomingAudits[0]?.date}</Text>
                </div>
            </GlassCard>

            {/* Widget 3: Open Findings */}
            <GlassCard>
                <div className={styles.widgetHeader}>
                    <div className={styles.iconBox} style={{ background: 'rgba(209, 52, 56, 0.2)', color: '#d13438' }}>
                        <DismissCircleRegular fontSize={24} />
                    </div>
                </div>
                <div>
                    <Text size={600} weight="bold" style={{ color: '#d13438', display: 'block' }}>{openFindings.length}</Text>
                    <Text size={200} style={{ color: 'rgba(255,255,255,0.5)' }}>Open Findings</Text>
                </div>
                <AnimatedChart data={[10, 12, 15, 14, 18, 20, 22]} color="#d13438" height={60} />
            </GlassCard>

            {/* Widget 4: Regional Compliance */}
            <GlassCard>
                <div className={styles.widgetHeader}>
                    <div className={styles.iconBox}><GlobeRegular fontSize={24} /></div>
                </div>
                <div>
                    <Text size={600} weight="bold" style={{ color: '#10ba80', display: 'block' }}>EU/US</Text>
                    <Text size={200} style={{ color: 'rgba(255,255,255,0.5)' }}>Active Regions</Text>
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
                        <Text style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '20px' }}>
                            Queue empty.
                        </Text>
                    ) : (
                        itemsToReview.map(item => (
                            <div key={item.id} className={styles.listItem}>
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                    <Avatar name={item.assignedTo || 'Unknown'} size={24} />
                                    <div>
                                        <Text weight="semibold" style={{ display: 'block', color: '#fff' }}>{item.title}</Text>
                                        <Text size={200} style={{ color: 'rgba(255,255,255,0.5)' }}>{item.fileName}</Text>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <Button size="small" appearance="primary" icon={<CheckmarkCircleRegular />}>Approve</Button>
                                    <Button size="small" icon={<DismissCircleRegular />}>Reject</Button>
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
                                <Text weight="semibold" style={{ display: 'block', color: '#fff' }}>{audit.name}</Text>
                                <Text size={200} style={{ color: 'rgba(255,255,255,0.5)' }}>Auditor: {audit.auditor}</Text>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <ClockRegular color="#fce100" />
                                <Text style={{ color: '#fce100' }}>{audit.date}</Text>
                            </div>
                        </div>
                    ))}

                    <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
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
