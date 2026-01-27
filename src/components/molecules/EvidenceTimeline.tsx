'use client';

import { makeStyles, tokens, Text, Badge } from '@fluentui/react-components';
import { GlassCard } from '@/components/ui/GlassCard';
import {
    DocumentRegular,
    SparkleRegular,
    PersonRegular,
    CheckmarkCircleRegular
} from '@fluentui/react-icons';
import { Evidence } from '@/types';

const useStyles = makeStyles({
    timeline: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalL,
        position: 'relative',
        paddingLeft: '24px',
        '&::before': {
            content: '""',
            position: 'absolute',
            left: '7px',
            top: '8px',
            bottom: '8px',
            width: '2px',
            background: tokens.colorNeutralStrokeSubtle,
        }
    },
    item: {
        position: 'relative',
    },
    dot: {
        position: 'absolute',
        left: '-24px',
        top: '4px',
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        backgroundColor: tokens.colorBrandBackground,
        border: `3px solid ${tokens.colorNeutralBackground1}`,
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '10px',
        color: '#fff',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalXXS,
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    source: {
        fontSize: '10px',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        color: tokens.colorNeutralForeground3,
    }
});

import { AgentEvent } from '@/types';

interface EvidenceTimelineProps {
    evidence: Evidence[];
    events: AgentEvent[];
}

export const EvidenceTimeline = ({ evidence, events }: EvidenceTimelineProps) => {
    const styles = useStyles();

    // Merge and sort items by date (newest first)
    const timelineItems = [
        ...evidence.map(e => ({ type: 'evidence', date: e.uploadedAt, data: e, id: e.id })),
        ...events.map(e => ({ type: 'event', date: e.timestamp, data: e, id: e.id }))
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className={styles.timeline}>
            {timelineItems.length === 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px', gap: '12px', opacity: 0.6 }}>
                    <SparkleRegular style={{ fontSize: '24px' }} />
                    <Text>No audit events recorded yet.</Text>
                </div>
            )}
            {timelineItems.map((item) => (
                <div key={item.id} className={styles.item}>
                    <div className={styles.dot} style={{
                        backgroundColor: item.type === 'evidence' ? tokens.colorBrandBackground : tokens.colorPaletteGreenBackground3,
                        borderColor: item.type === 'evidence' ? tokens.colorNeutralBackground1 : tokens.colorNeutralBackground1
                    }}>
                        {item.type === 'evidence'
                            ? (item.data as Evidence).assignedTo === 'system' ? <SparkleRegular /> : <PersonRegular />
                            : <CheckmarkCircleRegular />
                        }
                    </div>
                    <div className={styles.content}>
                        <div className={styles.header}>
                            <Text weight="semibold">
                                {item.type === 'evidence' ? (item.data as Evidence).title : (item.data as AgentEvent).message}
                            </Text>
                            <Text size={100} style={{ color: tokens.colorNeutralForeground4 }}>
                                {new Date(item.date).toLocaleDateString()} {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Text>
                        </div>

                        {item.type === 'evidence' ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span className={styles.source}>
                                    {(item.data as Evidence).assignedTo === 'system' ? <><SparkleRegular /> AI Sourced</> : <><PersonRegular /> Manual Upload</>}
                                </span>
                                <Badge appearance="tint" size="small" style={{ fontSize: '10px' }}>
                                    {(item.data as Evidence).status}
                                </Badge>
                            </div>
                        ) : (
                            <Text size={200} style={{ color: tokens.colorNeutralForeground3, fontSize: '12px' }}>
                                Agent Action • {(item.data as AgentEvent).type}
                            </Text>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};
