'use client';

import {
    makeStyles,
    tokens,
    Card,
    Text,
    Button,
    Badge,
    Dialog,
    DialogTrigger,
    DialogSurface,
    DialogTitle,
    DialogBody,
    DialogContent,
    DialogActions,
    Spinner,
} from '@fluentui/react-components';
import { SparkleRegular, ArrowDownloadRegular, DocumentTextRegular, ChartMultipleRegular } from '@fluentui/react-icons';
import { useState } from 'react';

const useStyles = makeStyles({
    page: {
        padding: tokens.spacingHorizontalXXL,
        maxWidth: '1400px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: tokens.spacingVerticalXXL,
    },
    title: {
        fontSize: tokens.fontSizeHero700,
        fontWeight: tokens.fontWeightSemibold,
    },
    actions: {
        display: 'flex',
        gap: tokens.spacingHorizontalS,
    },
    quickActions: {
        display: 'flex',
        gap: tokens.spacingHorizontalS,
        padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
        backgroundColor: tokens.colorNeutralBackground2,
        borderRadius: tokens.borderRadiusMedium,
        marginBottom: tokens.spacingVerticalXXL,
        alignItems: 'center',
    },
    quickActionsLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacingHorizontalXS,
        color: tokens.colorNeutralForeground3,
        fontSize: tokens.fontSizeBase200,
        marginRight: tokens.spacingHorizontalM,
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: tokens.spacingHorizontalL,
        marginBottom: tokens.spacingVerticalXXL,
    },
    metricCard: {
        padding: tokens.spacingVerticalL,
    },
    metricValue: {
        fontSize: tokens.fontSizeHero800,
        fontWeight: tokens.fontWeightBold,
        color: tokens.colorBrandForeground1,
    },
    metricLabel: {
        color: tokens.colorNeutralForeground3,
        marginTop: tokens.spacingVerticalXS,
    },
    chartPlaceholder: {
        height: '200px',
        backgroundColor: tokens.colorNeutralBackground2,
        borderRadius: tokens.borderRadiusMedium,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: tokens.spacingVerticalM,
    },
    dialogContent: {
        minWidth: '600px',
    },
    reportSection: {
        marginBottom: tokens.spacingVerticalL,
    },
    reportText: {
        lineHeight: '1.6',
    },
    loadingContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: tokens.spacingVerticalXXL,
        gap: tokens.spacingHorizontalM,
    },
});

export default function ReportingPage() {
    const styles = useStyles();
    const [isDrafting, setIsDrafting] = useState(false);
    const [showDraft, setShowDraft] = useState(false);

    const handleDraft = () => {
        setIsDrafting(true);
        setShowDraft(false);
        setTimeout(() => {
            setIsDrafting(false);
            setShowDraft(true);
        }, 2500);
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <Text className={styles.title}>Reporting & Insights</Text>
                <div className={styles.actions}>
                    <Dialog>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="primary" icon={<SparkleRegular />} onClick={handleDraft}>
                                Draft Report
                            </Button>
                        </DialogTrigger>
                        <DialogSurface className={styles.dialogContent}>
                            <DialogBody>
                                <DialogTitle>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS }}>
                                        <SparkleRegular style={{ color: tokens.colorBrandForeground1 }} />
                                        AI Report Draft
                                    </span>
                                </DialogTitle>
                                <DialogContent>
                                    {isDrafting && (
                                        <div className={styles.loadingContainer}>
                                            <Spinner />
                                            <Text>Generating compliance report...</Text>
                                        </div>
                                    )}
                                    {showDraft && (
                                        <>
                                            <div className={styles.reportSection}>
                                                <Text weight="semibold" size={500} block>Q4 2024 Compliance Report</Text>
                                            </div>
                                            <div className={styles.reportSection}>
                                                <Text weight="semibold" block>Executive Summary</Text>
                                                <Text className={styles.reportText}>
                                                    The organization maintained an 87% compliance posture during Q4 2024.
                                                    Control effectiveness improved by 5% compared to Q3. Key improvements were
                                                    made in access management and vendor security assessment areas.
                                                </Text>
                                            </div>
                                            <div className={styles.reportSection}>
                                                <Text weight="semibold" block>Key Findings</Text>
                                                <Text className={styles.reportText}>
                                                    • 4 high-priority risks identified, 3 mitigated{'\n'}
                                                    • 12 controls updated and verified{'\n'}
                                                    • Evidence coverage improved to 89%{'\n'}
                                                    • 2 audit findings remediated
                                                </Text>
                                            </div>
                                            <div className={styles.reportSection}>
                                                <Text weight="semibold" block>Recommendations</Text>
                                                <Text className={styles.reportText}>
                                                    1. Complete evidence collection for 3 remaining controls{'\n'}
                                                    2. Update data retention policy documentation{'\n'}
                                                    3. Schedule quarterly access review for Q1 2025
                                                </Text>
                                            </div>
                                        </>
                                    )}
                                </DialogContent>
                                <DialogActions>
                                    <DialogTrigger disableButtonEnhancement>
                                        <Button appearance="secondary">Cancel</Button>
                                    </DialogTrigger>
                                    {showDraft && (
                                        <>
                                            <Button appearance="subtle">Edit</Button>
                                            <Button appearance="primary" icon={<ArrowDownloadRegular />}>Export PDF</Button>
                                        </>
                                    )}
                                </DialogActions>
                            </DialogBody>
                        </DialogSurface>
                    </Dialog>
                    <Button appearance="subtle" icon={<ArrowDownloadRegular />}>Export Package</Button>
                </div>
            </div>

            <div className={styles.quickActions}>
                <span className={styles.quickActionsLabel}>
                    <SparkleRegular /> AI Actions:
                </span>
                <Button size="small" appearance="subtle">Summarize findings</Button>
                <Button size="small" appearance="subtle">Compare periods</Button>
                <Button size="small" appearance="subtle">Identify trends</Button>
            </div>

            <div className={styles.grid}>
                <Card className={styles.metricCard}>
                    <Text weight="semibold">Compliance Score</Text>
                    <Text className={styles.metricValue} block>87%</Text>
                    <Text className={styles.metricLabel} block>+5% from last quarter</Text>
                </Card>
                <Card className={styles.metricCard}>
                    <Text weight="semibold">Control Coverage</Text>
                    <Text className={styles.metricValue} block>92%</Text>
                    <Text className={styles.metricLabel} block>4 controls need attention</Text>
                </Card>
                <Card className={styles.metricCard}>
                    <Text weight="semibold">Evidence Coverage</Text>
                    <Text className={styles.metricValue} block>89%</Text>
                    <Text className={styles.metricLabel} block>3 controls missing evidence</Text>
                </Card>
                <Card className={styles.metricCard}>
                    <Text weight="semibold">Open Risks</Text>
                    <Text className={styles.metricValue} block>4</Text>
                    <Text className={styles.metricLabel} block>1 high priority</Text>
                </Card>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.spacingHorizontalL }}>
                <Card>
                    <Text weight="semibold" block>Compliance Trend</Text>
                    <div className={styles.chartPlaceholder}>
                        <ChartMultipleRegular fontSize={48} style={{ color: tokens.colorNeutralForeground3 }} />
                    </div>
                </Card>
                <Card>
                    <Text weight="semibold" block>Risk Distribution</Text>
                    <div className={styles.chartPlaceholder}>
                        <ChartMultipleRegular fontSize={48} style={{ color: tokens.colorNeutralForeground3 }} />
                    </div>
                </Card>
            </div>
        </div>
    );
}
