'use client';

import { makeStyles, tokens, Text, ProgressBar } from '@fluentui/react-components';
import { GlassCard } from '@/components/ui/GlassCard';
import { CheckmarkCircleRegular, ClockRegular, ArrowTrendingLinesRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalM,
    },
    metricRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    scoreColumn: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalXS,
        alignItems: 'center',
        padding: tokens.spacingVerticalL,
    },
    gaugeContainer: {
        position: 'relative',
        height: '80px',
        width: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gaugeValue: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: tokens.colorBrandForeground1,
    }
});

interface ControlHealthCardProps {
    automationScore: number;
    lastTested: string;
    passRate: number;
}

export const ControlHealthCard = ({ automationScore, lastTested, passRate }: ControlHealthCardProps) => {
    const styles = useStyles();

    return (
        <GlassCard>
            <div className={styles.container}>
                <div className={styles.metricRow}>
                    <div className={styles.scoreColumn}>
                        <div className={styles.gaugeContainer}>
                            <Text className={styles.gaugeValue}>{automationScore}%</Text>
                        </div>
                        <Text size={200} weight="semibold">Automation</Text>
                    </div>
                    <div className={styles.scoreColumn}>
                        <div className={styles.gaugeContainer}>
                            <Text className={styles.gaugeValue}>{passRate}%</Text>
                        </div>
                        <Text size={200} weight="semibold">Pass Rate</Text>
                    </div>
                </div>

                <div style={{ marginTop: tokens.spacingVerticalS }}>
                    <div className={styles.metricRow} style={{ marginBottom: tokens.spacingVerticalXXS }}>
                        <Text size={200} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <ClockRegular /> Last Tested
                        </Text>
                        <Text size={200} weight="semibold">{lastTested}</Text>
                    </div>
                    <div className={styles.metricRow}>
                        <Text size={200} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <ArrowTrendingLinesRegular /> Compliance Trend
                        </Text>
                        <Text size={200} style={{ color: tokens.colorPaletteGreenForeground1 }}>↑ 12%</Text>
                    </div>
                </div>
            </div>
        </GlassCard>
    );
};
