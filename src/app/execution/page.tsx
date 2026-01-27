'use client';

import {
    makeStyles,
    tokens,
    Card,
    Text,
    Button,
    Badge,
} from '@fluentui/react-components';
import { SparkleRegular, AddRegular } from '@fluentui/react-icons';
import Link from 'next/link';
import { useState } from 'react';
import { controlActivities, controls } from '@/data/fixtures';

const useStyles = makeStyles({
    page: {
        padding: tokens.spacingHorizontalXXL,
        height: 'calc(100vh - 120px)',
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: tokens.spacingVerticalL,
    },
    title: {
        fontSize: tokens.fontSizeHero700,
        fontWeight: tokens.fontWeightSemibold,
    },
    quickActions: {
        display: 'flex',
        gap: tokens.spacingHorizontalS,
        padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
        backgroundColor: tokens.colorNeutralBackground2,
        borderRadius: tokens.borderRadiusMedium,
        marginBottom: tokens.spacingVerticalL,
        alignItems: 'center',
    },
    quickActionsLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacingHorizontalXS,
        color: tokens.colorNeutralForeground3,
        fontSize: tokens.fontSizeBase200,
        marginRight: tokens.spacingHorizontalM,
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

    const getActivitiesForColumn = (status: string) => {
        return activities.filter(a => a.status === status);
    };

    const getControlTitle = (controlId: string) => {
        return controls.find(c => c.id === controlId)?.title || controlId;
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <Text className={styles.title}>Control Execution</Text>
                <Button appearance="primary" icon={<AddRegular />}>Add Activity</Button>
            </div>

            <div className={styles.quickActions}>
                <span className={styles.quickActionsLabel}>
                    <SparkleRegular /> AI Actions:
                </span>
                <Button size="small" appearance="subtle">Prioritize tasks</Button>
                <Button size="small" appearance="subtle">Flag overdue items</Button>
                <Button size="small" appearance="subtle">Suggest assignments</Button>
            </div>

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
                                {columnActivities.map(activity => (
                                    <Link key={activity.id} href={`/controls/${activity.controlId}`}>
                                        <Card className={styles.activityCard}>
                                            <Text className={styles.cardTitle}>{activity.title}</Text>
                                            <Text className={styles.cardMeta} block>
                                                {getControlTitle(activity.controlId)}
                                            </Text>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: tokens.spacingVerticalS }}>
                                                <Text size={200}>Due: {activity.dueDate}</Text>
                                                <Badge appearance="tint" size="small">
                                                    {activity.assigneeId}
                                                </Badge>
                                            </div>
                                        </Card>
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
