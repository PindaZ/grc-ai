'use client';

import React from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import { motion } from 'framer-motion';

interface AnimatedChartProps {
    data: number[];
    color?: string;
    height?: number;
}

export const AnimatedChart: React.FC<AnimatedChartProps> = ({
    data,
    color = '#0078d4',
    height = 80
}) => {
    const chartData = data.map((val, i) => ({ i, val }));

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ width: '100%', height, position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 0 }}
        >
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                    <defs>
                        <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                    <Area
                        type="monotone"
                        dataKey="val"
                        stroke={color}
                        fill={`url(#gradient-${color})`}
                        strokeWidth={2}
                        isAnimationActive={true}
                        animationDuration={1500}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </motion.div>
    );
};
