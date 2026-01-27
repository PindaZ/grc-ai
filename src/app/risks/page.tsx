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
} from '@fluentui/react-components';
import { SearchRegular, AddRegular, FilterRegular, SparkleRegular, GridRegular, ListRegular } from '@fluentui/react-icons';
import Link from 'next/link';
import { useState } from 'react';
import { risks } from '@/data/fixtures';
import { GlassCard } from '@/components/ui/GlassCard';
import { StatusBadge, RiskScoreBadge } from '@/components/atoms/Badges';

const useStyles = makeStyles({
    page: {
        padding: tokens.spacingHorizontalXXL,
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: tokens.spacingVerticalXXL,
    },
    title: {
        fontSize: '36px',
        fontWeight: '800',
        color: tokens.colorNeutralForeground1,
        // textShadow: '0 2px 10px rgba(0, 112, 173, 0.3)',
    },
    quickActions: {
        display: 'flex',
        gap: tokens.spacingHorizontalS,
        padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
        backgroundColor: tokens.colorNeutralBackground2,
        borderRadius: tokens.borderRadiusMedium,
        marginBottom: tokens.spacingVerticalL,
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
        padding: tokens.spacingVerticalXS,
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

    // Calculate risk count for each cell
    const getRiskCount = (impact: number, likelihood: number) => {
        return risks.filter(r => r.impact === impact && r.likelihood === likelihood).length;
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <Text className={styles.title}>Risk Register</Text>
                <Button appearance="primary" icon={<AddRegular />}>
                    Add Risk
                </Button>
            </div>

            <div className={styles.quickActions}>
                <span className={styles.quickActionsLabel}>
                    <SparkleRegular /> AI Actions:
                </span>
                <Button size="small" appearance="subtle">Suggest controls for all</Button>
                <Button size="small" appearance="subtle">Re-assess risks</Button>
                <Button size="small" appearance="subtle">Generate risk report</Button>
            </div>

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
                    <Card>
                        <Text weight="semibold" style={{ marginBottom: tokens.spacingVerticalM, display: 'block' }}>
                            Risk Heatmap (Impact x Likelihood)
                        </Text>
                        <div className={styles.heatmapGrid}>
                            <div className={styles.heatmapLabel}>Impact ↓</div>
                            {[1, 2, 3, 4, 5].map(l => (
                                <div key={l} className={styles.heatmapLabel}>{l}</div>
                            ))}
                            {[5, 4, 3, 2, 1].map(impact => (
                                <>
                                    <div key={`label-${impact}`} className={styles.heatmapLabel}>{impact}</div>
                                    {[1, 2, 3, 4, 5].map(likelihood => {
                                        const count = getRiskCount(impact, likelihood);
                                        return (
                                            <div
                                                key={`${impact}-${likelihood}`}
                                                className={styles.heatmapCell}
                                                style={{ backgroundColor: getHeatmapColor(impact, likelihood) }}
                                            >
                                                {count > 0 ? count : ''}
                                            </div>
                                        );
                                    })}
                                </>
                            ))}
                        </div>
                        <Text size={200} style={{ marginTop: tokens.spacingVerticalM, color: tokens.colorNeutralForeground3 }}>
                            Likelihood →
                        </Text>
                    </Card>
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
                            <TableHeaderCell style={{ color: tokens.colorNeutralForeground2, fontWeight: '700', padding: '24px 20px', letterSpacing: '2px', fontSize: '12px' }}>CONTROLS</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {risks.map((risk) => (
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
                                <TableCell>{risk.linkedControlIds.length}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </GlassCard>
        </div>
    );
}
