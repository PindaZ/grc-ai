'use client';

import {
    makeStyles,
    tokens,
    Card,
    CardHeader,
    Text,
    Button,
    Badge,
    Divider,
    Dialog,
    DialogTrigger,
    DialogSurface,
    DialogTitle,
    DialogBody,
    DialogContent,
    DialogActions,
    Checkbox,
    Spinner,
} from '@fluentui/react-components';
import {
    ArrowLeftRegular,
    SparkleRegular,
    CheckmarkRegular,
    DismissRegular,
    DocumentTextRegular,
    WarningRegular,
} from '@fluentui/react-icons';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { requirements, risks as allRisks } from '@/data/fixtures';

const useStyles = makeStyles({
    page: {
        padding: tokens.spacingHorizontalXXL,
        maxWidth: '1200px',
    },
    backLink: {
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacingHorizontalXS,
        marginBottom: tokens.spacingVerticalL,
        color: tokens.colorNeutralForeground3,
        '&:hover': {
            color: tokens.colorNeutralForeground1,
        },
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: tokens.spacingVerticalXXL,
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
    section: {
        marginBottom: tokens.spacingVerticalL,
    },
    sectionTitle: {
        fontSize: tokens.fontSizeBase400,
        fontWeight: tokens.fontWeightSemibold,
        marginBottom: tokens.spacingVerticalM,
    },
    metadata: {
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalL}`,
    },
    metadataLabel: {
        color: tokens.colorNeutralForeground3,
    },
    linkedItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: tokens.spacingVerticalS,
        borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
        '&:last-child': {
            borderBottom: 'none',
        },
    },
    dialogContent: {
        minWidth: '500px',
    },
    suggestionItem: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: tokens.spacingHorizontalM,
        padding: tokens.spacingVerticalM,
        borderRadius: tokens.borderRadiusMedium,
        backgroundColor: tokens.colorNeutralBackground2,
        marginBottom: tokens.spacingVerticalS,
    },
    suggestionContent: {
        flex: 1,
    },
    loadingContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: tokens.spacingVerticalXXL,
        gap: tokens.spacingHorizontalM,
    },
});

const mockGeneratedRisks = [
    { id: 'new-1', title: 'Data Processing Violation', description: 'Risk of non-compliant data processing practices' },
    { id: 'new-2', title: 'Consent Management Failure', description: 'Risk of inadequate consent collection and management' },
    { id: 'new-3', title: 'Data Subject Rights Breach', description: 'Risk of failing to respond to data subject requests' },
];

export default function RequirementDetailPage() {
    const styles = useStyles();
    const params = useParams();
    const [isGenerating, setIsGenerating] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [selectedRisks, setSelectedRisks] = useState<string[]>([]);

    const requirement = requirements.find(r => r.id === params.id);
    const linkedRisks = allRisks.filter(r => requirement?.linkedRiskIds.includes(r.id));

    const handleGenerate = () => {
        setIsGenerating(true);
        setShowResults(false);
        setTimeout(() => {
            setIsGenerating(false);
            setShowResults(true);
            setSelectedRisks(mockGeneratedRisks.map(r => r.id));
        }, 2000);
    };

    if (!requirement) {
        return <div className={styles.page}><Text>Requirement not found</Text></div>;
    }

    return (
        <div className={styles.page}>
            <Link href="/requirements" className={styles.backLink}>
                <ArrowLeftRegular /> Back to Requirements
            </Link>

            <div className={styles.header}>
                <div className={styles.titleSection}>
                    <Badge appearance="outline" size="large">{requirement.source}</Badge>
                    <Text className={styles.title}>{requirement.id}: {requirement.title}</Text>
                    <Badge
                        appearance="filled"
                        color={requirement.status === 'active' ? 'success' : 'warning'}
                        style={{ textTransform: 'capitalize', width: 'fit-content' }}
                    >
                        {requirement.status}
                    </Badge>
                </div>
                <div className={styles.actions}>
                    <Dialog>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="primary" icon={<SparkleRegular />} onClick={handleGenerate}>
                                Generate Risks
                            </Button>
                        </DialogTrigger>
                        <DialogSurface className={styles.dialogContent}>
                            <DialogBody>
                                <DialogTitle>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS }}>
                                        <SparkleRegular style={{ color: tokens.colorBrandForeground1 }} />
                                        AI Risk Generator
                                    </div>
                                </DialogTitle>
                                <DialogContent>
                                    {isGenerating && (
                                        <div className={styles.loadingContainer}>
                                            <Spinner size="medium" />
                                            <Text>Analyzing requirement and generating risks...</Text>
                                        </div>
                                    )}
                                    {showResults && (
                                        <>
                                            <Text>Generated {mockGeneratedRisks.length} potential risks:</Text>
                                            <div style={{ marginTop: tokens.spacingVerticalM }}>
                                                {mockGeneratedRisks.map(risk => (
                                                    <div key={risk.id} className={styles.suggestionItem}>
                                                        <Checkbox
                                                            checked={selectedRisks.includes(risk.id)}
                                                            onChange={(_, data) => {
                                                                if (data.checked) {
                                                                    setSelectedRisks([...selectedRisks, risk.id]);
                                                                } else {
                                                                    setSelectedRisks(selectedRisks.filter(id => id !== risk.id));
                                                                }
                                                            }}
                                                        />
                                                        <div className={styles.suggestionContent}>
                                                            <Text weight="semibold" block>{risk.title}</Text>
                                                            <Text size={200}>{risk.description}</Text>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                    {!isGenerating && !showResults && (
                                        <Text>Click the button to analyze this requirement and generate associated risks.</Text>
                                    )}
                                </DialogContent>
                                <DialogActions>
                                    <DialogTrigger disableButtonEnhancement>
                                        <Button appearance="secondary">Cancel</Button>
                                    </DialogTrigger>
                                    {showResults && (
                                        <Button appearance="primary" icon={<CheckmarkRegular />}>
                                            Create {selectedRisks.length} Risks
                                        </Button>
                                    )}
                                </DialogActions>
                            </DialogBody>
                        </DialogSurface>
                    </Dialog>
                    <Button appearance="subtle">Edit</Button>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.mainContent}>
                    <Card>
                        <Text className={styles.sectionTitle}>Description</Text>
                        <Text>{requirement.description}</Text>
                    </Card>

                    <Card>
                        <Text className={styles.sectionTitle}>Metadata</Text>
                        <div className={styles.metadata}>
                            <Text className={styles.metadataLabel}>Source:</Text>
                            <Text>{requirement.source}</Text>
                            <Text className={styles.metadataLabel}>Created:</Text>
                            <Text>{requirement.createdAt}</Text>
                            <Text className={styles.metadataLabel}>Updated:</Text>
                            <Text>{requirement.updatedAt}</Text>
                        </div>
                    </Card>
                </div>

                <div className={styles.sidebar}>
                    <Card>
                        <CardHeader
                            image={<WarningRegular />}
                            header={<Text weight="semibold">Linked Risks ({linkedRisks.length})</Text>}
                        />
                        <Divider />
                        {linkedRisks.length === 0 ? (
                            <Text size={200} style={{ padding: tokens.spacingVerticalM, color: tokens.colorNeutralForeground3 }}>
                                No risks linked yet. Use AI to generate risks.
                            </Text>
                        ) : (
                            linkedRisks.map(risk => (
                                <div key={risk.id} className={styles.linkedItem}>
                                    <Link href={`/risks/${risk.id}`}>
                                        <Text size={200} weight="semibold">{risk.id}</Text>
                                        <Text size={200} block>{risk.title}</Text>
                                    </Link>
                                    <Badge appearance="tint" color="warning" size="small">
                                        {risk.impact}x{risk.likelihood}
                                    </Badge>
                                </div>
                            ))
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}
