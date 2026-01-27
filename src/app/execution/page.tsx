'use client';

import {
    makeStyles,
    tokens,
    Card,
    Text,
    Button,
    Badge,
    useToastController,
    Toast,
    ToastTitle,
    ToastIntent,
} from '@fluentui/react-components';
import { SparkleRegular, AddRegular } from '@fluentui/react-icons';
import Link from 'next/link';
import { useState } from 'react';
import { controlActivities, controls } from '@/data/fixtures';
import { PageHeader, QuickActionsBar } from '@/components/atoms';
import { GlassCard } from '@/components/ui/GlassCard';

const useStyles = makeStyles({
    page: {
        padding: tokens.spacingHorizontalXXL,
        height: 'calc(100vh - 120px)',
        display: 'flex',
        flexDirection: 'column',
    },
    board: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: tokens.spacingHorizontalM,
        flex: 1,
        overflow: 'auto',
    },
    column: {
        backgroundColor: tokens.colorNeutralBackground2,
        borderRadius: tokens.borderRadiusMedium,
        padding: tokens.spacingVerticalS,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '400px',
    },
    columnHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: tokens.spacingVerticalS,
        marginBottom: tokens.spacingVerticalS,
    },
    columnTitle: {
        fontWeight: tokens.fontWeightSemibold,
    },
    columnCount: {
        backgroundColor: tokens.colorNeutralBackground1,
        borderRadius: '50%',
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: tokens.fontSizeBase200,
    },
    cardList: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalS,
    },
    activityCard: {
        padding: tokens.spacingVerticalM,
        cursor: 'pointer',
        '&:hover': {
            boxShadow: tokens.shadow8,
        },
    },
    cardTitle: {
        fontWeight: tokens.fontWeightSemibold,
        marginBottom: tokens.spacingVerticalXS,
    },
    cardMeta: {
        fontSize: tokens.fontSizeBase200,
        color: tokens.colorNeutralForeground3,
    },
});

const columns = [
    { id: 'todo', title: 'To Do', status: 'todo' },
    { id: 'in-progress', title: 'In Progress', status: 'in-progress' },
    { id: 'evidence-submitted', title: 'Evidence Submitted', status: 'evidence-submitted' },
    { id: 'review', title: 'Review', status: 'review' },
    { id: 'done', title: 'Done', status: 'done' },
];

export default function ExecutionPage() {
    const styles = useStyles();
    const [activities, setActivities] = useState(controlActivities);
    const { dispatchToast } = useToastController('global-toaster');

    const notify = (title: string, intent: ToastIntent = 'success') => {
        dispatchToast(
            <Toast>
                <ToastTitle>{title}</ToastTitle>
            </Toast>,
            { intent }
        );
    };

    const getActivitiesForColumn = (status: string) => {
        return activities.filter(a => a.status === status);
    };

    const getControlTitle = (controlId: string) => {
        return controls.find(c => c.id === controlId)?.title || controlId;
    };

    return (
        <div className={styles.page}>
            <PageHeader
                title="AI Action Center"
                description="Human-in-the-Loop Orchestration: Review, verify, and resolve compliance tasks escalated by the digital workforce."
            >
                <Button appearance="primary" icon={<AddRegular />} onClick={() => notify('New task creation is currently disabled.')}>Add Task</Button>
            </PageHeader>

            <QuickActionsBar>
                <Button size="small" appearance="subtle" onClick={() => notify('Tasks prioritized based on risk and effort.')}>Prioritize tasks</Button>
                <Button size="small" appearance="subtle" onClick={() => notify('3 overdue items flagged.')}>Flag overdue items</Button>
                <Button size="small" appearance="subtle" onClick={() => notify('AI suggested optimal assignments.')}>Suggest assignments</Button>
            </QuickActionsBar>

            <div className={styles.board}>
                {columns.map(column => {
                    const columnActivities = getActivitiesForColumn(column.status);
                    return (
                        <div key={column.id} className={styles.column}>
                            <div className={styles.columnHeader}>
                                <Text className={styles.columnTitle}>{column.title}</Text>
                                <span className={styles.columnCount}>{columnActivities.length}</span>
                            </div>
                            <div className={styles.cardList}>
                                {columnActivities.map((activity, idx) => (
                                    <Link key={activity.id} href={`/controls/${activity.controlId}`}>
                                        <GlassCard className={styles.activityCard}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                                <Text className={styles.cardTitle}>{activity.title}</Text>
                                                {activity.status !== 'done' && (
                                                    <Badge color="brand" appearance="tint" icon={<SparkleRegular />}>
                                                        {85 + (idx * 3) % 15}%
                                                    </Badge>
                                                )}
                                            </div>
                                            <Text className={styles.cardMeta} block>
                                                {getControlTitle(activity.controlId)}
                                            </Text>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: tokens.spacingVerticalS }}>
                                                <Text size={200}>Due: {activity.dueDate}</Text>
                                                <Badge appearance="tint" size="small">
                                                    {activity.assigneeId}
                                                </Badge>
                                            </div>
                                        </GlassCard>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
