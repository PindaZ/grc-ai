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
    TabList,
    Tab,
    ProgressBar,
    Dialog,
    DialogTrigger,
    DialogSurface,
    DialogTitle,
    DialogBody,
    DialogContent,
    DialogActions,
    Spinner,
    shorthands,
} from '@fluentui/react-components';
import { SearchRegular, AddRegular, SparkleRegular, ArrowUploadRegular } from '@fluentui/react-icons';
import { useState } from 'react';
import { evidence, controls } from '@/data/fixtures';
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
        fontSize: '36px',
        fontWeight: '800',
        color: tokens.colorNeutralForeground1,
        // textShadow: '0 2px 10px rgba(0, 112, 173, 0.3)',
    },
    quickActions: {
        display: 'flex',
        gap: tokens.spacingHorizontalS,
        padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
        backgroundColor: tokens.colorBrandBackground2,
        borderRadius: tokens.borderRadiusMedium,
        marginBottom: tokens.spacingVerticalL,
        border: `1px solid ${tokens.colorBrandStroke2}`,
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
        backgroundColor: tokens.colorNeutralBackgroundAlpha,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStrokeSubtle),
        borderRadius: '12px',
        transition: 'all 0.2s ease',
        '&:focus-within': {
            ...shorthands.borderColor(tokens.colorBrandStroke1),
            boxShadow: tokens.shadow8,
        },
    },
    dropzone: {
        border: `2px dashed ${tokens.colorNeutralStroke1}`,
        borderRadius: tokens.borderRadiusMedium,
        padding: tokens.spacingVerticalXXL,
        textAlign: 'center',
        marginBottom: tokens.spacingVerticalL,
        backgroundColor: tokens.colorNeutralBackgroundAlpha,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: tokens.colorBrandBackground2,
        },
    },
    dialogContent: {
        minWidth: '500px',
    },
    analysisResult: {
        padding: tokens.spacingVerticalM,
        backgroundColor: tokens.colorNeutralBackground2,
        borderRadius: tokens.borderRadiusMedium,
        marginTop: tokens.spacingVerticalM,
    },
    matchScore: {
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacingHorizontalM,
        marginTop: tokens.spacingVerticalM,
    },
    loadingContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: tokens.spacingVerticalXXL,
        gap: tokens.spacingHorizontalM,
    },
});

