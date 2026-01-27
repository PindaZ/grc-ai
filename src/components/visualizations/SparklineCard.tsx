'use client';

import { Card, Text, makeStyles, tokens } from '@fluentui/react-components';
import { ArrowUpRightRegular, ArrowDownRightRegular } from '@fluentui/react-icons';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

const useStyles = makeStyles({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: tokens.spacingVerticalL,
        position: 'relative',
        overflow: 'hidden',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        zIndex: 1,
    },
    value: {
        fontSize: tokens.fontSizeHero700,
        fontWeight: tokens.fontWeightBold,
        lineHeight: 1,
        marginTop: tokens.spacingVerticalS,
    },
    trend: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: tokens.fontSizeBase200,
        fontWeight: tokens.fontWeightSemibold,
    },
    positive: { color: tokens.colorPaletteGreenForeground1 },
    negative: { color: tokens.colorPaletteRedForeground1 },
    chartContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60%',
        zIndex: 0,
        opacity: 0.5,
    }
});

interface SparklineCardProps {
    title: string;
    value: string | number;
    trend: number; // percentage change
    data: number[]; // Array of values for the line
    color?: string;
    icon?: React.ReactNode;
}

export const SparklineCard = ({ title, value, trend, data, color = '#0078d4', icon }: SparklineCardProps) => {
    const styles = useStyles();
    const chartData = data.map((val, i) => ({ i, val }));
    const isPositive = trend >= 0;

    return (
        <Card className={`${styles.card} glass-panel`}>
            <div className={styles.header}>
                <div>
                    <Text style={{ color: tokens.colorNeutralForeground3 }}>{title}</Text>
                    <div className={styles.value} style={{ color }}>{value}</div>
                </div>
                {icon && <div style={{ opacity: 0.7 }}>{icon}</div>}
            </div>

            <div className={`${styles.trend} ${isPositive ? styles.positive : styles.negative}`}>
                {isPositive ? <ArrowUpRightRegular /> : <ArrowDownRightRegular />}
                {Math.abs(trend)}% vs last month
            </div>

            <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <Line
                            type="monotone"
                            dataKey="val"
                            stroke={color}
                            strokeWidth={3}
                            dot={false}
                            isAnimationActive={true}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};
