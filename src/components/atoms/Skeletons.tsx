'use client';

import { makeStyles, tokens, Skeleton, SkeletonItem } from '@fluentui/react-components';

const useStyles = makeStyles({
    card: {
        padding: tokens.spacingVerticalL,
        borderRadius: tokens.borderRadiusMedium,
        backgroundColor: tokens.colorNeutralBackground1,
        boxShadow: tokens.shadow4,
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalM,
    },
    row: {
        display: 'flex',
        gap: tokens.spacingHorizontalM,
        alignItems: 'center',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: tokens.spacingHorizontalL,
    },
    table: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalS,
    },
    tableRow: {
        display: 'grid',
        gridTemplateColumns: '100px 1fr 100px 100px',
        gap: tokens.spacingHorizontalM,
        padding: tokens.spacingVerticalS,
    },
});

export function CardSkeleton() {
    const styles = useStyles();
    return (
        <div className={styles.card}>
            <Skeleton>
                <SkeletonItem shape="rectangle" style={{ width: '60%', height: '24px' }} />
            </Skeleton>
            <Skeleton>
                <SkeletonItem shape="rectangle" style={{ width: '100%', height: '48px' }} />
            </Skeleton>
            <Skeleton>
                <SkeletonItem shape="rectangle" style={{ width: '40%', height: '16px' }} />
            </Skeleton>
        </div>
    );
}

export function DashboardWidgetSkeleton() {
    const styles = useStyles();
    return (
        <div className={styles.card}>
            <div className={styles.row}>
                <Skeleton>
                    <SkeletonItem shape="circle" size={40} />
                </Skeleton>
                <Skeleton>
                    <SkeletonItem shape="rectangle" style={{ width: '120px', height: '20px' }} />
                </Skeleton>
            </div>
            <Skeleton>
                <SkeletonItem shape="rectangle" style={{ width: '80px', height: '40px' }} />
            </Skeleton>
            <Skeleton>
                <SkeletonItem shape="rectangle" style={{ width: '100%', height: '8px' }} />
            </Skeleton>
        </div>
    );
}

export function DashboardSkeleton() {
    const styles = useStyles();
    return (
        <div className={styles.grid}>
            <DashboardWidgetSkeleton />
            <DashboardWidgetSkeleton />
            <DashboardWidgetSkeleton />
            <DashboardWidgetSkeleton />
        </div>
    );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
    const styles = useStyles();
    return (
        <div className={styles.table}>
            <div className={styles.tableRow} style={{ backgroundColor: tokens.colorNeutralBackground3 }}>
                <Skeleton><SkeletonItem style={{ height: '16px' }} /></Skeleton>
                <Skeleton><SkeletonItem style={{ height: '16px' }} /></Skeleton>
                <Skeleton><SkeletonItem style={{ height: '16px' }} /></Skeleton>
                <Skeleton><SkeletonItem style={{ height: '16px' }} /></Skeleton>
            </div>
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className={styles.tableRow}>
                    <Skeleton animation="pulse"><SkeletonItem style={{ height: '16px' }} /></Skeleton>
                    <Skeleton animation="pulse"><SkeletonItem style={{ height: '16px' }} /></Skeleton>
                    <Skeleton animation="pulse"><SkeletonItem style={{ height: '16px', width: '80px' }} /></Skeleton>
                    <Skeleton animation="pulse"><SkeletonItem style={{ height: '16px', width: '60px' }} /></Skeleton>
                </div>
            ))}
        </div>
    );
}

export function DetailPageSkeleton() {
    const styles = useStyles();
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalL }}>
            <div className={styles.row}>
                <Skeleton>
                    <SkeletonItem shape="rectangle" style={{ width: '100px', height: '24px' }} />
                </Skeleton>
            </div>
            <Skeleton>
                <SkeletonItem shape="rectangle" style={{ width: '300px', height: '32px' }} />
            </Skeleton>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: tokens.spacingHorizontalXXL }}>
                <CardSkeleton />
                <CardSkeleton />
            </div>
        </div>
    );
}

export function KanbanSkeleton() {
    const styles = useStyles();
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: tokens.spacingHorizontalM }}>
            {Array.from({ length: 5 }).map((_, col) => (
                <div key={col} style={{
                    backgroundColor: tokens.colorNeutralBackground2,
                    borderRadius: tokens.borderRadiusMedium,
                    padding: tokens.spacingVerticalS,
                    minHeight: '400px'
                }}>
                    <Skeleton>
                        <SkeletonItem style={{ height: '24px', marginBottom: tokens.spacingVerticalM }} />
                    </Skeleton>
                    {Array.from({ length: 3 - col % 2 }).map((_, row) => (
                        <div key={row} className={styles.card} style={{ marginBottom: tokens.spacingVerticalS }}>
                            <Skeleton animation="pulse">
                                <SkeletonItem style={{ height: '16px', width: '80%' }} />
                            </Skeleton>
                            <Skeleton animation="pulse">
                                <SkeletonItem style={{ height: '12px', width: '60%' }} />
                            </Skeleton>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
