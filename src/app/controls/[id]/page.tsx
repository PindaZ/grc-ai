'use client';

import {
    makeStyles,
    tokens,
    Text,
    Button,
} from '@fluentui/react-components';
import {
    ArrowLeftRegular,
    SparkleRegular,
    WarningRegular,
    FolderOpenRegular,
    ClipboardTaskRegular,
    DocumentTextRegular,
    ArrowTrendingLinesRegular,
    CheckmarkRegular,
} from '@fluentui/react-icons';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { controls, risks, evidence as allEvidence, agentActions as allActions, agentEvents as allEvents } from '@/data/fixtures';
import { GlassCard } from '@/components/ui/GlassCard';
import { StatusBadge } from '@/components/atoms/Badges';
import { ControlHealthCard } from '@/components/molecules/ControlHealthCard';
import { AgentActionCenter } from '@/components/organisms/AgentActionCenter';
import { EvidenceTimeline } from '@/components/molecules/EvidenceTimeline';
import { ControlHero } from '@/components/organisms/ControlHero';

const useStyles = makeStyles({
    page: {
        padding: tokens.spacingHorizontalXXL,
        paddingBottom: tokens.spacingVerticalXXL,
    },
    backLink: {
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacingHorizontalXS,
        marginBottom: tokens.spacingVerticalL,
        color: tokens.colorNeutralForeground4,
        textDecoration: 'none',
        fontSize: '14px',
        '&:hover': { color: tokens.colorBrandForeground1 },
    },
    validationGrid: {
        display: 'grid',
        gridTemplateColumns: 'minmax(600px, 65fr) minmax(350px, 35fr)',
        gap: tokens.spacingHorizontalXXL,
    },
    mainStream: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalL,
    },
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacingVerticalL,
    },
    sectionTitle: {
        fontSize: '12px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
        color: tokens.colorNeutralForeground4,
        marginBottom: tokens.spacingVerticalM,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    contextTabs: {
        display: 'flex',
        gap: tokens.spacingHorizontalL,
        borderBottom: `1px solid ${tokens.colorNeutralStrokeSubtle}`,
        marginBottom: tokens.spacingVerticalM,
        paddingBottom: tokens.spacingVerticalS,
    },
    tab: {
        color: tokens.colorNeutralForeground3,
        fontWeight: '600',
        cursor: 'pointer',
        paddingBottom: '8px',
        borderBottom: '2px solid transparent',
        '&:hover': { color: tokens.colorNeutralForeground1 },
    },
    activeTab: {
        color: tokens.colorBrandForeground1,
        borderBottom: `2px solid ${tokens.colorBrandForeground1}`,
    }
});

export default function ControlDetailPage() {
    const styles = useStyles();
    const params = useParams();
    const [activeTab, setActiveTab] = useState('overview');

    const control = controls.find(c => c.id === params.id);
    const linkedRisks = risks.filter(r => control?.linkedRiskIds.includes(r.id));
    const linkedEvidence = allEvidence.filter(e => control?.linkedEvidenceIds.includes(e.id));
    const actions = allActions.filter(a => a.controlId === params.id);
    const events = allEvents.filter(e => e.controlId === params.id);

    if (!control) {
        return <div className={styles.page}><Text>Control not found</Text></div>;
    }

    return (
        <div className={styles.page}>
            <Link href="/controls" className={styles.backLink}>
                <ArrowLeftRegular /> Back to Controls Library
            </Link>

            {/* A. Hero State Bar (Top) */}
            <ControlHero
                id={control.id}
                title={control.title}
                status={control.status}
                automationScore={82}
                healthStatus="Healthy"
            />

            <div className={styles.validationGrid}>
                {/* B. Main Stream (Left - 65%) */}
                <div className={styles.mainStream}>
                    <GlassCard>
                        <div className={styles.contextTabs}>
                            <div
                                className={activeTab === 'overview' ? styles.activeTab : styles.tab}
                                onClick={() => setActiveTab('overview')}
                            >
                                Overview
                            </div>
                            <div
                                className={activeTab === 'procedure' ? styles.activeTab : styles.tab}
                                onClick={() => setActiveTab('procedure')}
                            >
                                Procedure
                            </div>
                            <div
                                className={activeTab === 'risks' ? styles.activeTab : styles.tab}
                                onClick={() => setActiveTab('risks')}
                            >
                                Linked Risks
                            </div>
                        </div>

                        {activeTab === 'overview' && (
                            <Text size={300} style={{ lineHeight: '1.6', color: tokens.colorNeutralForeground1 }}>
                                {control.description}
                            </Text>
                        )}

                        {activeTab === 'procedure' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {control.procedure.split('\n').map((step, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '12px' }}>
                                        <Text weight="bold" style={{ color: tokens.colorBrandForeground1 }}>{i + 1}.</Text>
                                        <Text>{step}</Text>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'risks' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {linkedRisks.map(risk => (
                                    <div key={risk.id} style={{ padding: '8px', border: `1px solid ${tokens.colorNeutralStrokeSubtle}`, borderRadius: '8px' }}>
                                        <Text weight="bold" block>{risk.title}</Text>
                                        <Text size={200} style={{ color: tokens.colorNeutralForeground4 }}>{risk.id}</Text>
                                    </div>
                                ))}
                            </div>
                        )}
                    </GlassCard>

                    <div>
                        <div className={styles.sectionTitle}><FolderOpenRegular /> Unified Audit Stream</div>
                        <GlassCard>
                            {/* C. Unified Timeline (Evidence + Events) */}
                            <EvidenceTimeline evidence={linkedEvidence} events={events} />
                        </GlassCard>
                    </div>
                </div>

                {/* C. Sidebar (Right - 35%) */}
                <div className={styles.sidebar}>
                    <div>
                        <div className={styles.sectionTitle}><SparkleRegular /> AI Co-Pilot</div>
                        {/* We hide the events from ActionCenter now as they are in the unified timeline */}
                        <AgentActionCenter actions={actions} events={[]} />
                    </div>

                    <div>
                        <div className={styles.sectionTitle}><ArrowTrendingLinesRegular /> Real-time Metrics</div>
                        <ControlHealthCard
                            automationScore={82}
                            lastTested="15 mins ago"
                            passRate={100}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
