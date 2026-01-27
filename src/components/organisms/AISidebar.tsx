'use client';

import {
    makeStyles,
    tokens,
    Button,
    Text,
    Divider,
    Card,
    CardHeader,
    CardFooter,
    InlineDrawer,
    DrawerHeader,
    DrawerHeaderTitle,
    DrawerBody,
    Badge,
    shorthands,
} from '@fluentui/react-components';
import {
    SparkleRegular,
    ChevronLeftRegular,
    DismissRegular,
    CheckmarkRegular,
    LightbulbRegular,
    InfoRegular,
    TargetRegular,
    FlashRegular,
} from '@fluentui/react-icons';
import { useApp } from '@/context/AppContext';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const useStyles = makeStyles({
    root: {
        height: '100%',
        display: 'flex',
    },
    drawer: {
        width: '320px', // Slightly narrower to be less prominent
        height: '100%',
        backgroundColor: tokens.colorNeutralBackgroundAlpha2, // Adaptive glass background
        backdropFilter: 'blur(32px)',
        borderLeft: `1px solid ${tokens.colorNeutralStrokeSubtle}`,
        boxShadow: tokens.shadow16,
    },
    rail: {
        width: '64px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '24px',
        gap: '20px',
        borderLeft: `1px solid ${tokens.colorNeutralStrokeSubtle}`,
        backgroundColor: tokens.colorNeutralBackgroundAlpha,
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: tokens.colorNeutralBackgroundAlpha2,
        }
    },
    railGlow: {
        position: 'relative',
        // Removed glow as per user feedback to make AI less prominent
    },
    intentCard: {
        padding: '20px',
        background: `linear-gradient(135deg, ${tokens.colorBrandBackground2} 0%, rgba(0, 112, 173, 0.05) 100%)`,
        borderRadius: '16px',
        marginBottom: '32px',
        ...shorthands.border('1px', 'solid', tokens.colorBrandStroke2),
        position: 'relative',
        overflow: 'hidden',
    },
    intentGlow: {
        position: 'absolute',
        top: '-10%',
        right: '-10%',
        width: '100px',
        height: '100px',
        background: tokens.colorBrandBackground,
        filter: 'blur(40px)',
        opacity: 0.2,
    },
    sectionTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '20px',
        color: tokens.colorNeutralForeground2,
        fontSize: '11px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '2px',
    },
    suggestionCard: {
        marginBottom: '20px',
        width: '100%',
        backgroundColor: tokens.colorNeutralBackgroundAlpha,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStrokeSubtle),
        borderRadius: '16px',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
            backgroundColor: tokens.colorNeutralBackgroundAlpha2,
            ...shorthands.borderColor(tokens.colorBrandStroke1),
            transform: 'translateX(-4px)',
            boxShadow: tokens.shadow16,
        }
    },
    impactBadge: {
        fontSize: '10px',
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        backgroundColor: tokens.colorBrandBackgroundInverted,
        color: tokens.colorBrandForegroundInverted,
        padding: '2px 8px',
        borderRadius: '4px',
    },
    acceptBtn: {
        background: 'linear-gradient(135deg, #0070AD 0%, #17ABDA 100%)',
        color: '#fff',
        fontWeight: '700',
        ...shorthands.border('none'),
        boxShadow: '0 4px 12px rgba(0, 112, 173, 0.3)',
        transition: 'all 0.2s ease',
        '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0 6px 16px rgba(0, 112, 173, 0.5)',
        }
    },
    insight: {
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '16px',
        backgroundColor: tokens.colorNeutralBackgroundAlpha,
        borderRadius: '14px',
        marginBottom: '10px',
        ...shorthands.borderLeft('4px', 'solid', '#fce100'),
        transition: 'all 0.2s ease',
        cursor: 'default',
        '&:hover': {
            backgroundColor: tokens.colorNeutralBackgroundAlpha2,
            transform: 'scale(1.02)',
        }
    },
    insightIcon: {
        color: '#fce100',
        fontSize: '18px',
        filter: 'drop-shadow(0 0 5px rgba(252, 225, 0, 0.4))',
    },
});

const contextMeta: Record<string, { intent: string; focus: string }> = {
    '/': { intent: 'Daily Operations Guard', focus: 'Prioritizing critical tasks and bubbling up anomalies from the last 24 hours.' },
    '/requirements': { intent: 'Regulatory Intelligence', focus: 'Analyzing legislative text to ensure full coverage of your compliance framework.' },
    '/risks': { intent: 'Threat Modeler', focus: 'Calculating exposure scores and recommending defensive strategies for identified vulnerabilities.' },
    '/controls': { intent: 'Control Architect', focus: 'Designing evidence-backed safeguards and identifying verification gaps.' },
    '/evidence': { intent: 'Automated Evidence Auditor', focus: 'Cryptographically verifying proofs and auto-mapping them to control procedures.' },
    '/reporting': { intent: 'Executive Insights Engine', focus: 'Translating complex compliance telemetry into high-level business readiness scores.' },
};

