'use client';

import { makeStyles, tokens, Text, Button, Badge, mergeClasses } from '@fluentui/react-components';
import { GlassCard } from '@/components/ui/GlassCard';
import {
    SparkleRegular,
    LightbulbRegular,
    AlertRegular,
    CheckmarkRegular,
    DismissRegular,
    PlayRegular
} from '@fluentui/react-icons';
import { AgentAction, AgentEvent } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalL,
    },
    sectionTitle: {
        fontSize: '14px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
        color: tokens.colorNeutralForeground4,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    eventList: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalS,
        maxHeight: '200px',
        overflowY: 'auto',
        paddingRight: '8px',
    },
    eventItem: {
        padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`,
        borderRadius: tokens.borderRadiusMedium,
        backgroundColor: tokens.colorNeutralBackgroundAlpha,
        borderLeft: '3px solid transparent', // This relies on transparent, which is fine
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    listening: { borderLeftColor: tokens.colorPaletteBlueBorderActive },
    analyzing: { borderLeftColor: tokens.colorPaletteYellowBorderActive },
    alert: { borderLeftColor: tokens.colorPaletteRedBorderActive, backgroundColor: tokens.colorPaletteRedBackground2 },
    evidence: { borderLeftColor: tokens.colorPaletteGreenBorderActive },

    actionCard: {
        padding: tokens.spacingHorizontalL,
        border: `1px solid ${tokens.colorNeutralStrokeSubtle}`,
        borderRadius: tokens.borderRadiusLarge,
        backgroundColor: tokens.colorNeutralBackgroundAlpha,
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalM,
    },
    actionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    reasoning: {
        padding: tokens.spacingHorizontalM,
        backgroundColor: 'rgba(0, 112, 173, 0.1)',
        borderRadius: tokens.borderRadiusMedium,
        border: '1px solid rgba(0, 112, 173, 0.2)',
        fontSize: '12px',
        fontStyle: 'italic',
    },
    pulse: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: tokens.colorBrandForeground1,
    }
});

interface AgentActionCenterProps {
    actions: AgentAction[];
    events: AgentEvent[];
}

export const AgentActionCenter = ({ actions: initialActions, events }: AgentActionCenterProps) => {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            {/* Pending Decisions */}

            <div>
                <div className={styles.sectionTitle}>
                    <LightbulbRegular /> Pending AI Decisions
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM, marginTop: tokens.spacingVerticalM }}>
                    {initialActions.filter(a => a.status === 'pending').length === 0 && (
                        <div style={{ padding: '24px', textAlign: 'center', opacity: 0.6, border: `1px dashed ${tokens.colorNeutralStrokeSubtle}`, borderRadius: tokens.borderRadiusMedium }}>
                            <Text size={200}>No pending decisions.</Text>
                            <Text block size={100} style={{ marginTop: '4px' }}>AI monitoring active...</Text>
                        </div>
                    )}
                    <AnimatePresence>
                        {initialActions.filter(a => a.status === 'pending').map((action) => (
                            <motion.div
                                key={action.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className={styles.actionCard}
                            >
                                <div className={styles.actionHeader}>
                                    <Text weight="bold">{action.title}</Text>
                                    <Badge appearance="outline" color={action.type === 'decision' ? 'important' : 'informative'}>
                                        {action.type}
                                    </Badge>
                                </div>
                                <Text size={200}>{action.description}</Text>
                                <div className={styles.reasoning}>
                                    <Text block><SparkleRegular /> AI Reasoning:</Text>
                                    {action.reasoning}
                                </div>
                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                    <Button size="small" icon={<DismissRegular />}>Dismiss</Button>
                                    <Button size="small" appearance="primary" icon={<CheckmarkRegular />}>Approve & Execute</Button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
