'use client';

import { makeStyles, tokens, Card, Text, Button, Badge, Table, TableHeader, TableRow, TableHeaderCell, TableBody, TableCell, Checkbox, Tooltip, Menu, MenuItem, MenuTrigger, MenuPopover, MenuList } from '@fluentui/react-components';
import { CheckmarkRegular, DismissRegular, SearchRegular, MoreHorizontalRegular, SparkleRegular, ChevronDownRegular } from '@fluentui/react-icons';
import { useState } from 'react';
import { AIFinding } from '@/types';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalM,
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: tokens.spacingVerticalM,
        backgroundColor: tokens.colorNeutralBackground2,
        borderRadius: tokens.borderRadiusMedium,
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacingHorizontalM,
    },
    skillBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: tokens.spacingHorizontalXS,
        padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalS}`,
        backgroundColor: tokens.colorBrandBackground2,
        borderRadius: tokens.borderRadiusSmall,
        color: tokens.colorBrandForeground1,
        fontSize: tokens.fontSizeBase200,
    },
    bulkActions: {
        display: 'flex',
        gap: tokens.spacingHorizontalS,
    },
    tableRow: {
        '&:hover': {
            backgroundColor: tokens.colorNeutralBackground1Hover,
        },
    },
    severityHigh: {
        backgroundColor: tokens.colorPaletteRedBackground2,
        color: tokens.colorPaletteRedForeground2,
    },
    severityMedium: {
        backgroundColor: tokens.colorPaletteYellowBackground2,
        color: tokens.colorPaletteYellowForeground2,
    },
    severityLow: {
        backgroundColor: tokens.colorPaletteGreenBackground2,
        color: tokens.colorPaletteGreenForeground2,
    },
    recommendationCell: {
        maxWidth: '250px',
    },
    actionButtons: {
        display: 'flex',
        gap: tokens.spacingHorizontalXS,
    },
    statusResolved: {
        opacity: 0.6,
        textDecoration: 'line-through',
    },
    entityText: {
        fontFamily: 'monospace',
        fontSize: tokens.fontSizeBase200,
        backgroundColor: tokens.colorNeutralBackground3,
        padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalXS}`,
        borderRadius: tokens.borderRadiusSmall,
    },
});

interface ExceptionReviewTableProps {
    findings: AIFinding[];
    skillName: string;
    lastRunTime?: string;
    onAccept: (ids: string[]) => void;
    onReject: (ids: string[]) => void;
    onInvestigate?: (id: string) => void;
}

const severityOrder = { high: 0, medium: 1, low: 2 };

