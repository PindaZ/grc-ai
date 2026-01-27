'use client';

import {
    makeStyles,
    tokens,
    Card,
    Text,
    Button,
    Badge,
    Input,
    Table,
    TableHeader,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    ToggleButton,
    useToastController,
    Toast,
    ToastTitle,
    ToastIntent,
    shorthands,
    mergeClasses,
} from '@fluentui/react-components';
import { SearchRegular, AddRegular, FilterRegular, SparkleRegular, GridRegular, ListRegular } from '@fluentui/react-icons';
import Link from 'next/link';
import { useState, useMemo, Fragment } from 'react';
import { risks } from '@/data/fixtures';
import { GlassCard } from '@/components/ui/GlassCard';
import { StatusBadge, RiskScoreBadge, PageHeader, QuickActionsBar } from '@/components/atoms';

const useStyles = makeStyles({
    page: {
        padding: tokens.spacingHorizontalXXL,
    },
    toolbar: {
        display: 'flex',
        gap: tokens.spacingHorizontalM,
        marginBottom: tokens.spacingVerticalL,
        justifyContent: 'space-between',
    },
    searchSection: {
        display: 'flex',
        gap: tokens.spacingHorizontalM,
    },
    searchInput: {
        minWidth: '300px',
    },
    heatmapContainer: {
        marginBottom: tokens.spacingVerticalXXL,
    },
    heatmapGrid: {
        display: 'grid',
        gridTemplateColumns: 'auto repeat(5, 60px)',
        gap: '2px',
    },
    heatmapLabel: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: tokens.spacingVerticalS,
        fontSize: tokens.fontSizeBase200,
        color: tokens.colorNeutralForeground3,
    },
    heatmapCell: {
        width: '60px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: tokens.borderRadiusSmall,
        cursor: 'pointer',
        fontWeight: tokens.fontWeightSemibold,
        fontSize: tokens.fontSizeBase400,
        transition: 'all 0.2s ease',
        '&:hover': {
            transform: 'scale(1.1)',
            zIndex: 1,
            boxShadow: tokens.shadow16,
        }
    },
    selectedCell: {
        ...shorthands.outline('2px', 'solid', tokens.colorBrandStroke1),
        transform: 'scale(1.1)',
        zIndex: 1,
    },
    tableRow: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: tokens.colorNeutralBackground1Hover,
        },
    },
});

const getHeatmapColor = (impact: number, likelihood: number) => {
    const score = impact * likelihood;
    if (score >= 16) return tokens.colorPaletteRedBackground3;
    if (score >= 9) return tokens.colorPaletteYellowBackground3;
    if (score >= 4) return tokens.colorPaletteYellowBackground1;
    return tokens.colorPaletteGreenBackground1;
};

