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
    ShieldCheckmarkRegular,
    DocumentTextRegular,
} from '@fluentui/react-icons';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { risks, controls as allControls, requirements } from '@/data/fixtures';

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
    sectionTitle: {
        fontSize: tokens.fontSizeBase400,
        fontWeight: tokens.fontWeightSemibold,
        marginBottom: tokens.spacingVerticalM,
    },
    scoreWidget: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: tokens.spacingHorizontalM,
        textAlign: 'center',
        padding: tokens.spacingVerticalM,
    },
    scoreValue: {
        fontSize: tokens.fontSizeHero800,
        fontWeight: tokens.fontWeightBold,
    },
    scoreLabel: {
        fontSize: tokens.fontSizeBase200,
        color: tokens.colorNeutralForeground3,
    },
    linkedItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: tokens.spacingVerticalS,
        borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    },
    dialogContent: {
        minWidth: '500px',
    },
    suggestionItem: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: tokens.spacingHorizontalM,
        padding: tokens.spacingVerticalM,
        backgroundColor: tokens.colorNeutralBackground2,
        borderRadius: tokens.borderRadiusMedium,
        marginBottom: tokens.spacingVerticalS,
    },
    loadingContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: tokens.spacingVerticalXXL,
        gap: tokens.spacingHorizontalM,
    },
});

const mockSuggestedControls = [
    { id: 'sug-1', title: 'Access Control Policy', description: 'Implement comprehensive access control policy' },
    { id: 'sug-2', title: 'Privileged Access Management', description: 'Deploy PAM solution for privileged accounts' },
    { id: 'sug-3', title: 'User Access Review', description: 'Quarterly review of user access rights' },
];

export default function RiskDetailPage() {
    const styles = useStyles();
    const params = useParams();
    const [isGenerating, setIsGenerating] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);

    const risk = risks.find(r => r.id === params.id);
    const linkedControls = allControls.filter(c => risk?.linkedControlIds.includes(c.id));
    const linkedReqs = requirements.filter(r => risk?.linkedRequirementIds.includes(r.id));

    const handleSuggest = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            setShowResults(true);
            setSelected(mockSuggestedControls.map(c => c.id));
        }, 2000);
    };

    if (!risk) {
        return <div className={styles.page}><Text>Risk not found</Text></div>;
    }

    const score = risk.impact * risk.likelihood;
    const scoreColor = score >= 16 ? 'danger' : score >= 9 ? 'warning' : 'success';

    return (
        <div className={styles.page}>
            <Link href="/risks" className={styles.backLink}>
                <ArrowLeftRegular /> Back to Risks
            </Link>

            <div className={styles.header}>
                <div className={styles.titleSection}>
                    <Text className={styles.title}>{risk.id}: {risk.title}</Text>
                    <Badge appearance="filled" color={scoreColor} style={{ textTransform: 'capitalize', width: 'fit-content' }}>
                        {risk.status}
                    </Badge>
                </div>
                <div className={styles.actions}>
                    <Dialog>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="primary" icon={<SparkleRegular />} onClick={handleSuggest}>
                                Suggest Controls
                            </Button>
                        </DialogTrigger>
                        <DialogSurface className={styles.dialogContent}>
                            <DialogBody>
                                <DialogTitle>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS }}>
                                        <SparkleRegular style={{ color: tokens.colorBrandForeground1 }} />
                                        AI Control Suggestions
                                    </span>
                                </DialogTitle>
                                <DialogContent>
                                    {isGenerating && (
                                        <div className={styles.loadingContainer}>
                                            <Spinner size="medium" />
                                            <Text>Analyzing risk and suggesting controls...</Text>
                                        </div>
                                    )}
                                    {showResults && mockSuggestedControls.map(ctrl => (
                                        <div key={ctrl.id} className={styles.suggestionItem}>
                                            <Checkbox
                                                checked={selected.includes(ctrl.id)}
                                                onChange={(_, d) => setSelected(d.checked ? [...selected, ctrl.id] : selected.filter(id => id !== ctrl.id))}
                                            />
                                            <div>
                                                <Text weight="semibold" block>{ctrl.title}</Text>
                                                <Text size={200}>{ctrl.description}</Text>
                                            </div>
                                        </div>
                                    ))}
                                </DialogContent>
                                <DialogActions>
                                    <DialogTrigger disableButtonEnhancement>
                                        <Button appearance="secondary">Cancel</Button>
                                    </DialogTrigger>
                                    {showResults && (
                                        <Button appearance="primary" icon={<CheckmarkRegular />}>
                                            Create {selected.length} Controls
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
                        <Text className={styles.sectionTitle}>Risk Score</Text>
                        <div className={styles.scoreWidget}>
                            <div>
                                <Text className={styles.scoreValue}>{risk.impact}</Text>
                                <Text className={styles.scoreLabel} block>Impact</Text>
                            </div>
                            <div>
                                <Text className={styles.scoreValue}>×</Text>
                            </div>
                            <div>
                                <Text className={styles.scoreValue}>{risk.likelihood}</Text>
                                <Text className={styles.scoreLabel} block>Likelihood</Text>
                            </div>
                        </div>
                        <Divider />
                        <div style={{ textAlign: 'center', padding: tokens.spacingVerticalM }}>
                            <Badge appearance="filled" color={scoreColor} size="large">
                                Score: {score}
                            </Badge>
                        </div>
                    </Card>

                    <Card>
                        <Text className={styles.sectionTitle}>Description</Text>
                        <Text>{risk.description}</Text>
                    </Card>
                </div>

                <div className={styles.sidebar}>
                    <Card>
                        <CardHeader
                            image={<DocumentTextRegular />}
                            header={<Text weight="semibold">Source Requirements ({linkedReqs.length})</Text>}
                        />
                        <Divider />
                        {linkedReqs.map(req => (
                            <div key={req.id} className={styles.linkedItem}>
                                <Link href={`/requirements/${req.id}`}>
                                    <Text size={200} weight="semibold">{req.id}</Text>
                                    <Text size={200} block>{req.title}</Text>
                                </Link>
                            </div>
                        ))}
                    </Card>

                    <Card>
                        <CardHeader
                            image={<ShieldCheckmarkRegular />}
                            header={<Text weight="semibold">Linked Controls ({linkedControls.length})</Text>}
                        />
                        <Divider />
                        {linkedControls.length === 0 ? (
                            <Text size={200} style={{ padding: tokens.spacingVerticalM, color: tokens.colorNeutralForeground3 }}>
                                No controls linked. Use AI to suggest controls.
                            </Text>
                        ) : linkedControls.map(ctrl => (
                            <div key={ctrl.id} className={styles.linkedItem}>
                                <Link href={`/controls/${ctrl.id}`}>
                                    <Text size={200} weight="semibold">{ctrl.id}</Text>
                                    <Text size={200} block>{ctrl.title}</Text>
                                </Link>
                            </div>
                        ))}
                    </Card>
                </div>
            </div>
        </div>
    );
}
