'use client';

import {
    makeStyles,
    tokens,
    Card,
    Text,
    Button,
    Badge,
    Divider,
    TabList,
    Tab,
    Dialog,
    DialogTrigger,
    DialogSurface,
    DialogTitle,
    DialogBody,
    DialogContent,
    DialogActions,
    Spinner,
} from '@fluentui/react-components';
import {
    ArrowLeftRegular,
    SparkleRegular,
    CheckmarkRegular,
    WarningRegular,
    FolderOpenRegular,
    ClipboardTaskRegular,
    HistoryRegular,
    DocumentTextRegular,
} from '@fluentui/react-icons';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { controls, risks, evidence as allEvidence } from '@/data/fixtures';

const useStyles = makeStyles({
    page: {
        padding: tokens.spacingHorizontalXXL,
        maxWidth: '1400px',
    },
    backLink: {
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacingHorizontalXS,
        marginBottom: tokens.spacingVerticalL,
        color: tokens.colorNeutralForeground3,
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: tokens.spacingVerticalL,
    },
    titleSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalS,
    },
    title: {
        fontSize: tokens.fontSizeHero700,
        fontWeight: tokens.fontWeightSemibold,
    },
    actions: {
        display: 'flex',
        gap: tokens.spacingHorizontalS,
    },
    content: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: tokens.spacingHorizontalXXL,
    },
    mainContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalL,
    },
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalL,
    },
    tabContent: {
        padding: tokens.spacingVerticalL,
        minHeight: '300px',
    },
    glassCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--glass-border-light)',
        boxShadow: 'var(--shadow-soft-sm)',
        borderRadius: tokens.borderRadiusLarge,
    },
    procedureStep: {
        padding: tokens.spacingVerticalS,
        borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    },
    evidenceItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: tokens.spacingVerticalS,
        borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    },
    linkedItem: {
        padding: tokens.spacingVerticalS,
        borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
        transition: 'background-color 0.15s ease',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
        }
    },
    dialogContent: {
        minWidth: '500px',
    },
    aiRevealContainer: {
        marginTop: tokens.spacingVerticalL,
        padding: tokens.spacingVerticalL,
        border: '1px solid var(--glass-border-light)',
        borderRadius: tokens.borderRadiusLarge,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
        animationName: 'slideInUp',
        animationDuration: '0.5s',
        animationFillMode: 'forwards',
    },
    loadingContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: tokens.spacingVerticalXXL,
        gap: tokens.spacingHorizontalM,
    },
    completenessResult: {
        padding: tokens.spacingVerticalM,
        backgroundColor: tokens.colorNeutralBackground2,
        borderRadius: tokens.borderRadiusMedium,
        marginTop: tokens.spacingVerticalM,
    },
});

