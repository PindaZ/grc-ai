'use client';

import { makeStyles, tokens, Card, Text, Button, Badge, ProgressBar, Tooltip } from '@fluentui/react-components';
import { PlayRegular, CalendarRegular, CheckmarkCircleRegular, SpinnerIos20Regular, ErrorCircleRegular, SettingsRegular } from '@fluentui/react-icons';
import { SkillDefinition, AutomationRun } from '@/types';

const useStyles = makeStyles({
    card: {
        padding: tokens.spacingVerticalM,
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: tokens.spacingVerticalS,
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacingHorizontalS,
    },
    actions: {
        display: 'flex',
        gap: tokens.spacingHorizontalXS,
    },
    stats: {
        display: 'flex',
        gap: tokens.spacingHorizontalL,
        marginTop: tokens.spacingVerticalS,
        marginBottom: tokens.spacingVerticalS,
    },
    statItem: {
        display: 'flex',
        flexDirection: 'column',
    },
    statValue: {
        fontSize: tokens.fontSizeBase500,
        fontWeight: tokens.fontWeightSemibold,
    },
    statLabel: {
        fontSize: tokens.fontSizeBase200,
        color: tokens.colorNeutralForeground3,
    },
    schedule: {
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacingHorizontalXS,
        color: tokens.colorNeutralForeground3,
        fontSize: tokens.fontSizeBase200,
    },
    runningIndicator: {
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacingHorizontalS,
        color: tokens.colorBrandForeground1,
    },
    '@keyframes spin': {
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
    },
    spinner: {
        animation: 'spin 1s linear infinite',
    },
});

interface AutomationStatusCardProps {
    skill: SkillDefinition;
    latestRun?: AutomationRun;
    pendingFindings: number;
    onRunNow?: () => void;
    onConfigure?: () => void;
    onViewFindings?: () => void;
}

export function AutomationStatusCard({
    skill,
    latestRun,
    pendingFindings,
    onRunNow,
    onConfigure,
    onViewFindings,
}: AutomationStatusCardProps) {
    const styles = useStyles();

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return 'Never';
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const isRunning = latestRun?.status === 'running';

    return (
        <Card className={styles.card}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <Text weight="semibold" size={400}>{skill.name}</Text>
                    <Badge color={skill.status === 'active' ? 'success' : 'subtle'} size="small">
                        {skill.status}
                    </Badge>
                </div>
                <div className={styles.actions}>
                    <Tooltip content="Run now" relationship="label">
                        <Button
                            appearance="subtle"
                            size="small"
                            icon={<PlayRegular />}
                            onClick={onRunNow}
                            disabled={isRunning}
                        />
                    </Tooltip>
                    <Tooltip content="Configure" relationship="label">
                        <Button
                            appearance="subtle"
                            size="small"
                            icon={<SettingsRegular />}
                            onClick={onConfigure}
                        />
                    </Tooltip>
                </div>
            </div>

            <Text size={200}>{skill.shortDescription}</Text>

            {isRunning ? (
                <div className={styles.runningIndicator}>
                    <SpinnerIos20Regular className={styles.spinner} />
                    <Text>Running...</Text>
                    {latestRun && <ProgressBar value={0.5} style={{ flex: 1 }} />}
                </div>
            ) : (
                <div className={styles.stats}>
                    <div className={styles.statItem}>
                        <span className={styles.statValue} style={{ color: pendingFindings > 0 ? tokens.colorPaletteRedForeground1 : tokens.colorPaletteGreenForeground1 }}>
                            {pendingFindings}
                        </span>
                        <span className={styles.statLabel}>Pending</span>
                    </div>
                    {latestRun && (
                        <>
                            <div className={styles.statItem}>
                                <span className={styles.statValue}>{latestRun.findingsCount}</span>
                                <span className={styles.statLabel}>Findings</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statValue}>{latestRun.resolvedCount}</span>
                                <span className={styles.statLabel}>Resolved</span>
                            </div>
                        </>
                    )}
                </div>
            )}

            <div className={styles.schedule}>
                <CalendarRegular fontSize={14} />
                <span>Schedule: {skill.schedule || 'Manual'}</span>
                <span>•</span>
                <span>Last run: {formatDate(skill.lastRun)}</span>
                {skill.nextRun && (
                    <>
                        <span>•</span>
                        <span>Next: {formatDate(skill.nextRun)}</span>
                    </>
                )}
            </div>

            {pendingFindings > 0 && onViewFindings && (
                <Button
                    appearance="primary"
                    size="small"
                    style={{ marginTop: tokens.spacingVerticalS }}
                    onClick={onViewFindings}
                >
                    Review {pendingFindings} findings
                </Button>
            )}
        </Card>
    );
}
