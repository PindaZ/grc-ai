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
} from '@fluentui/react-components';
import { SearchRegular, AddRegular, FilterRegular, SparkleRegular } from '@fluentui/react-icons';
import Link from 'next/link';
import { controls } from '@/data/fixtures';
import { GlassCard } from '@/components/ui/GlassCard';
import { StatusBadge } from '@/components/atoms/Badges';

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
        fontSize: '32px',
        fontWeight: '800',
        color: '#FFFFFF',
        textShadow: '0 2px 10px rgba(0, 112, 173, 0.3)',
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
    },
    searchInput: {
        minWidth: '300px',
    },
    tableRow: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: tokens.colorNeutralBackground1Hover,
        },
    },
});

export default function ControlsPage() {
    const styles = useStyles();

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <Text className={styles.title}>Controls Library</Text>
                <Button appearance="primary" icon={<AddRegular />}>
                    Add Control
                </Button>
            </div>

            <div className={styles.quickActions}>
                <span className={styles.quickActionsLabel}>
                    <SparkleRegular /> AI Actions:
                </span>
                <Button size="small" appearance="subtle">Check all completeness</Button>
                <Button size="small" appearance="subtle">Generate procedures</Button>
                <Button size="small" appearance="subtle">Find evidence gaps</Button>
            </div>

            <div className={styles.toolbar}>
                <Input
                    className={styles.searchInput}
                    contentBefore={<SearchRegular />}
                    placeholder="Search controls..."
                />
                <Button appearance="subtle" icon={<FilterRegular />}>Filters</Button>
            </div>

            <GlassCard style={{ padding: '0 8px' }}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell style={{ color: 'rgba(255,255,255,0.9)', fontWeight: '700', padding: '24px 20px', letterSpacing: '2px', fontSize: '12px' }}>ID</TableHeaderCell>
                            <TableHeaderCell style={{ color: 'rgba(255,255,255,0.9)', fontWeight: '700', padding: '24px 20px', letterSpacing: '2px', fontSize: '12px' }}>TITLE</TableHeaderCell>
                            <TableHeaderCell style={{ color: 'rgba(255,255,255,0.9)', fontWeight: '700', padding: '24px 20px', letterSpacing: '2px', fontSize: '12px' }}>STATUS</TableHeaderCell>
                            <TableHeaderCell style={{ color: 'rgba(255,255,255,0.9)', fontWeight: '700', padding: '24px 20px', letterSpacing: '2px', fontSize: '12px' }}>LINKS</TableHeaderCell>
                            <TableHeaderCell style={{ color: 'rgba(255,255,255,0.9)', fontWeight: '700', padding: '24px 20px', letterSpacing: '2px', fontSize: '12px' }}>EVIDENCE</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {controls.map((control) => (
                            <TableRow key={control.id} className={styles.tableRow}>
                                <TableCell>
                                    <Link href={`/controls/${control.id}`}>
                                        <Text weight="semibold" style={{ color: tokens.colorBrandForeground1 }}>
                                            {control.id}
                                        </Text>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link href={`/controls/${control.id}`}>{control.title}</Link>
                                </TableCell>
                                <TableCell>
                                    <StatusBadge status={control.status} />
                                </TableCell>
                                <TableCell>{control.linkedRiskIds.length}</TableCell>
                                <TableCell>{control.linkedEvidenceIds.length}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </GlassCard>
        </div>
    );
}
