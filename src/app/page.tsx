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
} from '@fluentui/react-icons';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';

import { allPendingFindings, uarFindings, soc2Findings, regulatoryFindings, contractFindings } from '@/data/aiFindings';
import { MultiSkillFindingsSummary } from '@/components/organisms/AIFindingsBanner';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedChart } from '@/components/visuals/AnimatedChart';
import { RoleSwitcher } from '@/components/ui/RoleSwitcher';
import { RiskOwnerDashboard } from '@/components/dashboards/RiskOwnerDashboard';
import { ControlOwnerDashboard } from '@/components/dashboards/ControlOwnerDashboard';
import { AuditorDashboard } from '@/components/dashboards/AuditorDashboard';

const useStyles = makeStyles({
  page: {
    ...shorthands.padding(tokens.spacingHorizontalXXL),
    maxWidth: '1600px',
    ...shorthands.margin('0', 'auto'),
    color: '#fff',
  },
  header: {
    marginBottom: tokens.spacingVerticalXXL,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: '32px',
    fontWeight: tokens.fontWeightSemibold,
    background: 'linear-gradient(90deg, #fff, #a0a0a0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: tokens.spacingVerticalS,
    display: 'block',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: tokens.fontSizeBase400,
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
    width: '40px',
    height: '40px',
    ...shorthands.borderRadius('12px'),
    background: 'rgba(255,255,255,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  value: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#fff',
    lineHeight: 1,
    marginBottom: '4px',
  },
  label: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: tokens.fontSizeBase200,
    textTransform: 'uppercase',
    letterSpacing: '1px',
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
    ...shorthands.padding('12px'),
    ...shorthands.borderRadius('8px'),
    background: 'rgba(255,255,255,0.03)',
    ...shorthands.border('1px', 'solid', 'rgba(255,255,255,0.05)'),
    transition: 'background 0.2s',
    '&:hover': {
      background: 'rgba(255,255,255,0.06)',
    },
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '16px',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  statusDot: {
    width: '8px',
    height: '8px',
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

export default function HomePage() {
  const styles = useStyles();
  const { currentRole } = useApp();

  // AI Findings Summary Data (kept global for now or could be moved to specific dashboards)
  const findingsSummary = [
    { skillName: 'User Access Review', count: uarFindings.filter(f => f.status === 'pending').length, highCount: uarFindings.filter(f => f.status === 'pending' && f.severity === 'high').length, path: '/automation/uar' },
    { skillName: 'SOC2 Parser', count: soc2Findings.filter(f => f.status === 'pending').length, highCount: soc2Findings.filter(f => f.status === 'pending' && f.severity === 'high').length, path: '/automation/soc2' },
    { skillName: 'Regulatory Mapping', count: regulatoryFindings.filter(f => f.status === 'pending').length, highCount: regulatoryFindings.filter(f => f.status === 'pending' && f.severity === 'high').length, path: '/automation/regulatory' },
    { skillName: 'Contract Analysis', count: contractFindings.filter(f => f.status === 'pending').length, highCount: contractFindings.filter(f => f.status === 'pending' && f.severity === 'high').length, path: '/automation/contracts' },
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
          <Text className={styles.title}>Welcome back, {getRoleLabel(currentRole)}</Text>
          <Text className={styles.subtitle}>
            {currentRole === 'risk-owner' && "Here is the current risk landscape and exposure analysis."}
            {currentRole === 'control-owner' && "You have pending actions and evidence uploads requiring attention."}
            {currentRole === 'auditor' && "Overview of compliance gaps, findings, and audit schedules."}
          </Text>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <RoleSwitcher />
          <Button appearance="primary" shape="circular" icon={<SparkleRegular />}>Ask AI Copilot</Button>
        </div>
      </header>

      {/* AI Summary Banner - Visible to all for "Wow" factor */}
      {findingsSummary.length > 0 && <MultiSkillFindingsSummary findings={findingsSummary} />}

      <div style={{ marginTop: '24px' }}>
        {currentRole === 'risk-owner' && <RiskOwnerDashboard />}
        {currentRole === 'control-owner' && <ControlOwnerDashboard />}
        {currentRole === 'auditor' && <AuditorDashboard />}
      </div>
    </div>
  );
}