export default function ControlDetailPage() {
    const styles = useStyles();
    const params = useParams();
    const [activeTab, setActiveTab] = useState('overview');
    const [isChecking, setIsChecking] = useState(false);
    const [showCompleteness, setShowCompleteness] = useState(false);

    const control = controls.find(c => c.id === params.id);
    const linkedRisks = risks.filter(r => control?.linkedRiskIds.includes(r.id));
    const linkedEvidence = allEvidence.filter(e => control?.linkedEvidenceIds.includes(e.id));

    const handleCheckCompleteness = () => {
        setIsChecking(true);
        setTimeout(() => {
            setIsChecking(false);
            setShowCompleteness(true);
        }, 2000);
    };

    if (!control) {
        return <div className={styles.page}><Text>Control not found</Text></div>;
    }

    return (
        <div className={styles.page}>
            <Link href="/controls" className={styles.backLink}>
                <ArrowLeftRegular /> Back to Controls
            </Link>

            <div className={styles.header}>
                <div className={styles.titleSection}>
                    <Text className={styles.title}>{control.id}: {control.title}</Text>
                    <Badge
                        appearance="filled"
                        color={control.status === 'active' ? 'success' : 'warning'}
                        style={{ textTransform: 'capitalize', width: 'fit-content' }}
                    >
                        {control.status}
                    </Badge>
                </div>
                <div className={styles.actions}>
                    <Dialog>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="primary" icon={<SparkleRegular />} onClick={handleCheckCompleteness}>
                                Check Completeness
                            </Button>
                        </DialogTrigger>
                        <DialogSurface className={styles.dialogContent}>
                            <DialogBody>
                                <DialogTitle>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS }}>
                                        <SparkleRegular style={{ color: tokens.colorBrandForeground1 }} />
                                        Completeness Check
                                    </span>
                                </DialogTitle>
                                <DialogContent>
                                    {isChecking && (
                                        <div className={styles.loadingContainer}>
                                            <Spinner />
                                            <Text>Analyzing control completeness...</Text>
                                        </div>
                                    )}
                                    {showCompleteness && (
                                        <>
                                            <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalM }}>
                                                Analysis Complete
                                            </Text>
                                            <div className={styles.completenessResult}>
                                                <Text block>✅ Procedure documented</Text>
                                                <Text block>✅ Evidence attached ({linkedEvidence.length} items)</Text>
                                                <Text block>⚠️ Missing: Approval signature</Text>
                                                <Text block>⚠️ Missing: Last test date</Text>
                                            </div>
                                            <Text size={200} style={{ marginTop: tokens.spacingVerticalM, color: tokens.colorNeutralForeground3 }}>
                                                Completeness Score: 75%
                                            </Text>
                                        </>
                                    )}
                                </DialogContent>
                                <DialogActions>
                                    <DialogTrigger disableButtonEnhancement>
                                        <Button appearance="secondary">Close</Button>
                                    </DialogTrigger>
                                </DialogActions>
                            </DialogBody>
                        </DialogSurface>
                    </Dialog>
                    <Button appearance="subtle" icon={<SparkleRegular />}>Generate Procedure</Button>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.mainContent}>
                    <Card>
                        <TabList selectedValue={activeTab} onTabSelect={(_, d) => setActiveTab(d.value as string)}>
                            <Tab value="overview" icon={<DocumentTextRegular />}>Overview</Tab>
                            <Tab value="procedure" icon={<ClipboardTaskRegular />}>Procedure</Tab>
                            <Tab value="evidence" icon={<FolderOpenRegular />}>Evidence</Tab>
                            <Tab value="history" icon={<HistoryRegular />}>History</Tab>
                        </TabList>
                        <Divider />
                        <div className={styles.tabContent}>
                            {activeTab === 'overview' && (
                                <>
                                    <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>Description</Text>
                                    <Text>{control.description}</Text>
                                </>
                            )}
                            {activeTab === 'procedure' && (
                                <>
                                    <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>Control Procedure</Text>
                                    {control.procedure.split('\\n').map((step, i) => (
                                        <div key={i} className={styles.procedureStep}>
                                            <Text>{step}</Text>
                                        </div>
                                    ))}
                                </>
                            )}
                            {activeTab === 'evidence' && (
                                <>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalM }}>
                                        <Text weight="semibold">Attached Evidence</Text>
                                        <Link href="/evidence">
                                            <Button size="small" appearance="primary">Upload Evidence</Button>
                                        </Link>
                                    </div>
                                    {linkedEvidence.length === 0 ? (
                                        <Text style={{ color: tokens.colorNeutralForeground3 }}>No evidence attached yet.</Text>
                                    ) : linkedEvidence.map(ev => (
                                        <div key={ev.id} className={styles.evidenceItem}>
                                            <div>
                                                <Text weight="semibold" block>{ev.title}</Text>
                                                <Text size={200}>{ev.fileName}</Text>
                                            </div>
                                            <Badge appearance="tint" style={{ textTransform: 'capitalize' }}>{ev.status}</Badge>
                                        </div>
                                    ))}
                                </>
                            )}
                            {activeTab === 'history' && (
                                <>
                                    <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>Activity History</Text>
                                    <Text style={{ color: tokens.colorNeutralForeground3 }}>
                                        Created: {control.createdAt} • Updated: {control.updatedAt}
                                    </Text>
                                </>
                            )}
                        </div>
                    </Card>
                </div>

                <div className={styles.sidebar}>
                    <Card>
                        <Text weight="semibold" style={{ marginBottom: tokens.spacingVerticalS }} block>
                            <WarningRegular /> Linked Risks ({linkedRisks.length})
                        </Text>
                        <Divider />
                        {linkedRisks.map(risk => (
                            <div key={risk.id} className={styles.linkedItem}>
                                <Link href={`/risks/${risk.id}`}>
                                    <Text size={200} weight="semibold">{risk.id}</Text>
                                    <Text size={200} block>{risk.title}</Text>
                                </Link>
                            </div>
                        ))}
                    </Card>
                </div>
            </div>
        </div>
    );
}
