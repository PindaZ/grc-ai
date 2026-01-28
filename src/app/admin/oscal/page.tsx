'use client';

import { useState } from 'react';
import {
    makeStyles,
    tokens,
    Button,
    Text,
    Card,
    Input,
    ProgressBar,
    Table,
    TableHeader,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Badge,
    Spinner,
    useToastController,
    Toast,
    ToastTitle,
    ToastIntent,
} from '@fluentui/react-components';
import { ArrowDownloadRegular, CheckmarkCircleRegular, ErrorCircleRegular } from '@fluentui/react-icons';
import { OSCALImporter } from '@/lib/oscal/importer';
import { Control } from '@/types';
import { PageHeader } from '@/components/atoms';
import { GlassCard } from '@/components/ui/GlassCard';

const useStyles = makeStyles({
    page: {
        padding: tokens.spacingHorizontalXXL,
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalL,
        maxWidth: '1200px',
        margin: '0 auto',
    },
    inputGroup: {
        display: 'flex',
        gap: tokens.spacingHorizontalM,
        alignItems: 'center',
        marginBottom: tokens.spacingVerticalM,
    },
    resultsContainer: {
        marginTop: tokens.spacingVerticalXL,
    },
    stats: {
        display: 'flex',
        gap: tokens.spacingHorizontalXL,
        marginBottom: tokens.spacingVerticalM,
    },
});

const DEFAULT_URL = 'https://raw.githubusercontent.com/usnistgov/oscal-content/main/nist.gov/SP800-53/rev5/json/NIST_SP-800-53_rev5_catalog.json';

export default function OscalAdminPage() {
    const styles = useStyles();
    const [url, setUrl] = useState(DEFAULT_URL);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [importedControls, setImportedControls] = useState<Control[]>([]);
    const { dispatchToast } = useToastController('global-toaster');

    const notify = (title: string, intent: ToastIntent = 'success') => {
        dispatchToast(
            <Toast>
                <ToastTitle>{title}</ToastTitle>
            </Toast>,
            { intent }
        );
    };

    const handleImport = async () => {
        setLoading(true);
        setProgress(0.1);
        try {
            const importer = new OSCALImporter();
            notify('Fetching OSCAL Catalog...', 'info');
            const catalog = await importer.fetchCatalog(url);

            setProgress(0.5);
            notify('Parsing and transforming controls...', 'info');
            const controls = importer.transform(catalog);

            setImportedControls(controls);
            setProgress(1);
            notify(`Successfully imported ${controls.length} controls!`);
        } catch (error) {
            console.error(error);
            notify('Failed to import OSCAL catalog.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handlePersist = async () => {
        setLoading(true);
        try {
            notify('Persisting controls to database...', 'info');
            const response = await fetch('/api/oscal/import', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ controls: importedControls }),
            });

            if (!response.ok) throw new Error('Failed to persist');

            notify(`Successfully saved ${importedControls.length} controls!`);
        } catch (error) {
            console.error(error);
            notify('Failed to save controls to database.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <PageHeader
                    title="OSCAL Integration (PoC)"
                    description="Standardized compliance orchestration using NIST's Open Security Controls Assessment Language."
                />

                <GlassCard>
                    <div style={{ padding: '20px' }}>
                        <Text weight="semibold" size={400} block style={{ marginBottom: '16px' }}>
                            Import Catalog baseline
                        </Text>
                        <div className={styles.inputGroup}>
                            <Input
                                value={url}
                                onChange={(e, data) => setUrl(data.value)}
                                style={{ flexGrow: 1 }}
                                placeholder="OSCAL Catalog JSON URL"
                            />
                            <Button
                                appearance="primary"
                                icon={loading ? <Spinner size="tiny" /> : <ArrowDownloadRegular />}
                                onClick={handleImport}
                                disabled={loading}
                            >
                                Import controls
                            </Button>
                        </div>
                        {loading && <ProgressBar value={progress} color="brand" />}
                    </div>
                </GlassCard>

                {importedControls.length > 0 && (
                    <div className={styles.resultsContainer}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <div className={styles.stats} style={{ marginBottom: 0 }}>
                                <Card style={{ padding: '16px', flex: 1, minWidth: '150px' }}>
                                    <Text size={600} weight="bold">{importedControls.length}</Text>
                                    <Text size={200} block>Controls Identified</Text>
                                </Card>
                                <Card style={{ padding: '16px', flex: 1, minWidth: '150px' }}>
                                    <Text size={600} weight="bold">NIST 800-53</Text>
                                    <Text size={200} block>Catalog Source</Text>
                                </Card>
                            </div>
                            <Button
                                appearance="primary"
                                size="large"
                                icon={loading ? <Spinner size="tiny" /> : <CheckmarkCircleRegular />}
                                onClick={handlePersist}
                                disabled={loading}
                            >
                                Persist {importedControls.length} Controls to DB
                            </Button>
                        </div>

                        <GlassCard style={{ padding: '0 8px' }}>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHeaderCell style={{ fontWeight: 'bold' }}>ID</TableHeaderCell>
                                        <TableHeaderCell style={{ fontWeight: 'bold' }}>Title</TableHeaderCell>
                                        <TableHeaderCell style={{ fontWeight: 'bold' }}>Description Snippet</TableHeaderCell>
                                        <TableHeaderCell style={{ fontWeight: 'bold' }}>Mapping Quality</TableHeaderCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {importedControls.slice(0, 20).map((control) => (
                                        <TableRow key={control.id}>
                                            <TableCell>
                                                <Text weight="semibold">{control.id}</Text>
                                            </TableCell>
                                            <TableCell>{control.title}</TableCell>
                                            <TableCell>
                                                <Text size={200} italic style={{ color: tokens.colorNeutralForeground4 }}>
                                                    {control.description.substring(0, 100)}...
                                                </Text>
                                            </TableCell>
                                            <TableCell>
                                                <Badge appearance="tint" color="success" icon={<CheckmarkCircleRegular />}>
                                                    High
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div style={{ padding: '16px', textAlign: 'center' }}>
                                <Text size={200} italic>Showing first 20 controls. In a production MVP, these would be persisted to the database.</Text>
                            </div>
                        </GlassCard>
                    </div>
                )}
            </div>
        </div>
    );
}
