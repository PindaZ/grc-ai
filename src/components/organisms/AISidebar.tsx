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
} from '@fluentui/react-icons';
import { useApp } from '@/context/AppContext';
import { usePathname } from 'next/navigation';

const useStyles = makeStyles({
    root: {
        height: '100%',
        display: 'flex',
    },
    drawer: {
        width: '340px',
        height: '100%',
        backgroundColor: tokens.colorNeutralBackgroundAlpha2,
        backdropFilter: 'blur(32px)',
        borderLeft: `1px solid ${tokens.colorNeutralStrokeSubtle}`,
        boxShadow: tokens.shadow16,
    },
    rail: {
        width: '56px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '24px',
        gap: '16px',
        borderLeft: `1px solid ${tokens.colorNeutralStrokeSubtle}`,
        backgroundColor: tokens.colorNeutralBackgroundAlpha,
    },
    section: {
        marginBottom: '32px',
    },
    sectionTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '20px',
        color: tokens.colorNeutralForeground4,
        fontSize: '11px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
    },
    suggestionCard: {
        marginBottom: '16px',
        width: '100%',
        backgroundColor: tokens.colorNeutralBackgroundAlpha,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStrokeSubtle),
        borderRadius: '12px',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: tokens.colorNeutralBackgroundAlpha2,
            ...shorthands.borderColor(tokens.colorBrandStroke1),
            transform: 'translateY(-2px)',
        }
    },
    acceptBtn: {
        background: 'linear-gradient(135deg, #0070AD 0%, #17ABDA 100%)',
        color: '#fff',
        fontWeight: '600',
        ...shorthands.border('none'),
        '&:hover': {
            background: 'linear-gradient(135deg, #0070AD 20%, #17ABDA 120%)',
        }
    },
    insight: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '16px',
        backgroundColor: tokens.colorNeutralBackgroundAlpha,
        borderRadius: '12px',
        marginBottom: '8px',
        borderLeft: '3px solid #fce100',
        transition: 'all 0.2s ease',
        '&:hover': {
            backgroundColor: tokens.colorNeutralBackgroundAlpha2,
        }
    },
    insightIcon: {
        color: '#fce100',
        flexShrink: 0,
        fontSize: '16px',
    },
});

const contextSuggestions: Record<string, Array<{ id: string; title: string; description: string }>> = {
    '/': [
        { id: '1', title: 'Prioritize your tasks', description: 'Review 5 overdue activities' },
        { id: '2', title: 'Generate weekly summary', description: 'Draft compliance status report' },
    ],
    '/requirements': [
        { id: '1', title: 'Generate risks', description: 'Create risk entries from requirements' },
        { id: '2', title: 'Map to framework', description: 'Auto-map to ISO 27001 controls' },
    ],
    '/risks': [
        { id: '1', title: 'Suggest controls', description: 'Find matching controls for risks' },
        { id: '2', title: 'Refine risk statements', description: 'Improve risk descriptions' },
    ],
    '/controls': [
        { id: '1', title: 'Generate procedure', description: 'Create control procedures from objectives' },
        { id: '2', title: 'Check completeness', description: 'Find evidence gaps' },
    ],
    '/evidence': [
        { id: '1', title: 'Analyze uploads', description: 'Extract fields from documents' },
        { id: '2', title: 'Match to controls', description: 'Auto-link evidence to controls' },
    ],
    '/reporting': [
        { id: '1', title: 'Draft report', description: 'Generate compliance report draft' },
        { id: '2', title: 'Summarize findings', description: 'Create executive summary' },
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
    const { aiSidebarOpen, setAiSidebarOpen } = useApp();
    const pathname = usePathname();

    const basePath = '/' + (pathname.split('/')[1] || '');
    const suggestions = contextSuggestions[basePath] || contextSuggestions['/'];
    const insights = contextInsights[basePath] || contextInsights['/'];

    return (
        <div className={styles.root}>
            {!aiSidebarOpen && (
                <div className={styles.rail}>
                    <Button
                        appearance="subtle"
                        icon={<ChevronLeftRegular />}
                        onClick={() => setAiSidebarOpen(true)}
                        aria-label="Open AI Assistant"
                    />
                    <SparkleRegular style={{ color: tokens.colorBrandForeground1 }} />
                    <Badge appearance="filled" color="brand" size="small">2</Badge>
                </div>
            )}

            <InlineDrawer
                open={aiSidebarOpen}
                position="end"
                className={styles.drawer}
                separator
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS }}>
                            <SparkleRegular style={{ color: tokens.colorBrandForeground1 }} />
                            AI Assistant
                        </div>
                    </DrawerHeaderTitle>
                </DrawerHeader>

                <DrawerBody>
                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>
                            <LightbulbRegular />
                            Suggested Actions
                        </div>
                        {suggestions.map((s) => (
                            <Card key={s.id} className={styles.suggestionCard} size="small">
                                <CardHeader
                                    header={<Text weight="semibold" style={{ color: tokens.colorNeutralForeground1 }}>{s.title}</Text>}
                                    description={<Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>{s.description}</Text>}
                                />
                                <CardFooter>
                                    <Button size="small" className={styles.acceptBtn} icon={<CheckmarkRegular />}>
                                        Accept
                                    </Button>
                                    <Button size="small" appearance="subtle" style={{ color: tokens.colorNeutralForeground3 }} icon={<DismissRegular />}>
                                        Dismiss
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    <Divider style={{ opacity: 0.1 }} />

                    <div className={styles.section} style={{ marginTop: '24px' }}>
                        <div className={styles.sectionTitle}>
                            <InfoRegular />
                            Insights
                        </div>
                        {insights.map((insight, i) => (
                            <div key={i} className={styles.insight}>
                                <InfoRegular className={styles.insightIcon} />
                                <Text size={200} style={{ color: tokens.colorNeutralForeground1 }}>{insight}</Text>
                            </div>
                        ))}
                    </div>
                </DrawerBody>
            </InlineDrawer>
        </div>
    );
}
