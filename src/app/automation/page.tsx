'use client';

import {
    makeStyles,
    tokens,
    Card,
    CardHeader,
    Text,
    Button,
    Badge,
    TabList,
    Tab,
    Divider,
    ProgressBar,
} from '@fluentui/react-components';
import {
    SparkleRegular,
    PlayRegular,
    CheckmarkCircleRegular,
    ErrorCircleRegular,
    ClockRegular,
    TargetRegular,
    ShieldCheckmarkRegular,
    DocumentSearchRegular,
    DocumentTextRegular,
    BotRegular,
} from '@fluentui/react-icons';
import { useState } from 'react';
import { skills, recipes, automationLogs, automationJobs } from '@/data/fixtures';

import { PageHeader, QuickActionsBar } from '@/components/atoms';

const useStyles = makeStyles({
    page: {
        padding: tokens.spacingHorizontalXXL,
        maxWidth: '1400px',
    },
    content: {
        marginTop: tokens.spacingVerticalL,
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: tokens.spacingHorizontalL,
        marginBottom: tokens.spacingVerticalXXL,
    },
    skillCard: {
        cursor: 'pointer',
        '&:hover': {
            boxShadow: tokens.shadow8,
        },
    },
    skillIcon: {
        width: '48px',
        height: '48px',
        borderRadius: tokens.borderRadiusMedium,
        backgroundColor: tokens.colorBrandBackground2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: tokens.colorBrandForeground1,
    },
    skillMeta: {
        display: 'flex',
        gap: tokens.spacingHorizontalM,
        marginTop: tokens.spacingVerticalS,
    },
    recipeCard: {
        cursor: 'pointer',
    },
    recipeSteps: {
        marginTop: tokens.spacingVerticalS,
    },
    jobsSection: {
        marginBottom: tokens.spacingVerticalXXL,
    },
    jobCard: {
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacingHorizontalM,
        padding: tokens.spacingVerticalM,
        borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    },
    jobStatus: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    jobContent: {
        flex: 1,
    },
    logEntry: {
        display: 'flex',
        gap: tokens.spacingHorizontalM,
        padding: tokens.spacingVerticalM,
        borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    },
    logTime: {
        minWidth: '80px',
        color: tokens.colorNeutralForeground3,
    },
    logSkillBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: tokens.spacingHorizontalXS,
        padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalS}`,
        backgroundColor: tokens.colorBrandBackground2,
        borderRadius: tokens.borderRadiusSmall,
        color: tokens.colorBrandForeground1,
        fontSize: tokens.fontSizeBase200,
    },
    logContent: {
        flex: 1,
    },
});

const skillIcons: Record<string, React.ReactNode> = {
    'skill-risk-gen': <TargetRegular fontSize={24} />,
    'skill-control-suggest': <ShieldCheckmarkRegular fontSize={24} />,
    'skill-procedure-gen': <DocumentTextRegular fontSize={24} />,
    'skill-evidence-analyzer': <DocumentSearchRegular fontSize={24} />,
    'skill-report-draft': <DocumentTextRegular fontSize={24} />,
    'skill-completeness': <CheckmarkCircleRegular fontSize={24} />,
};

export default function AutomationPage() {
    const styles = useStyles();
    const [activeTab, setActiveTab] = useState('overview');

    const getJobStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return <CheckmarkCircleRegular color={tokens.colorPaletteGreenForeground1} fontSize={24} />;
            case 'failed': return <ErrorCircleRegular color={tokens.colorPaletteRedForeground1} fontSize={24} />;
            case 'running': return <SparkleRegular color={tokens.colorBrandForeground1} fontSize={24} />;
            default: return <ClockRegular color={tokens.colorNeutralForeground3} fontSize={24} />;
        }
    };

    const formatTime = (timestamp: string) => {
        return new Date(timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className={styles.page}>
            <PageHeader
                title="AI Automation Hub"
                description="Orchestration Layer: Deploy and monitor autonomous agents executing GRC workflows across your technical landscape."
            >
                <Button appearance="primary" icon={<PlayRegular />}>Run Automation</Button>
            </PageHeader>

            <QuickActionsBar>
                <Button size="small" appearance="subtle">Sync with HRIS</Button>
                <Button size="small" appearance="subtle">Rotate API Keys</Button>
                <Button size="small" appearance="subtle">Export Jobs Log</Button>
            </QuickActionsBar>

            <TabList selectedValue={activeTab} onTabSelect={(_, d) => setActiveTab(d.value as string)}>
                <Tab value="overview">Overview</Tab>
                <Tab value="recipes">Recipes</Tab>
                <Tab value="skills">Skills Catalog</Tab>
                <Tab value="logs">Automation Logs</Tab>
            </TabList>

            <div className={styles.content}>
                {activeTab === 'overview' && (
                    <>
                        <div className={styles.jobsSection}>
                            <Text size={500} weight="semibold" block style={{ marginBottom: tokens.spacingVerticalM }}>
                                Job Queue
                            </Text>
                            <Card>
                                {automationJobs.map(job => (
                                    <div key={job.id} className={styles.jobCard}>
                                        <div className={styles.jobStatus}>
                                            {getJobStatusIcon(job.status)}
                                        </div>
                                        <div className={styles.jobContent}>
                                            <Text weight="semibold" block>{job.title}</Text>
                                            {job.status === 'running' && (
                                                <ProgressBar value={job.progress / 100} thickness="large" style={{ marginTop: tokens.spacingVerticalXS }} />
                                            )}
                                        </div>
                                        <Badge appearance="tint" style={{ textTransform: 'capitalize' }}>{job.status}</Badge>
                                    </div>
                                ))}
                            </Card>
                        </div>

                        <Text size={500} weight="semibold" block style={{ marginBottom: tokens.spacingVerticalM }}>
                            Recent Automations
                        </Text>
                        <Card>
                            {automationLogs.slice(0, 4).map(log => (
                                <div key={log.id} className={styles.logEntry}>
                                    <Text className={styles.logTime}>{formatTime(log.timestamp)}</Text>
                                    <span className={styles.logSkillBadge}>
                                        <BotRegular fontSize={12} /> {log.skillName}
                                    </span>
                                    <div className={styles.logContent}>
                                        <Text>{log.action}</Text>
                                    </div>
                                    <Badge appearance="filled" color={log.outcome === 'accepted' ? 'success' : log.outcome === 'rejected' ? 'danger' : 'warning'}>
                                        {log.outcome}
                                    </Badge>
                                </div>
                            ))}
                        </Card>
                    </>
                )}

                {activeTab === 'recipes' && (
                    <div className={styles.grid}>
                        {recipes.map(recipe => (
                            <Card key={recipe.id} className={styles.recipeCard}>
                                <CardHeader
                                    header={<Text weight="semibold">{recipe.name}</Text>}
                                    description={<Badge appearance="outline" size="small">{recipe.category}</Badge>}
                                />
                                <Text size={200}>{recipe.description}</Text>
                                <div className={styles.recipeSteps}>
                                    <Text size={200} weight="semibold" block style={{ marginBottom: tokens.spacingVerticalXS }}>Steps:</Text>
                                    {recipe.steps.map((step, i) => (
                                        <Text key={i} size={200} block>• {step}</Text>
                                    ))}
                                </div>
                                <Divider style={{ margin: `${tokens.spacingVerticalM} 0` }} />
                                <Button appearance="primary" size="small" icon={<PlayRegular />}>Run Recipe</Button>
                            </Card>
                        ))}
                    </div>
                )}

                {activeTab === 'skills' && (
                    <div className={styles.grid}>
                        {skills.map(skill => (
                            <Card key={skill.id} className={styles.skillCard}>
                                <CardHeader
                                    image={
                                        <div className={styles.skillIcon}>
                                            {skillIcons[skill.id] || <SparkleRegular fontSize={24} />}
                                        </div>
                                    }
                                    header={<Text weight="semibold">{skill.name}</Text>}
                                    description={skill.shortDescription}
                                />
                                <Text size={200}>{skill.description}</Text>
                                <div className={styles.skillMeta}>
                                    <Badge appearance="outline">{skill.category}</Badge>
                                    <Text size={200}>Used {skill.usageCount} times</Text>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                {activeTab === 'logs' && (
                    <Card>
                        {automationLogs.map(log => (
                            <div key={log.id} className={styles.logEntry}>
                                <Text className={styles.logTime}>{formatTime(log.timestamp)}</Text>
                                <span className={styles.logSkillBadge}>
                                    <BotRegular fontSize={12} /> {log.skillName}
                                </span>
                                <div className={styles.logContent}>
                                    <Text weight="semibold" block>{log.action}</Text>
                                    <Text size={200}>{log.entityType}: {log.entityId}</Text>
                                    {log.details && <Text size={200} block style={{ color: tokens.colorNeutralForeground3 }}>{log.details}</Text>}
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <Badge appearance="filled" color={log.outcome === 'accepted' ? 'success' : log.outcome === 'rejected' ? 'danger' : 'warning'}>
                                        {log.outcome}
                                    </Badge>
                                    <Text size={200} block style={{ marginTop: tokens.spacingVerticalXXS }}>@{log.userId}</Text>
                                </div>
                            </div>
                        ))}
                    </Card>
                )}
            </div>
        </div>
    );
}
