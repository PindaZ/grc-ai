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
    useToastController,
    Toast,
    ToastTitle,
    ToastIntent,
} from '@fluentui/react-components';
import { SearchRegular, AddRegular, FilterRegular, SparkleRegular } from '@fluentui/react-icons';
import Link from 'next/link';
import { requirements } from '@/data/fixtures';
import { GlassCard } from '@/components/ui/GlassCard';
import { PageHeader, QuickActionsBar } from '@/components/atoms';

const useStyles = makeStyles({
    page: {
        padding: tokens.spacingHorizontalXXL,
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
    const { dispatchToast } = useToastController('global-toaster');

    const notify = (title: string, intent: ToastIntent = 'success') => {
        dispatchToast(
            <Toast>
                <ToastTitle>{title}</ToastTitle>
            </Toast>,
            { intent }
        );
    };

    return (
        <div className={styles.page}>
            <PageHeader
                title="Requirements & Regulations"
                description="Governance Mapping: Define the legislative and framework-level source of truth for all compliance operations."
            >
                <Button className={styles.addBtn} icon={<AddRegular />} onClick={() => notify('Requirement creation is currently disabled.')}>
                    Add Requirement
                </Button>
            </PageHeader>

            <QuickActionsBar>
                <Button size="small" appearance="subtle" className={styles.aiActionBtn} onClick={() => notify('AI is analyzing requirements to generate risks...')}>Bulk generate risks</Button>
                <Button size="small" appearance="subtle" className={styles.aiActionBtn} onClick={() => notify('Framework mapping updated.')}>Map to framework</Button>
                <Button size="small" appearance="subtle" className={styles.aiActionBtn} onClick={() => notify('Coverage check: 98% requirements mapped.')}>Check coverage</Button>
            </QuickActionsBar>

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
                            <TableHeaderCell>AI Coverage</TableHeaderCell>
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
                                <TableCell>
                                    <Badge
                                        appearance="tint"
                                        color={req.status === 'active' ? 'brand' : 'subtle'}
                                        icon={<SparkleRegular />}
                                    >
                                        {req.status === 'active' ? '100%' : 'Analyzed'}
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
