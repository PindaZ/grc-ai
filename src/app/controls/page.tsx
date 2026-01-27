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

            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>ID</TableHeaderCell>
                            <TableHeaderCell>Title</TableHeaderCell>
                            <TableHeaderCell>Status</TableHeaderCell>
                            <TableHeaderCell>Linked Risks</TableHeaderCell>
                            <TableHeaderCell>Evidence</TableHeaderCell>
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
                                    <Badge
                                        appearance="filled"
                                        color={control.status === 'active' ? 'success' : 'warning'}
                                        style={{ textTransform: 'capitalize' }}
                                    >
                                        {control.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{control.linkedRiskIds.length}</TableCell>
                                <TableCell>{control.linkedEvidenceIds.length}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
