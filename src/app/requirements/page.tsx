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
} from '@fluentui/react-components';
import { SearchRegular, AddRegular, FilterRegular, SparkleRegular } from '@fluentui/react-icons';
import Link from 'next/link';
import { requirements } from '@/data/fixtures';

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
        fontSize: tokens.fontSizeHero700,
        fontWeight: tokens.fontWeightSemibold,
    },
    actions: {
        display: 'flex',
        gap: tokens.spacingHorizontalS,
    },
    toolbar: {
        display: 'flex',
        gap: tokens.spacingHorizontalM,
        marginBottom: tokens.spacingVerticalL,
    },
    searchInput: {
        minWidth: '300px',
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
    tableRow: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: tokens.colorNeutralBackground1Hover,
        },
    },
    statusBadge: {
        textTransform: 'capitalize',
    },
});

export default function RequirementsPage() {
    const styles = useStyles();

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <Text className={styles.title}>Requirements & Regulations</Text>
                <div className={styles.actions}>
                    <Button appearance="primary" icon={<AddRegular />}>
                        Add Requirement
                    </Button>
                </div>
            </div>

            <div className={styles.quickActions}>
                <span className={styles.quickActionsLabel}>
                    <SparkleRegular /> AI Actions:
                </span>
                <Button size="small" appearance="subtle">Bulk generate risks</Button>
                <Button size="small" appearance="subtle">Map to framework</Button>
                <Button size="small" appearance="subtle">Check coverage</Button>
            </div>

            <div className={styles.toolbar}>
                <Input
                    className={styles.searchInput}
                    contentBefore={<SearchRegular />}
                    placeholder="Search requirements..."
                />
                <Button appearance="subtle" icon={<FilterRegular />}>Filters</Button>
            </div>

            <Card>
                <Table>
                    <TableHeader>
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
                                        <Text weight="semibold" style={{ color: tokens.colorBrandForeground1 }}>
                                            {req.id}
                                        </Text>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <TableCellLayout>
                                        <Link href={`/requirements/${req.id}`}>{req.title}</Link>
                                    </TableCellLayout>
                                </TableCell>
                                <TableCell>
                                    <Badge appearance="outline">{req.source}</Badge>
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
                                <TableCell>{req.linkedRiskIds.length}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