export default function EvidencePage() {
    const styles = useStyles();
    const [activeTab, setActiveTab] = useState('inbox');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showAnalysis, setShowAnalysis] = useState(false);

    const handleAnalyze = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            setShowAnalysis(true);
        }, 2500);
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <Text className={styles.title}>Evidence & Testing</Text>
                <Dialog>
                    <DialogTrigger disableButtonEnhancement>
                        <Button appearance="primary" icon={<ArrowUploadRegular />}>Upload Evidence</Button>
                    </DialogTrigger>
                    <DialogSurface className={styles.dialogContent}>
                        <DialogBody>
                            <DialogTitle>Upload Evidence</DialogTitle>
                            <DialogContent>
                                <div className={styles.dropzone} onClick={handleAnalyze}>
                                    <ArrowUploadRegular fontSize={48} style={{ color: tokens.colorNeutralForeground3 }} />
                                    <Text block style={{ marginTop: tokens.spacingVerticalM }}>
                                        Drop files here or click to upload
                                    </Text>
                                    <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                                        Supports PDF, DOCX, XLSX, images
                                    </Text>
                                </div>
                                {isAnalyzing && (
                                    <div className={styles.loadingContainer}>
                                        <Spinner />
                                        <Text>AI is analyzing the document...</Text>
                                    </div>
                                )}
                                {showAnalysis && (
                                    <>
                                        <Text weight="semibold" block>Extracted Information:</Text>
                                        <div className={styles.analysisResult}>
                                            <Text block>📄 Document Type: Access Review Report</Text>
                                            <Text block>📅 Date: Q4 2024</Text>
                                            <Text block>👤 Author: John Smith</Text>
                                            <Text block>✅ 147 users reviewed</Text>
                                        </div>
                                        <div className={styles.matchScore}>
                                            <Text>Match to CTL-001:</Text>
                                            <ProgressBar value={0.92} thickness="large" style={{ flex: 1 }} />
                                            <Badge appearance="filled" color="success">92%</Badge>
                                        </div>
                                    </>
                                )}
                            </DialogContent>
                            <DialogActions>
                                <DialogTrigger disableButtonEnhancement>
                                    <Button appearance="secondary">Cancel</Button>
                                </DialogTrigger>
                                {showAnalysis && (
                                    <Button appearance="primary">Attach to Control</Button>
                                )}
                            </DialogActions>
                        </DialogBody>
                    </DialogSurface>
                </Dialog>
            </div>

            <div className={styles.quickActions}>
                <span className={styles.quickActionsLabel}>
                    <SparkleRegular /> AI Actions:
                </span>
                <Button size="small" appearance="subtle">Analyze all pending</Button>
                <Button size="small" appearance="subtle">Auto-match to controls</Button>
                <Button size="small" appearance="subtle">Extract fields</Button>
            </div>

            <TabList selectedValue={activeTab} onTabSelect={(_, d) => setActiveTab(d.value as string)}>
                <Tab value="inbox">Evidence Inbox</Tab>
                <Tab value="attached">Attached Evidence</Tab>
                <Tab value="testing">Testing Results</Tab>
            </TabList>

            <div style={{ marginTop: tokens.spacingVerticalL }}>
                <div className={styles.toolbar}>
                    <Input
                        className={styles.searchInput}
                        contentBefore={<SearchRegular />}
                        placeholder="Search evidence..."
                    />
                </div>

                <GlassCard style={{ padding: '0 8px' }}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderCell style={{ color: tokens.colorNeutralForeground2, fontWeight: '700', padding: '24px 20px', letterSpacing: '2px', fontSize: '12px' }}>TITLE</TableHeaderCell>
                                <TableHeaderCell style={{ color: tokens.colorNeutralForeground2, fontWeight: '700', padding: '24px 20px', letterSpacing: '2px', fontSize: '12px' }}>FILE</TableHeaderCell>
                                <TableHeaderCell style={{ color: tokens.colorNeutralForeground2, fontWeight: '700', padding: '24px 20px', letterSpacing: '2px', fontSize: '12px' }}>UPLOADED</TableHeaderCell>
                                <TableHeaderCell style={{ color: tokens.colorNeutralForeground2, fontWeight: '700', padding: '24px 20px', letterSpacing: '2px', fontSize: '12px' }}>STATUS</TableHeaderCell>
                                <TableHeaderCell style={{ color: tokens.colorNeutralForeground2, fontWeight: '700', padding: '24px 20px', letterSpacing: '2px', fontSize: '12px' }}>LINKED CONTROL</TableHeaderCell>
                                <TableHeaderCell style={{ color: tokens.colorNeutralForeground2, fontWeight: '700', padding: '24px 20px', letterSpacing: '2px', fontSize: '12px' }}>MATCH SCORE</TableHeaderCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {evidence.map((ev) => (
                                <TableRow key={ev.id}>
                                    <TableCell>
                                        <Text weight="semibold">{ev.title}</Text>
                                    </TableCell>
                                    <TableCell>{ev.fileName}</TableCell>
                                    <TableCell>{ev.uploadedAt}</TableCell>
                                    <TableCell>
                                        <StatusBadge status={ev.status} />
                                    </TableCell>
                                    <TableCell>
                                        {ev.linkedControlId ? (
                                            <Badge appearance="outline">{ev.linkedControlId}</Badge>
                                        ) : '-'}
                                    </TableCell>
                                    <TableCell>
                                        {ev.matchScore ? (
                                            <Badge appearance="filled" color={ev.matchScore >= 90 ? 'success' : 'warning'}>
                                                {ev.matchScore}%
                                            </Badge>
                                        ) : '-'}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </GlassCard>
            </div>
        </div>
    );
}
