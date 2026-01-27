'use client';

import { makeStyles, tokens, Text, Tooltip } from '@fluentui/react-components';
import { Risk } from '@/types';
import { motion } from 'framer-motion';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalS,
        padding: tokens.spacingVerticalM,
        height: '100%',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '30px repeat(5, 1fr)',
        gridTemplateRows: 'repeat(5, 1fr) 30px',
        gap: '4px',
        flex: 1,
        minHeight: '300px',
    },
    cell: {
        borderRadius: tokens.borderRadiusSmall,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: tokens.fontSizeBase200,
        fontWeight: tokens.fontWeightBold,
        cursor: 'pointer',
        position: 'relative',
        transition: 'transform 0.2s',
        ':hover': {
            transform: 'scale(1.05)',
            zIndex: 1,
            boxShadow: tokens.shadow8,
        }
    },
    yLabel: {
        gridColumn: '1 / 2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        writingMode: 'vertical-rl',
        transform: 'rotate(180deg)',
        fontSize: tokens.fontSizeBase200,
        color: tokens.colorNeutralForeground3,
    },
    xLabel: {
        gridRow: '6 / 7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: tokens.fontSizeBase200,
        color: tokens.colorNeutralForeground3,
    },
    count: {
        color: 'white',
        textShadow: '0 1px 2px rgba(0,0,0,0.3)',
    }
});

interface RiskHeatmapProps {
    risks: Risk[];
}

// 5x5 Matrix colors (approximate standard risk colors)
const getCellColor = (impact: number, likelihood: number) => {
    const score = impact * likelihood;
    if (score >= 20) return '#d13438'; // Critical (Red)
    if (score >= 12) return '#ffaa44'; // High (Orange)
    if (score >= 6) return '#fce100'; // Medium (Yellow)
    return '#6bb700'; // Low (Green)
};

export const RiskHeatmap = ({ risks }: RiskHeatmapProps) => {
    const styles = useStyles();

    // Group risks by coordinates
    const matrix: Record<string, number> = {};
    risks.forEach(r => {
        const key = `${r.impact}-${r.likelihood}`; // Impact (x), Likelihood (y)
        matrix[key] = (matrix[key] || 0) + 1;
    });

    return (
        <div className={styles.container}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text weight="semibold">Risk Distribution</Text>
                <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>{risks.length} Risks Evaluated</Text>
            </div>

            <div className={styles.grid}>
                {/* Y Axis Label */}
                <div className={styles.yLabel} style={{ gridRow: '1 / 6' }}>Likelihood</div>

                {/* Grid Cells (5x5 inverted Y because likelihood 5 is top) */}
                {[5, 4, 3, 2, 1].map((y) => (
                    <>
                        <div key={`label-y-${y}`} style={{ gridColumn: 1, gridRow: 6 - y, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>{y}</div>
                        {[1, 2, 3, 4, 5].map((x) => {
                            const count = matrix[`${x}-${y}`] || 0;
                            return (
                                <motion.div
                                    key={`${x}-${y}`}
                                    className={styles.cell}
                                    style={{
                                        gridColumn: x + 1,
                                        gridRow: 6 - y,
                                        backgroundColor: getCellColor(x, y),
                                        opacity: count > 0 ? 1 : 0.3, // Dim empty cells
                                    }}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: count > 0 ? 1 : 0.3, scale: 1 }}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    {count > 0 && (
                                        <Tooltip content={`${count} risks (Impact ${x}, Likelihood ${y})`} relationship="description">
                                            <span className={styles.count}>{count}</span>
                                        </Tooltip>
                                    )}
                                </motion.div>
                            );
                        })}
                    </>
                ))}

                {/* X Axis Labels */}
                <div style={{ gridColumn: '2 / 7', gridRow: 6, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
                    {[1, 2, 3, 4, 5].map(x => (
                        <div key={`label-x-${x}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>{x}</div>
                    ))}
                </div>

                <div className={styles.xLabel} style={{ gridColumn: '2 / 7' }}>Impact</div>
            </div>
        </div>
    );
};
