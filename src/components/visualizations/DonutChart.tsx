'use client';

import { Card, Text, makeStyles, tokens } from '@fluentui/react-components';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const useStyles = makeStyles({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    centerText: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    percentage: {
        fontSize: tokens.fontSizeHero800,
        fontWeight: tokens.fontWeightBold,
        color: tokens.colorBrandForeground1,
    },
    label: {
        fontSize: tokens.fontSizeBase200,
        color: tokens.colorNeutralForeground3,
    }
});

interface DonutChartProps {
    value: number; // 0 to 100
    title: string;
}

export const DonutChart = ({ value, title }: DonutChartProps) => {
    const styles = useStyles();

    const data = [
        { name: 'Completed', value: value },
        { name: 'Remaining', value: 100 - value },
    ];

    const COLORS = [tokens.colorBrandBackground, tokens.colorNeutralStroke1];

    return (
        <Card className={`${styles.card} glass-panel`}>
            <Text weight="semibold" style={{ alignSelf: 'flex-start', marginBottom: tokens.spacingVerticalM }}>{title}</Text>

            <div style={{ width: '100%', height: '200px', position: 'relative' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            stroke="none"
                            dataKey="value"
                            startAngle={90}
                            endAngle={-270}
                            paddingAngle={5}
                            cornerRadius={10}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                <div className={styles.centerText}>
                    <span className={styles.percentage}>{value}%</span>
                    <span className={styles.label}>Score</span>
                </div>
            </div>
        </Card>
    );
};
