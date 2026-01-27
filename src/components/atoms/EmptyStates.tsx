'use client';

import { makeStyles, tokens, Text, Button } from '@fluentui/react-components';
import {
    DocumentSearchRegular,
    BoxRegular,
    AddRegular,
    SparkleRegular,
    WarningRegular,
    CheckmarkCircleRegular,
    FolderOpenRegular,
    ClipboardTaskRegular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: tokens.spacingVerticalXXL,
        textAlign: 'center',
        minHeight: '300px',
        backgroundColor: tokens.colorNeutralBackground2,
        borderRadius: tokens.borderRadiusMedium,
    },
    icon: {
        fontSize: '64px',
        marginBottom: tokens.spacingVerticalL,
        color: tokens.colorNeutralForeground4,
    },
    title: {
        fontSize: tokens.fontSizeBase500,
        fontWeight: tokens.fontWeightSemibold,
        marginBottom: tokens.spacingVerticalS,
    },
    description: {
        color: tokens.colorNeutralForeground3,
        marginBottom: tokens.spacingVerticalL,
        maxWidth: '400px',
    },
    actions: {
        display: 'flex',
        gap: tokens.spacingHorizontalM,
    },
});

interface EmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    description: string;
    primaryAction?: { label: string; onClick: () => void };
    secondaryAction?: { label: string; onClick: () => void };
    aiAction?: { label: string; onClick: () => void };
}

export function EmptyState({
    icon,
    title,
    description,
    primaryAction,
    secondaryAction,
    aiAction,
}: EmptyStateProps) {
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <div className={styles.icon}>
                {icon || <BoxRegular />}
            </div>
            <Text className={styles.title}>{title}</Text>
            <Text className={styles.description}>{description}</Text>
            <div className={styles.actions}>
                {primaryAction && (
                    <Button appearance="primary" icon={<AddRegular />} onClick={primaryAction.onClick}>
                        {primaryAction.label}
                    </Button>
                )}
                {aiAction && (
                    <Button appearance="outline" icon={<SparkleRegular />} onClick={aiAction.onClick}>
                        {aiAction.label}
                    </Button>
                )}
                {secondaryAction && (
                    <Button appearance="subtle" onClick={secondaryAction.onClick}>
                        {secondaryAction.label}
                    </Button>
                )}
            </div>
        </div>
    );
}

export function NoRequirementsEmpty({ onAdd }: { onAdd: () => void }) {
    return (
        <EmptyState
            icon={<DocumentSearchRegular />}
            title="No Requirements Found"
            description="Start by adding your first regulatory requirement or use AI to import from a framework."
            primaryAction={{ label: 'Add Requirement', onClick: onAdd }}
            aiAction={{ label: 'Import from Framework', onClick: () => { } }}
        />
    );
}

export function NoRisksEmpty({ onAdd }: { onAdd: () => void }) {
    return (
        <EmptyState
            icon={<WarningRegular />}
            title="No Risks Identified"
            description="Add risks manually or let AI analyze your requirements to generate associated risks."
            primaryAction={{ label: 'Add Risk', onClick: onAdd }}
            aiAction={{ label: 'Generate from Requirements', onClick: () => { } }}
        />
    );
}

export function NoControlsEmpty({ onAdd }: { onAdd: () => void }) {
    return (
        <EmptyState
            icon={<CheckmarkCircleRegular />}
            title="No Controls Defined"
            description="Build your control library by adding controls or have AI suggest controls based on your risks."
            primaryAction={{ label: 'Add Control', onClick: onAdd }}
            aiAction={{ label: 'Suggest Controls', onClick: () => { } }}
        />
    );
}

export function NoEvidenceEmpty({ onUpload }: { onUpload: () => void }) {
    return (
        <EmptyState
            icon={<FolderOpenRegular />}
            title="No Evidence Uploaded"
            description="Upload evidence documents and AI will analyze and match them to your controls automatically."
            primaryAction={{ label: 'Upload Evidence', onClick: onUpload }}
        />
    );
}

export function NoTasksEmpty() {
    return (
        <EmptyState
            icon={<ClipboardTaskRegular />}
            title="All Caught Up!"
            description="There are no pending tasks. Great job keeping your compliance activities up to date."
        />
    );
}

export function NoSearchResultsEmpty({ query, onClear }: { query: string; onClear: () => void }) {
    return (
        <EmptyState
            icon={<DocumentSearchRegular />}
            title="No Results Found"
            description={`No items match "${query}". Try adjusting your search or filters.`}
            secondaryAction={{ label: 'Clear Search', onClick: onClear }}
        />
    );
}
