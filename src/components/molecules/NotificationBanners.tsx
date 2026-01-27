'use client';

import { makeStyles, tokens, Text, Button, MessageBar, MessageBarBody, MessageBarActions, MessageBarTitle } from '@fluentui/react-components';
import { SparkleRegular, DismissRegular, InfoRegular, WarningRegular, ErrorCircleRegular, CheckmarkCircleRegular, EyeRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
    banner: {
        marginBottom: tokens.spacingVerticalM,
    },
    aiBanner: {
        backgroundColor: tokens.colorBrandBackground2,
        border: `1px solid ${tokens.colorBrandForeground1}`,
        marginBottom: tokens.spacingVerticalM,
    },
    aiBannerIcon: {
        color: tokens.colorBrandForeground1,
    },
});

interface NotificationBannerProps {
    intent?: 'info' | 'warning' | 'error' | 'success';
    title: string;
    message: string;
    onDismiss?: () => void;
    action?: { label: string; onClick: () => void };
}

export function NotificationBanner({
    intent = 'info',
    title,
    message,
    onDismiss,
    action,
}: NotificationBannerProps) {
    const styles = useStyles();

    const icon = {
        info: <InfoRegular />,
        warning: <WarningRegular />,
        error: <ErrorCircleRegular />,
        success: <CheckmarkCircleRegular />,
    }[intent];

    return (
        <MessageBar className={styles.banner} intent={intent} icon={icon}>
            <MessageBarBody>
                <MessageBarTitle>{title}</MessageBarTitle>
                {message}
            </MessageBarBody>
            <MessageBarActions containerAction={onDismiss ? <Button appearance="transparent" icon={<DismissRegular />} onClick={onDismiss} /> : undefined}>
                {action && (
                    <Button appearance="primary" size="small" onClick={action.onClick}>
                        {action.label}
                    </Button>
                )}
            </MessageBarActions>
        </MessageBar>
    );
}

interface AIInsightBannerProps {
    message: string;
    count?: number;
    onAction: () => void;
    onDismiss: () => void;
    actionLabel?: string;
}

export function AIInsightBanner({
    message,
    count,
    onAction,
    onDismiss,
    actionLabel = 'Review',
}: AIInsightBannerProps) {
    const styles = useStyles();

    return (
        <MessageBar className={styles.aiBanner} intent="info" layout="multiline" icon={<SparkleRegular className={styles.aiBannerIcon} />}>
            <MessageBarBody>
                <MessageBarTitle>AI Insight</MessageBarTitle>
                {message}
                {count !== undefined && (
                    <Text weight="semibold"> ({count} items)</Text>
                )}
            </MessageBarBody>
            <MessageBarActions
                containerAction={onDismiss ? <Button appearance="transparent" icon={<DismissRegular />} onClick={onDismiss} /> : undefined}
            >
                <Button appearance="primary" size="small" onClick={onAction}>
                    {actionLabel}
                </Button>
            </MessageBarActions>
        </MessageBar>
    );
}

export function MissingEvidenceBanner({ count, onReview }: { count: number; onReview: () => void }) {
    return (
        <AIInsightBanner
            message="AI detected controls missing required evidence"
            count={count}
            onAction={onReview}
            onDismiss={() => { }}
            actionLabel="Review Controls"
        />
    );
}

export function OverdueTasksBanner({ count, onReview }: { count: number; onReview: () => void }) {
    return (
        <NotificationBanner
            intent="warning"
            title="Overdue Tasks"
            message={`${count} control activities are past their due date.`}
            action={{ label: 'View Tasks', onClick: onReview }}
        />
    );
}

export function ComplianceRiskBanner({ riskLevel }: { riskLevel: 'high' | 'medium' }) {
    return (
        <NotificationBanner
            intent={riskLevel === 'high' ? 'error' : 'warning'}
            title={`${riskLevel === 'high' ? 'High' : 'Medium'} Compliance Risk Detected`}
            message={riskLevel === 'high'
                ? 'Critical controls have failed testing or are missing evidence.'
                : 'Some controls may need attention before the next audit cycle.'
            }
            action={{ label: 'View Details', onClick: () => { } }}
        />
    );
}
