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
    TableCellLayout,
    shorthands,
} from '@fluentui/react-components';
import { SearchRegular, AddRegular, FilterRegular, SparkleRegular } from '@fluentui/react-icons';
import Link from 'next/link';
import { requirements } from '@/data/fixtures';
import { GlassCard } from '@/components/ui/GlassCard';

const useStyles = makeStyles({
    page: {
        padding: tokens.spacingHorizontalXXL,
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        paddingBottom: '24px',
    },
    title: {
        fontSize: '36px',
        fontWeight: '800',
        color: tokens.colorNeutralForeground1,
        // textShadow: '0 2px 10px rgba(0, 112, 173, 0.3)',
    },
    actions: {
        display: 'flex',
        gap: tokens.spacingHorizontalS,
    },
    addBtn: {
        background: 'var(--brand-blue)',
        color: '#fff',
        fontWeight: '600',
        '&:hover': {
            background: 'var(--brand-dark)',
        },
    },
    toolbar: {
        display: 'flex',
        gap: tokens.spacingHorizontalM,
        marginBottom: '24px',
    },
    searchInput: {
        minWidth: '340px',
        background: tokens.colorNeutralBackgroundAlpha,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStrokeSubtle),
        borderRadius: '12px',
        transition: 'all 0.2s ease',
        '&:focus-within': {
            ...shorthands.borderColor(tokens.colorBrandStroke1),
            boxShadow: tokens.shadow8,
        },
    },
    quickActions: {
        display: 'flex',
        gap: '12px',
        padding: '12px 20px',
        background: tokens.colorBrandBackground2,
        backdropFilter: 'blur(8px)',
        borderRadius: '16px',
        ...shorthands.border('1px', 'solid', tokens.colorBrandStroke2),
        marginBottom: '32px',
        alignItems: 'center',
    },
    quickActionsLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#17ABDA',
        fontSize: '13px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '1px',
    },
    aiActionBtn: {
        color: tokens.colorNeutralForeground2,
        '&:hover': {
            background: tokens.colorNeutralBackgroundAlpha,
            color: tokens.colorNeutralForeground1,
        },
    },
    tableHeader: {
        '& th': {
            color: tokens.colorNeutralForeground2,
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontWeight: '700',
            ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStrokeSubtle),
            padding: '24px 20px',
        }
    },
    tableRow: {
        cursor: 'pointer',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
            backgroundColor: tokens.colorNeutralBackground1Hover,
            transform: 'scale(1.002)',
            boxShadow: tokens.shadow4,
        },
        '& td': {
            padding: '16px',
            ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStrokeSubtle),
        }
    },
    reqId: {
        color: 'var(--brand-vibrant)',
        fontWeight: '700',
        letterSpacing: '0.5px',
    },
    statusBadge: {
        textTransform: 'uppercase',
        fontWeight: '700',
        fontSize: '10px',
        letterSpacing: '1px',
        padding: '2px 10px',
    },
});

export default function RequirementsPage() {
    const styles = useStyles();

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <Text className={styles.title}>Requirements & Regulations</Text>
                <div className={styles.actions}>
                    <Button className={styles.addBtn} icon={<AddRegular />}>
                        Add Requirement
                    </Button>
                </div>
            </div>

            <div className={styles.quickActions}>
                <span className={styles.quickActionsLabel}>
                    <SparkleRegular /> AI Actions:
                </span>
                <Button size="small" appearance="subtle" className={styles.aiActionBtn}>Bulk generate risks</Button>
                <Button size="small" appearance="subtle" className={styles.aiActionBtn}>Map to framework</Button>
                <Button size="small" appearance="subtle" className={styles.aiActionBtn}>Check coverage</Button>
            </div>

            <div className={styles.toolbar}>
                <Input
                    className={styles.searchInput}
                    contentBefore={<SearchRegular />}
                    placeholder="Search requirements..."
                />
                <Button appearance="subtle" icon={<FilterRegular />}>Filters</Button>
            </div>

            <GlassCard style={{ padding: '0 8px' }}>
                <Table>
                    <TableHeader className={styles.tableHeader}>
                        <TableRow>
                            <TableHeaderCell>ID</TableHeaderCell>
                            <TableHeaderCell>Title</TableHeaderCell>
                            <TableHeaderCell>Source</TableHeaderCell>
                            <TableHeaderCell>Status</TableHeaderCell>
                            <TableHeaderCell>Linked Risks</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {requirements.map((req) => (
                            <TableRow key={req.id} className={styles.tableRow}>
                                <TableCell>
                                    <Link href={`/requirements/${req.id}`}>
                                        <Text className={styles.reqId}>
                                            {req.id}
                                        </Text>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <TableCellLayout>
                                        <Link href={`/requirements/${req.id}`} style={{ color: tokens.colorNeutralForeground1 }}>{req.title}</Link>
                                    </TableCellLayout>
                                </TableCell>
                                <TableCell>
                                    <Badge appearance="outline" style={{ borderColor: tokens.colorNeutralStroke2, color: tokens.colorNeutralForeground3 }}>{req.source}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        appearance="filled"
                                        color={req.status === 'active' ? 'success' : 'warning'}
                                        className={styles.statusBadge}
                                    >
                                        {req.status}
                                    </Badge>
                                </TableCell>
                                <TableCell style={{ color: tokens.colorNeutralForeground3, textAlign: 'center' }}>{req.linkedRiskIds.length}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </GlassCard>
        </div>
    );
}
