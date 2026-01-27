'use client';

import { makeStyles, tokens, Text, Divider } from '@fluentui/react-components';
import { ExceptionReviewTable } from '@/components/organisms/ExceptionReviewTable';
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs';
import { uarFindings, controlSkills } from '@/data/aiFindings';

import { PageHeader } from '@/components/atoms';

const useStyles = makeStyles({
    page: {
        padding: tokens.spacingHorizontalXL,
        maxWidth: '1400px',
    },
});

export default function UARReviewPage() {
    const styles = useStyles();
    const uarSkill = controlSkills.find(s => s.id === 'skill-uar');

    const handleAccept = (ids: string[]) => {
        console.log('Accepted findings:', ids);
        // In production: call API to mark as resolved, trigger remediation workflow
    };

    const handleReject = (ids: string[]) => {
        console.log('Rejected findings:', ids);
        // In production: call API to dismiss with reason
    };

    const handleInvestigate = (id: string) => {
        console.log('Investigating finding:', id);
        // In production: open investigation drawer or navigate to detail
    };

    return (
        <div className={styles.page}>
            <Breadcrumbs />

            <PageHeader
                title="User Access Review"
                description="Identity Governance: AI automatically compared HR system data with IAM permissions. Review the findings below to approve remediation actions or dismiss false positives."
            />

            <Divider style={{ marginBottom: tokens.spacingVerticalL }} />

            <ExceptionReviewTable
                findings={uarFindings}
                skillName={uarSkill?.name || 'User Access Review'}
                lastRunTime={uarSkill?.lastRun}
                onAccept={handleAccept}
                onReject={handleReject}
                onInvestigate={handleInvestigate}
            />
        </div>
    );
}