export function ExceptionReviewTable({
    findings,
    skillName,
    lastRunTime,
    onAccept,
    onReject,
    onInvestigate,
}: ExceptionReviewTableProps) {
    const styles = useStyles();
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [localFindings, setLocalFindings] = useState(findings);

    const sortedFindings = [...localFindings].sort((a, b) =>
        severityOrder[a.severity] - severityOrder[b.severity]
    );

    const pendingFindings = sortedFindings.filter(f => f.status === 'pending');
    const resolvedFindings = sortedFindings.filter(f => f.status !== 'pending');

    const toggleSelect = (id: string) => {
        const newSelected = new Set(selected);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelected(newSelected);
    };

    const selectAll = () => {
        if (selected.size === pendingFindings.length) {
            setSelected(new Set());
        } else {
            setSelected(new Set(pendingFindings.map(f => f.id)));
        }
    };

    const handleBulkAccept = () => {
        onAccept(Array.from(selected));
        setLocalFindings(prev => prev.map(f =>
            selected.has(f.id) ? { ...f, status: 'accepted' as const } : f
        ));
        setSelected(new Set());
    };

    const handleBulkReject = () => {
        onReject(Array.from(selected));
        setLocalFindings(prev => prev.map(f =>
            selected.has(f.id) ? { ...f, status: 'rejected' as const } : f
        ));
        setSelected(new Set());
    };

    const handleSingleAction = (id: string, action: 'accepted' | 'rejected' | 'investigating') => {
        if (action === 'investigating' && onInvestigate) {
            onInvestigate(id);
        } else if (action === 'accepted') {
            onAccept([id]);
        } else if (action === 'rejected') {
            onReject([id]);
        }
        setLocalFindings(prev => prev.map(f =>
            f.id === id ? { ...f, status: action } : f
        ));
    };

    const getSeverityClass = (severity: string) => {
        switch (severity) {
            case 'high': return styles.severityHigh;
            case 'medium': return styles.severityMedium;
            default: return styles.severityLow;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <span className={styles.skillBadge}>
                        <SparkleRegular fontSize={12} /> {skillName}
                    </span>
                    <Text weight="semibold">
                        {pendingFindings.length} pending findings
                    </Text>
                    {lastRunTime && (
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                            Last run: {new Date(lastRunTime).toLocaleString()}
                        </Text>
                    )}
                </div>
                <div className={styles.bulkActions}>
                    {selected.size > 0 && (
                        <>
                            <Button appearance="primary" size="small" icon={<CheckmarkRegular />} onClick={handleBulkAccept}>
                                Accept {selected.size}
                            </Button>
                            <Button appearance="subtle" size="small" icon={<DismissRegular />} onClick={handleBulkReject}>
                                Dismiss {selected.size}
                            </Button>
                        </>
                    )}
                </div>
            </div>

            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell style={{ width: '40px' }}>
                                <Checkbox
                                    checked={selected.size === pendingFindings.length && pendingFindings.length > 0}
                                    onChange={selectAll}
                                />
                            </TableHeaderCell>
                            <TableHeaderCell style={{ width: '80px' }}>Severity</TableHeaderCell>
                            <TableHeaderCell>Finding</TableHeaderCell>
                            <TableHeaderCell>Entity</TableHeaderCell>
                            <TableHeaderCell className={styles.recommendationCell}>AI Recommendation</TableHeaderCell>
                            <TableHeaderCell style={{ width: '120px' }}>Action</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pendingFindings.map(finding => (
                            <TableRow key={finding.id} className={styles.tableRow}>
                                <TableCell>
                                    <Checkbox
                                        checked={selected.has(finding.id)}
                                        onChange={() => toggleSelect(finding.id)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Badge className={getSeverityClass(finding.severity)} appearance="filled">
                                        {finding.severity}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Text weight="semibold" block>{finding.title}</Text>
                                    <Text size={200}>{finding.description}</Text>
                                </TableCell>
                                <TableCell>
                                    <code className={styles.entityText}>{finding.entity}</code>
                                </TableCell>
                                <TableCell className={styles.recommendationCell}>
                                    <Tooltip content={finding.recommendation} relationship="description">
                                        <Text size={200}>{finding.recommendation}</Text>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>
                                    <div className={styles.actionButtons}>
                                        <Tooltip content="Accept recommendation" relationship="label">
                                            <Button
                                                appearance="subtle"
                                                size="small"
                                                icon={<CheckmarkRegular />}
                                                onClick={() => handleSingleAction(finding.id, 'accepted')}
                                            />
                                        </Tooltip>
                                        <Tooltip content="Dismiss" relationship="label">
                                            <Button
                                                appearance="subtle"
                                                size="small"
                                                icon={<DismissRegular />}
                                                onClick={() => handleSingleAction(finding.id, 'rejected')}
                                            />
                                        </Tooltip>
                                        <Tooltip content="Investigate" relationship="label">
                                            <Button
                                                appearance="subtle"
                                                size="small"
                                                icon={<SearchRegular />}
                                                onClick={() => handleSingleAction(finding.id, 'investigating')}
                                            />
                                        </Tooltip>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {resolvedFindings.map(finding => (
                            <TableRow key={finding.id} className={`${styles.tableRow} ${styles.statusResolved}`}>
                                <TableCell />
                                <TableCell>
                                    <Badge appearance="outline">{finding.severity}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Text>{finding.title}</Text>
                                </TableCell>
                                <TableCell>
                                    <code className={styles.entityText}>{finding.entity}</code>
                                </TableCell>
                                <TableCell />
                                <TableCell>
                                    <Badge appearance="filled" color={finding.status === 'accepted' ? 'success' : 'subtle'}>
                                        {finding.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
