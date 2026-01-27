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
        width: '320px',
        height: '100%',
        borderLeft: `1px solid ${tokens.colorNeutralStroke1}`,
    },
    rail: {
        width: '48px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: tokens.spacingVerticalM,
        gap: tokens.spacingVerticalS,
        borderLeft: `1px solid ${tokens.colorNeutralStroke1}`,
        backgroundColor: tokens.colorNeutralBackground2,
    },
    section: {
        marginBottom: tokens.spacingVerticalL,
    },
    sectionTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacingHorizontalXS,
        marginBottom: tokens.spacingVerticalS,
        color: tokens.colorNeutralForeground3,
        fontSize: tokens.fontSizeBase200,
        fontWeight: tokens.fontWeightSemibold,
        textTransform: 'uppercase',
    },
    suggestionCard: {
        marginBottom: tokens.spacingVerticalS,
        width: '100%',
    },
    insight: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: tokens.spacingHorizontalS,
        padding: tokens.spacingVerticalS,
        backgroundColor: tokens.colorNeutralBackground1,
        borderRadius: tokens.borderRadiusMedium,
        marginBottom: tokens.spacingVerticalXS,
    },
    insightIcon: {
        color: tokens.colorPaletteYellowForeground1,
        flexShrink: 0,
        marginTop: '2px',
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
                                    header={<Text weight="semibold">{s.title}</Text>}
                                    description={<Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>{s.description}</Text>}
                                />
                                <CardFooter>
                                    <Button size="small" appearance="primary" icon={<CheckmarkRegular />}>
                                        Accept
                                    </Button>
                                    <Button size="small" appearance="subtle" icon={<DismissRegular />}>
                                        Dismiss
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    <Divider />

                    <div className={styles.section} style={{ marginTop: tokens.spacingVerticalM }}>
                        <div className={styles.sectionTitle}>
                            <InfoRegular />
                            Insights
                        </div>
                        {insights.map((insight, i) => (
                            <div key={i} className={styles.insight}>
                                <span className={styles.insightIcon}>⚠️</span>
                                <Text size={200}>{insight}</Text>
                            </div>
                        ))}
                    </div>
                </DrawerBody>
            </InlineDrawer>
        </div>
    );
}
