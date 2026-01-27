'use client';

import { makeStyles, tokens, Text, Badge, Button } from '@fluentui/react-components';
import { GlassCard } from '@/components/ui/GlassCard';
import { StatusBadge } from '@/components/atoms/Badges';
import {
    SparkleRegular,
    CheckmarkRegular,
    ArrowTrendingLinesRegular
} from '@fluentui/react-icons';

const useStyles = makeStyles({
    heroContainer: {
        marginBottom: tokens.spacingVerticalL,
    },
    heroContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    titleGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalS,
    },
    idRow: {
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacingHorizontalS,
    },
    controlId: {
        fontSize: '14px',
        fontWeight: '700',
        color: tokens.colorNeutralForeground3,
        letterSpacing: '1px',
    },
    title: {
        fontSize: '32px',
        fontWeight: '800',
        color: tokens.colorNeutralForeground1,
        // textShadow: '0 2px 10px rgba(0, 112, 173, 0.3)', // Remove shadow as it might look bad on light mode
        lineHeight: '1.2',
    },
    metricsGroup: {
        display: 'flex',
        gap: tokens.spacingHorizontalXL,
        alignItems: 'center',
        backgroundColor: tokens.colorNeutralBackgroundAlpha,
        padding: '12px 24px',
        borderRadius: tokens.borderRadiusLarge,
        border: `1px solid ${tokens.colorNeutralStrokeSubtle}`,
    },
    metric: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    metricLabel: {
        fontSize: '11px',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: tokens.colorNeutralForeground4,
    },
    metricValue: {
        fontSize: '20px',
        fontWeight: '700',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
    },
    actionGroup: {
        display: 'flex',
        gap: tokens.spacingHorizontalS,
        marginTop: tokens.spacingVerticalM,
    }
});

interface ControlHeroProps {
    id: string;
    title: string;
    status: string;
    automationScore: number;
    healthStatus: 'Healthy' | 'At Risk' | 'Failing';
}

export const ControlHero = ({ id, title, status, automationScore, healthStatus }: ControlHeroProps) => {
    const styles = useStyles();

    return (
        <div className={styles.heroContainer}>
            <GlassCard>
                <div className={styles.heroContent}>
                    <div className={styles.titleGroup}>
                        <div className={styles.idRow}>
                            <Text className={styles.controlId}>{id}</Text>
                            <StatusBadge status={status} />
                        </div>
                        <Text className={styles.title}>{title}</Text>

                        <div className={styles.actionGroup}>
                            <Button appearance="primary" icon={<SparkleRegular />}>Run AI Check</Button>
                            <Button appearance="subtle" icon={<CheckmarkRegular />}>Generate Procedure</Button>
                        </div>
                    </div>

                    <div className={styles.metricsGroup}>
                        <div className={styles.metric}>
                            <Text className={styles.metricLabel}>Automation Score</Text>
                            <div className={styles.metricValue}>
                                <span style={{ color: tokens.colorBrandForeground1 }}>{automationScore}%</span>
                            </div>
                        </div>
                        <div style={{ width: '1px', height: '32px', backgroundColor: tokens.colorNeutralStrokeSubtle }} />
                        <div className={styles.metric}>
                            <Text className={styles.metricLabel}>Control Health</Text>
                            <div className={styles.metricValue}>
                                <ArrowTrendingLinesRegular style={{ color: tokens.colorPaletteGreenForeground1 }} />
                                <span style={{ color: tokens.colorPaletteGreenForeground1 }}>{healthStatus}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
};
