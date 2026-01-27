'use client';

import { makeStyles, tokens, Text, Button, Table, TableHeader, TableRow, TableHeaderCell, TableBody, TableCell, Badge } from '@fluentui/react-components';
import { SparkleRegular, CheckmarkCircleRegular, InfoRegular } from '@fluentui/react-icons';
import { motion } from 'framer-motion';

const useStyles = makeStyles({
    container: {
        padding: '24px',
        backgroundColor: tokens.colorNeutralBackgroundAlpha,
        borderRadius: '16px',
        border: `1px solid ${tokens.colorNeutralStrokeSubtle}`,
    },
    mappingRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px',
        borderBottom: `1px solid ${tokens.colorNeutralStrokeSubtle}`,
    },
    connector: {
        height: '2px',
        flex: 1,
        margin: '0 24px',
        backgroundColor: tokens.colorBrandStroke1,
        opacity: 0.3,
        position: 'relative',
    }
});

const MAPPINGS = [
    { source: { name: 'sAMAccountName', type: 'String' }, target: { name: 'EmployeeID', type: 'Int' }, confidence: 0.98, reason: 'Semantic match: Identifiers' },
    { source: { name: 'mail', type: 'String' }, target: { name: 'Work_Email', type: 'String' }, confidence: 1.00, reason: 'Exact pattern match: Email' },
    { source: { name: 'memberOf', type: 'Array' }, target: { name: 'Job_Function', type: 'String' }, confidence: 0.85, reason: 'High correlation in training data' },
];

export function SmartMapper() {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                <SparkleRegular color={tokens.colorBrandForeground1} />
                <Text weight="bold" size={400}>AI Semantic Mapping: IST vs SOLL</Text>
            </div>

            <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 12px 12px 12px', opacity: 0.6 }}>
                    <Text size={100} weight="bold">SOURCE: AZURE AD (IST)</Text>
                    <Text size={100} weight="bold">TARGET: WORKDAY (SOLL)</Text>
                </div>

                {MAPPINGS.map((m, i) => (
                    <motion.div
                        key={i}
                        className={styles.mappingRow}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div style={{ width: '150px' }}>
                            <Text weight="semibold" block>{m.source.name}</Text>
                            <Badge appearance="outline" size="small">{m.source.type}</Badge>
                        </div>

                        <div className={styles.connector}>
                            <div style={{
                                position: 'absolute',
                                top: '-24px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                <Badge color="success" appearance="tint" icon={<CheckmarkCircleRegular />}>
                                    {(m.confidence * 100).toFixed(0)}%
                                </Badge>
                                <Text size={100} style={{ whiteSpace: 'nowrap', marginTop: '4px' }}>{m.reason}</Text>
                            </div>
                        </div>

                        <div style={{ width: '150px', textAlign: 'right' }}>
                            <Text weight="semibold" block>{m.target.name}</Text>
                            <Badge appearance="outline" size="small">{m.target.type}</Badge>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <Button appearance="secondary">Edit Mappings</Button>
                <Button appearance="primary">Confirm & Run Automation</Button>
            </div>
        </div>
    );
}