const contextSuggestions: Record<string, Array<{ id: string; title: string; description: string; impact: string }>> = {
    '/': [
        { id: '1', title: 'Prioritize tasks', description: 'Review 5 overdue activities', impact: 'Save 45m' },
        { id: '2', title: 'Weekly Summary', description: 'Draft compliance status report', impact: 'Ready to Send' },
    ],
    '/requirements': [
        { id: '1', title: 'Generate Risks', description: 'Create entries from requirements', impact: 'High Speed' },
        { id: '2', title: 'Map Framework', description: 'Auto-map to ISO 27001', impact: '98% Accuracy' },
    ],
    '/risks': [
        { id: '1', title: 'Suggest Controls', description: 'Find matching controls for risks', impact: 'Reduce Exposure' },
        { id: '2', title: 'Refine Statements', description: 'Improve risk descriptions', impact: 'Better Clarity' },
    ],
    '/controls': [
        { id: '1', title: 'Generate Procedure', description: 'Create procedures from objectives', impact: 'Instant Proof' },
        { id: '2', title: 'Check Completeness', description: 'Find evidence gaps', impact: 'Audit Ready' },
    ],
    '/evidence': [
        { id: '1', title: 'Analyze Uploads', description: 'Extract fields from documents', impact: '3x Faster' },
        { id: '2', title: 'Match Controls', description: 'Auto-link to control framework', impact: 'No Manual Work' },
    ],
    '/reporting': [
        { id: '1', title: 'Draft Report', description: 'Generate compliance report draft', impact: 'Board Ready' },
        { id: '2', title: 'Summarize Findings', description: 'Create executive summary', impact: 'High Clarity' },
    ],
};

const contextInsights: Record<string, string[]> = {
    '/': ['5 activities are overdue', '3 controls need evidence review'],
    '/requirements': ['2 requirements have no linked risks'],
    '/risks': ['1 high-risk item needs controls'],
    '/controls': ['3 controls missing evidence'],
    '/evidence': ['4 documents pending analysis'],
    '/reporting': ['Q1 report draft available'],
};

export function AISidebar() {
    const styles = useStyles();
    const { aiSidebarOpen, setAiSidebarOpen, currentClient } = useApp();
    const pathname = usePathname();

    const basePath = '/' + (pathname.split('/')[1] || '');
    const suggestions = contextSuggestions[basePath] || contextSuggestions['/'];
    const insights = contextInsights[basePath] || contextInsights['/'];
    const meta = contextMeta[basePath] || contextMeta['/'];

    return (
        <div className={styles.root}>
            {!aiSidebarOpen && (
                <motion.div
                    initial={{ x: 60 }}
                    animate={{ x: 0 }}
                    className={styles.rail}
                >
                    <Button
                        appearance="subtle"
                        icon={<ChevronLeftRegular />}
                        onClick={() => setAiSidebarOpen(true)}
                        aria-label="Open AI Assistant"
                    />
                    <div className={styles.railGlow}>
                        <SparkleRegular style={{ color: tokens.colorBrandForeground1, fontSize: '20px' }} />
                    </div>
                    <Badge appearance="filled" color="brand" size="small" shape="circular">2</Badge>
                </motion.div>
            )}

            <InlineDrawer
                open={aiSidebarOpen}
                position="end"
                className={styles.drawer}
            >
                <DrawerHeader>
                    <DrawerHeaderTitle
                        action={
                            <Button
                                appearance="subtle"
                                aria-label="Close"
                                icon={<DismissRegular />}
                                onClick={() => setAiSidebarOpen(false)}
                            />
                        }
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <SparkleRegular style={{ color: tokens.colorBrandForeground1, fontSize: '24px' }} />
                            <Text size={500} weight="bold" style={{ color: tokens.colorNeutralForeground1, letterSpacing: '-0.01em' }}>Neural Assistant</Text>
                        </div>
                    </DrawerHeaderTitle>
                </DrawerHeader>

                <DrawerBody>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={styles.intentCard}
                    >
                        <div className={styles.intentGlow} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <TargetRegular style={{ color: tokens.colorBrandForeground1, fontSize: '14px' }} />
                            <Text size={200} weight="bold" style={{ color: tokens.colorBrandForeground1, textTransform: 'uppercase', letterSpacing: '1px' }}>
                                {meta.intent}
                            </Text>
                        </div>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground2, lineHeight: '1.5', display: 'block' }}>
                            {meta.focus}
                        </Text>
                    </motion.div>

                    <div style={{ marginBottom: '32px' }}>
                        <div className={styles.sectionTitle}>
                            <FlashRegular style={{ color: tokens.colorBrandForeground1 }} />
                            Smart Actions
                        </div>
                        <AnimatePresence mode="popLayout">
                            {suggestions.map((s, i) => (
                                <motion.div
                                    key={s.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Card className={styles.suggestionCard} size="small">
                                        <CardHeader
                                            header={
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                                                    <Text weight="bold" style={{ color: tokens.colorNeutralForeground1, fontSize: '15px' }}>{s.title}</Text>
                                                    <span className={styles.impactBadge}>{s.impact}</span>
                                                </div>
                                            }
                                            description={<Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>{s.description}</Text>}
                                        />
                                        <CardFooter style={{ marginTop: '8px' }}>
                                            <Button size="small" className={styles.acceptBtn} icon={<CheckmarkRegular />}>
                                                Apply
                                            </Button>
                                            <Button size="small" appearance="subtle" style={{ color: tokens.colorNeutralForeground3 }}>
                                                Ignore
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <div>
                        <div className={styles.sectionTitle}>
                            <InfoRegular style={{ color: '#fce100' }} />
                            Active Telemetry
                        </div>
                        {insights.map((insight, i) => (
                            <motion.div
                                key={i}
                                className={styles.insight}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 + (i * 0.1) }}
                            >
                                <InfoRegular className={styles.insightIcon} />
                                <Text size={200} weight="semibold" style={{ color: tokens.colorNeutralForeground1 }}>{insight}</Text>
                            </motion.div>
                        ))}
                    </div>

                    <div style={{ marginTop: 'auto', paddingTop: '40px', textAlign: 'center' }}>
                        <Text size={100} style={{ color: tokens.colorNeutralForeground4, fontStyle: 'italic' }}>
                            Securing {currentClient.name} environment
                        </Text>
                    </div>
                </DrawerBody>
            </InlineDrawer>
        </div>
    );
}
