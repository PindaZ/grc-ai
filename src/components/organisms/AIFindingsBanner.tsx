'use client';

import { makeStyles, tokens, Text, Button, MessageBar, MessageBarBody, MessageBarActions, Badge } from '@fluentui/react-components';
import { SparkleRegular, DismissRegular, ArrowRightRegular } from '@fluentui/react-icons';
import Link from 'next/link';

const useStyles = makeStyles({
    banner: {
        backgroundColor: tokens.colorBrandBackground2,
        border: `1px solid ${tokens.colorBrandStroke1}`,
        borderRadius: tokens.borderRadiusMedium,
        padding: tokens.spacingVerticalM,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: tokens.spacingVerticalM,
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacingHorizontalM,
    },
    icon: {
        fontSize: '24px',
        color: tokens.colorBrandForeground1,
    },
    text: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalXXS,
    },
    badges: {
        display: 'flex',
        gap: tokens.spacingHorizontalXS,
        marginLeft: tokens.spacingHorizontalM,
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacingHorizontalS,
    },
});

interface AIFindingsBannerProps {
    skillName: string;
    findingsCount: number;
    highCount?: number;
    mediumCount?: number;
    lowCount?: number;
    reviewPath: string;
    onDismiss?: () => void;
}

export function AIFindingsBanner({
    skillName,
    findingsCount,
    highCount = 0,
    mediumCount = 0,
    lowCount = 0,
    reviewPath,
    onDismiss,
}: AIFindingsBannerProps) {
    const styles = useStyles();

    return (
        <div className={styles.banner}>
            <div className={styles.content}>
                <SparkleRegular className={styles.icon} />
                <div className={styles.text}>
                    <Text weight="semibold">{skillName}</Text>
                    <Text size={200}>Found {findingsCount} items requiring review</Text>
                </div>
                <div className={styles.badges}>
                    {highCount > 0 && (
                        <Badge color="danger" size="small">{highCount} High</Badge>
                    )}
                    {mediumCount > 0 && (
                        <Badge color="warning" size="small">{mediumCount} Medium</Badge>
                    )}
                    {lowCount > 0 && (
                        <Badge color="success" size="small">{lowCount} Low</Badge>
                    )}
                </div>
            </div>
            <div className={styles.actions}>
                <Link href={reviewPath}>
                    <Button appearance="primary" icon={<ArrowRightRegular />} iconPosition="after">
                        Review Now
                    </Button>
                </Link>
                {onDismiss && (
                    <Button appearance="transparent" icon={<DismissRegular />} onClick={onDismiss} />
                )}
            </div>
        </div>
    );
}

interface MultiSkillFindingsSummaryProps {
    findings: Array<{
        skillName: string;
        count: number;
        highCount: number;
        path: string;
    }>;
}

export function MultiSkillFindingsSummary({ findings }: MultiSkillFindingsSummaryProps) {
    const styles = useStyles();
    const totalFindings = findings.reduce((sum, f) => sum + f.count, 0);
    const totalHigh = findings.reduce((sum, f) => sum + f.highCount, 0);

    return (
        <div className={styles.banner}>
            <div className={styles.content}>
                <SparkleRegular className={styles.icon} />
                <div className={styles.text}>
                    <Text weight="semibold">AI Automation Findings</Text>
                    <Text size={200}>
                        {totalFindings} items across {findings.length} skills need your attention
                    </Text>
                </div>
                {totalHigh > 0 && (
                    <Badge color="danger" size="small">{totalHigh} High Priority</Badge>
                )}
            </div>
            <div className={styles.actions}>
                <Link href="/automation?tab=findings">
                    <Button appearance="primary" icon={<ArrowRightRegular />} iconPosition="after">
                        Review All
                    </Button>
                </Link>
            </div>
        </div>
    );
}