export default function RisksPage() {
    const styles = useStyles();
    const [view, setView] = useState<'list' | 'heatmap'>('list');
    const [selectedImpact, setSelectedImpact] = useState<number | null>(null);
    const [selectedLikelihood, setSelectedLikelihood] = useState<number | null>(null);
    const { dispatchToast } = useToastController('global-toaster');

    const notify = (title: string, intent: ToastIntent = 'success') => {
        dispatchToast(
            <Toast>
                <ToastTitle>{title}</ToastTitle>
            </Toast>,
            { intent }
        );
    };

    // Calculate risk count for each cell
    const getRiskCount = (impact: number, likelihood: number) => {
        return risks.filter(r => r.impact === impact && r.likelihood === likelihood).length;
    };

    const filteredRisks = useMemo(() => {
        if (selectedImpact !== null && selectedLikelihood !== null) {
            return risks.filter(r => r.impact === selectedImpact && r.likelihood === selectedLikelihood);
        }
        return risks;
    }, [selectedImpact, selectedLikelihood]);

    const handleCellClick = (impact: number, likelihood: number) => {
        if (selectedImpact === impact && selectedLikelihood === likelihood) {
            setSelectedImpact(null);
            setSelectedLikelihood(null);
            notify('Heatmap filter cleared.');
        } else {
            setSelectedImpact(impact);
            setSelectedLikelihood(likelihood);
            const count = getRiskCount(impact, likelihood);
            notify(`Filtering for ${count} risks with Impact ${impact} and Likelihood ${likelihood}.`);
            setView('list'); // Switch to list to see the filtered results
        }
    };

    return (
        <div className={styles.page}>
            <PageHeader
                title="Risk Register"
                description="Impact Assessment: Translate technical anomalies and compliance gaps into business risk and potential exposure."
            >
                <Button appearance="primary" icon={<AddRegular />} onClick={() => notify('Risk addition is currently disabled.')}>
                    Add Risk
                </Button>
            </PageHeader>

            <QuickActionsBar>
                <Button size="small" appearance="subtle" onClick={() => notify('AI suggests mapping 12 controls to open risks.')}>Suggest controls for all</Button>
                <Button size="small" appearance="subtle" onClick={() => notify('Risk re-assessment in progress...')}>Re-assess risks</Button>
                <Button size="small" appearance="subtle" onClick={() => notify('Generating aggregated risk report...')}>Generate risk report</Button>
            </QuickActionsBar>

            <div className={styles.toolbar}>
                <div className={styles.searchSection}>
                    <Input
                        className={styles.searchInput}
                        contentBefore={<SearchRegular />}
                        placeholder="Search risks..."
                    />
                    <Button appearance="subtle" icon={<FilterRegular />}>Filters</Button>
                </div>
                <div style={{ display: 'flex', gap: tokens.spacingHorizontalXS }}>
                    <ToggleButton
                        icon={<ListRegular />}
                        checked={view === 'list'}
                        onClick={() => setView('list')}
                    >
                        List
                    </ToggleButton>
                    <ToggleButton
                        icon={<GridRegular />}
                        checked={view === 'heatmap'}
                        onClick={() => setView('heatmap')}
                    >
                        Heatmap
                    </ToggleButton>
                </div>
            </div>

            {view === 'heatmap' && (
                <div className={styles.heatmapContainer}>
                    <GlassCard>
                        <Text weight="semibold" style={{ marginBottom: tokens.spacingVerticalM, display: 'block' }}>
                            Risk Heatmap (Impact x Likelihood)
                        </Text>
                        <div className={styles.heatmapGrid}>
                            <div className={styles.heatmapLabel}>Impact ↓</div>
                            {[1, 2, 3, 4, 5].map(l => (
                                <div key={l} className={styles.heatmapLabel}>{l}</div>
                            ))}
                            {[5, 4, 3, 2, 1].map(impact => (
                                <Fragment key={`row-${impact}`}>
                                    <div key={`label-${impact}`} className={styles.heatmapLabel}>{impact}</div>
                                    {[1, 2, 3, 4, 5].map(likelihood => {
                                        const count = getRiskCount(impact, likelihood);
                                        const isSelected = selectedImpact === impact && selectedLikelihood === likelihood;
                                        return (
                                            <div
                                                key={`${impact}-${likelihood}`}
                                                className={mergeClasses(
                                                    styles.heatmapCell,
                                                    isSelected && styles.selectedCell
                                                )}
                                                style={{ backgroundColor: getHeatmapColor(impact, likelihood) }}
                                                onClick={() => handleCellClick(impact, likelihood)}
                                            >
                                                {count > 0 ? count : ''}
                                            </div>
                                        );
                                    })}
                                </Fragment>
                            ))}
                        </div>
                        <Text size={200} style={{ marginTop: tokens.spacingVerticalM, color: tokens.colorNeutralForeground3 }}>
                            Likelihood →
                        </Text>
                    </GlassCard>
                </div>
            )}

            <GlassCard style={{ padding: '0 8px' }}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell style={{ color: tokens.colorNeutralForeground2, fontWeight: '700', padding: '24px 20px', letterSpacing: '2px', fontSize: '12px' }}>ID</TableHeaderCell>
                            <TableHeaderCell style={{ color: tokens.colorNeutralForeground2, fontWeight: '700', padding: '24px 20px', letterSpacing: '2px', fontSize: '12px' }}>TITLE</TableHeaderCell>
                            <TableHeaderCell style={{ color: tokens.colorNeutralForeground2, fontWeight: '700', padding: '24px 20px', letterSpacing: '2px', fontSize: '12px' }}>IMPACT</TableHeaderCell>
                            <TableHeaderCell style={{ color: tokens.colorNeutralForeground2, fontWeight: '700', padding: '24px 20px', letterSpacing: '2px', fontSize: '12px' }}>LIKELIHOOD</TableHeaderCell>
                            <TableHeaderCell style={{ color: tokens.colorNeutralForeground2, fontWeight: '700', padding: '24px 20px', letterSpacing: '2px', fontSize: '12px' }}>SCORE</TableHeaderCell>
                            <TableHeaderCell style={{ color: tokens.colorNeutralForeground2, fontWeight: '700', padding: '24px 20px', letterSpacing: '2px', fontSize: '12px' }}>STATUS</TableHeaderCell>
                            <TableHeaderCell style={{ color: tokens.colorNeutralForeground2, fontWeight: '700', padding: '24px 20px', letterSpacing: '2px', fontSize: '12px' }}>AI MONITORING</TableHeaderCell>
                            <TableHeaderCell style={{ color: tokens.colorNeutralForeground2, fontWeight: '700', padding: '24px 20px', letterSpacing: '2px', fontSize: '12px' }}>CONTROLS</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredRisks.map((risk) => (
                            <TableRow key={risk.id} className={styles.tableRow}>
                                <TableCell>
                                    <Link href={`/risks/${risk.id}`}>
                                        <Text weight="semibold" style={{ color: tokens.colorBrandForeground1 }}>
                                            {risk.id}
                                        </Text>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link href={`/risks/${risk.id}`}>{risk.title}</Link>
                                </TableCell>
                                <TableCell>{risk.impact}</TableCell>
                                <TableCell>{risk.likelihood}</TableCell>
                                <TableCell>
                                    <RiskScoreBadge impact={risk.impact} likelihood={risk.likelihood} showBreakdown />
                                </TableCell>
                                <TableCell>
                                    <StatusBadge status={risk.status} />
                                </TableCell>
                                <TableCell>
                                    <Badge appearance="tint" color="brand" icon={<SparkleRegular />}>
                                        Constant
                                    </Badge>
                                </TableCell>
                                <TableCell>{risk.linkedControlIds.length}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </GlassCard>
        </div>
    );
}
