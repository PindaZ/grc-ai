'use client';

import { makeStyles, tokens, Text, Button, MessageBar, MessageBarBody, MessageBarActions, Badge } from '@fluentui/react-components';
import { SparkleRegular, DismissRegular, ArrowRightRegular } from '@fluentui/react-icons';
import Link from 'next/link';

const useStyles = makeStyles({
    banner: {
        background: 'rgba(0, 112, 173, 0.08)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(23, 171, 218, 0.25)',
        borderRadius: '16px',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '24px',
        boxShadow: '0 8px 32px rgba(0, 70, 103, 0.15)',
        position: 'relative',
        overflow: 'hidden',
        '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.03), transparent)',
            zIndex: 0,
            pointerEvents: 'none',
        }
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        position: 'relative',
        zIndex: 1,
    },
    icon: {
        fontSize: '28px',
        color: '#17ABDA',
        filter: 'drop-shadow(0 0 8px rgba(23, 171, 218, 0.4))',
    },
    text: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
    },
    badges: {
        display: 'flex',
        gap: '8px',
        marginLeft: '20px',
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        position: 'relative',
        zIndex: 1,
    },
    reviewBtn: {
        background: 'var(--brand-blue)',
        color: 'white',
        fontWeight: '600',
        borderRadius: '12px',
        '&:hover': {
            background: 'var(--brand-dark)',
            transform: 'scale(1.02)',
        }
    }
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
                    <Button className={styles.reviewBtn} icon={<ArrowRightRegular />} iconPosition="after">
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
                    <Button className={styles.reviewBtn} icon={<ArrowRightRegular />} iconPosition="after">
                        Review All
                    </Button>
                </Link>
            </div>
        </div>
    );
}
