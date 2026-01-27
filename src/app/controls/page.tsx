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
    Avatar,
    useToastController,
    Toast,
    ToastTitle,
    ToastIntent,
} from '@fluentui/react-components';
import { SearchRegular, AddRegular, FilterRegular, SparkleRegular } from '@fluentui/react-icons';
import Link from 'next/link';
import { controls } from '@/data/fixtures';
import { GlassCard } from '@/components/ui/GlassCard';
import { StatusBadge, PageHeader, QuickActionsBar } from '@/components/atoms';

const useStyles = makeStyles({
    page: {
        padding: tokens.spacingHorizontalXXL,
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

const getAgentForControl = (id: string) => {
    if (id.includes('ACC')) return 'Access Agent';
    if (id.startsWith('PRIV')) return 'Privacy Agent';
    if (id.includes('SOC') || id.startsWith('CTL-00')) return 'Security Agent';
    return 'Policy Agent';
};

export default function ControlsPage() {
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
                title="Controls Library"
                description="Defensive Strategy: Configure and manage the technical and operational safeguards monitored by AI Agents."
            >
                <Button appearance="primary" icon={<AddRegular />} onClick={() => notify('Control creation is currently disabled.')}>
                    Add Control
                </Button>
            </PageHeader>

            <QuickActionsBar>
                <Button size="small" appearance="subtle" onClick={() => notify('Checking completeness for 24 controls...')}>Check all completeness</Button>
                <Button size="small" appearance="subtle" onClick={() => notify('AI is generating procedure drafts...')}>Generate procedures</Button>
                <Button size="small" appearance="subtle" onClick={() => notify('3 evidence gaps identified.')}>Find evidence gaps</Button>
            </QuickActionsBar>

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
                            <TableHeaderCell style={{ color: tokens.colorNeutralForeground2, fontWeight: '700', padding: '24px 20px', letterSpacing: '2px', fontSize: '12px' }}>ID</TableHeaderCell>
                            <TableHeaderCell style={{ color: tokens.colorNeutralForeground2, fontWeight: '700', padding: '24px 20px', letterSpacing: '2px', fontSize: '12px' }}>TITLE</TableHeaderCell>
                            <TableHeaderCell style={{ color: tokens.colorNeutralForeground2, fontWeight: '700', padding: '24px 20px', letterSpacing: '2px', fontSize: '12px' }}>STATUS</TableHeaderCell>
                            <TableHeaderCell style={{ color: tokens.colorNeutralForeground2, fontWeight: '700', padding: '24px 20px', letterSpacing: '2px', fontSize: '12px' }}>LINKS</TableHeaderCell>
                            <TableHeaderCell style={{ color: tokens.colorNeutralForeground2, fontWeight: '700', padding: '24px 20px', letterSpacing: '2px', fontSize: '12px' }}>MONITORED BY</TableHeaderCell>
                            <TableHeaderCell style={{ color: tokens.colorNeutralForeground2, fontWeight: '700', padding: '24px 20px', letterSpacing: '2px', fontSize: '12px' }}>EVIDENCE</TableHeaderCell>
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
                                <TableCell>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Avatar
                                            name={getAgentForControl(control.id)}
                                            size={20}
                                            color="brand"
                                            icon={<SparkleRegular fontSize={12} />}
                                        />
                                        <Text size={200} weight="medium">{getAgentForControl(control.id)}</Text>
                                    </div>
                                </TableCell>
                                <TableCell>{control.linkedEvidenceIds.length}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </GlassCard>
        </div>
    );
}
