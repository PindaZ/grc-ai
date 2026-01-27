'use client';

import {
  makeStyles,
  tokens,
  Text,
  Button,
  Badge,
  Avatar,
  shorthands,
} from '@fluentui/react-components';
import {
  TaskListSquareLtrRegular,
  SparkleRegular,
  CalendarRegular,
  ShieldCheckmarkRegular,
  MoreHorizontalRegular,
  BotRegular,
} from '@fluentui/react-icons';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';

import { allPendingFindings, uarFindings, soc2Findings, regulatoryFindings, contractFindings } from '@/data/aiFindings';
import { MultiSkillFindingsSummary } from '@/components/organisms/AIFindingsBanner';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedChart } from '@/components/visuals/AnimatedChart';
import { RiskOwnerDashboard } from '@/components/dashboards/RiskOwnerDashboard';
import { ControlOwnerDashboard } from '@/components/dashboards/ControlOwnerDashboard';
import { AuditorDashboard } from '@/components/dashboards/AuditorDashboard';
import { useState } from 'react';
import { AgentStatusWidget } from '@/components/organisms/AgentStatusWidget';
import { AgentActivityTicker } from '@/components/organisms/AgentActivityTicker';
import { Divider } from '@fluentui/react-components';

const useStyles = makeStyles({
  page: {
    ...shorthands.padding(tokens.spacingHorizontalXXL),
    maxWidth: '1600px',
    ...shorthands.margin('0', 'auto'),
    color: tokens.colorNeutralForeground1,
  },
  header: {
    marginBottom: '48px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottom: `1px solid ${tokens.colorNeutralStrokeSubtle}`,
    paddingBottom: '24px',
  },
  title: {
    fontSize: '40px',
    fontWeight: '800',
    color: tokens.colorNeutralForeground1,
    // textShadow: '0 2px 15px rgba(0, 112, 173, 0.4)',
    marginBottom: tokens.spacingVerticalS,
    display: 'block',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase400,
    fontWeight: '400',
  },
  aiButton: {
    background: 'linear-gradient(135deg, #0070AD 0%, #17ABDA 100%)',
    color: '#fff',
    ...shorthands.border('none'),
    boxShadow: '0 0 20px rgba(23, 171, 218, 0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0 0 30px rgba(23, 171, 218, 0.5)',
      transform: 'scale(1.05)',
      background: 'linear-gradient(135deg, #0070AD 20%, #17ABDA 120%)',
    }
  },
  bentoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridTemplateRows: 'auto auto',
    gap: '24px',
    marginBottom: '48px',
    '@media (max-width: 1024px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
  colSpan2: {
    gridColumn: 'span 2',
  },
  rowSpan2: {
    gridRow: 'span 2',
  },
  widgetContent: {
    position: 'relative',
    zIndex: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  widgetHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: tokens.spacingVerticalL,
  },
  iconBox: {
    width: '42px',
    height: '42px',
    ...shorthands.borderRadius('12px'),
    background: 'rgba(0, 112, 173, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#17ABDA',
    boxShadow: '0 0 15px rgba(23, 171, 218, 0.1)',
  },
  value: {
    fontSize: '42px',
    fontWeight: '800',
    color: '#fff',
    lineHeight: 1,
    marginBottom: '8px',
    letterSpacing: '-0.03em',
  },
  label: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: tokens.fontSizeBase200,
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    fontWeight: '600',
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shorthands.padding('16px'),
    ...shorthands.borderRadius('12px'),
    background: tokens.colorNeutralBackgroundAlpha,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStrokeSubtle),
    transition: 'all 0.2s ease',
    '&:hover': {
      background: tokens.colorNeutralBackgroundAlpha2,
      transform: 'translateX(4px)',
      ...shorthands.borderColor(tokens.colorBrandStroke1),
    },
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '20px',
    color: tokens.colorNeutralForeground1,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  statusDot: {
    width: '10px',
    height: '10px',
    ...shorthands.borderRadius('50%'),
    display: 'inline-block',
    marginRight: '8px',
  },
});

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const styles = useStyles();
  const router = useRouter();
  const { currentRole, currentClient } = useApp();

  // AI Findings Summary Data (kept global for now or could be moved to specific dashboards)
  const findingsSummary = [
    { skillName: 'User Access Review', count: uarFindings.filter(f => f.status === 'pending').length, highCount: uarFindings.filter(f => f.status === 'pending' && f.severity === 'high').length, path: '/agents' },
    { skillName: 'SOC2 Parser', count: soc2Findings.filter(f => f.status === 'pending').length, highCount: soc2Findings.filter(f => f.status === 'pending' && f.severity === 'high').length, path: '/agents' },
    { skillName: 'Regulatory Mapping', count: regulatoryFindings.filter(f => f.status === 'pending').length, highCount: regulatoryFindings.filter(f => f.status === 'pending' && f.severity === 'high').length, path: '/requirements' },
    { skillName: 'Contract Analysis', count: contractFindings.filter(f => f.status === 'pending').length, highCount: contractFindings.filter(f => f.status === 'pending' && f.severity === 'high').length, path: '/evidence' },
  ].filter(f => f.count > 0);

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'risk-owner': return 'Risk Manager';
      case 'control-owner': return 'Control Owner';
      case 'auditor': return 'Internal Auditor';
      default: return 'User';
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <Text className={styles.title}>
            {`Welcome back, ${getRoleLabel(currentRole)} for ${currentClient.name}`}
          </Text>
          <Text className={styles.subtitle}>
            {(currentRole === 'risk-owner' && "Here is the current risk landscape and exposure analysis.") ||
              (currentRole === 'control-owner' && "You have pending actions and evidence uploads requiring attention.") ||
              (currentRole === 'auditor' && "Overview of compliance gaps, findings, and audit schedules.")
            }
          </Text>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* Action buttons removed as per user feedback */}
        </div>
      </header>

      {/* AI Summary Banner - Visible to all for "Wow" factor */}
      {findingsSummary.length > 0 && <div style={{ marginBottom: '32px' }}><MultiSkillFindingsSummary findings={findingsSummary} /></div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
        <GlassCard style={{ padding: 0 }}>
          <AgentStatusWidget />
        </GlassCard>
        <GlassCard style={{ padding: 0 }}>
          <AgentActivityTicker />
        </GlassCard>
      </div>

      <Divider style={{ marginBottom: '32px' }}>Operational View</Divider>

      <div style={{ marginTop: '24px' }}>
        <>
          {currentRole === 'risk-owner' && <RiskOwnerDashboard />}
          {currentRole === 'control-owner' && <ControlOwnerDashboard />}
          {currentRole === 'auditor' && <AuditorDashboard />}
        </>
      </div>
    </div>
  );
}
