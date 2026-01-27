'use client';

import { makeStyles, tokens, Badge, Text, Tooltip } from '@fluentui/react-components';
import { SparkleRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
    container: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: tokens.spacingHorizontalXS,
        padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalS}`,
        backgroundColor: tokens.colorBrandBackground2,
        borderRadius: tokens.borderRadiusSmall,
        color: tokens.colorBrandForeground1,
        fontSize: tokens.fontSizeBase200,
    },
    icon: {
        fontSize: '12px',
    },
});

interface SkillLoadedBadgeProps {
    skillName: string;
    compact?: boolean;
}

export function SkillLoadedBadge({ skillName, compact = false }: SkillLoadedBadgeProps) {
    const styles = useStyles();

    if (compact) {
        return (
            <Tooltip content={`AI Skill: ${skillName}`} relationship="label">
                <span className={styles.container}>
                    <SparkleRegular className={styles.icon} />
                </span>
            </Tooltip>
        );
    }

    return (
        <span className={styles.container}>
            <SparkleRegular className={styles.icon} />
            <Text size={200}>{skillName}</Text>
        </span>
    );
}

interface StatusBadgeProps {
    status: string;
    size?: 'small' | 'medium' | 'large';
}

const statusColors: Record<string, 'success' | 'warning' | 'danger' | 'informative' | 'important' | 'subtle'> = {
    active: 'success',
    completed: 'success',
    done: 'success',
    accepted: 'success',
    approved: 'success',
    pending: 'warning',
    'in-progress': 'warning',
    'evidence-submitted': 'informative',
    review: 'informative',
    draft: 'subtle',
    todo: 'subtle',
    failed: 'danger',
    rejected: 'danger',
    overdue: 'danger',
    high: 'danger',
    medium: 'warning',
    low: 'success',
};

export function StatusBadge({ status, size = 'medium' }: StatusBadgeProps) {
    const normalizedStatus = status.toLowerCase();
    const color = statusColors[normalizedStatus] || 'subtle';

    return (
        <Badge appearance="filled" color={color} size={size} style={{ textTransform: 'capitalize' }}>
            {status.replace(/-/g, ' ')}
        </Badge>
    );
}

interface RiskScoreBadgeProps {
    impact: number;
    likelihood: number;
    showBreakdown?: boolean;
}

export function RiskScoreBadge({ impact, likelihood, showBreakdown = false }: RiskScoreBadgeProps) {
    const score = impact * likelihood;
    const color = score >= 16 ? 'danger' : score >= 9 ? 'warning' : 'success';

    if (showBreakdown) {
        return (
            <Tooltip
                content={`Impact: ${impact} × Likelihood: ${likelihood}`}
                relationship="label"
            >
                <Badge appearance="filled" color={color}>
                    {score}
                </Badge>
            </Tooltip>
        );
    }

    return (
        <Badge appearance="filled" color={color}>
            {score}
        </Badge>
    );
}

interface CompletenessScoreBadgeProps {
    score: number;
}

export function CompletenessScoreBadge({ score }: CompletenessScoreBadgeProps) {
    const color = score >= 90 ? 'success' : score >= 70 ? 'warning' : 'danger';

    return (
        <Badge appearance="filled" color={color}>
            {score}%
        </Badge>
    );
}
