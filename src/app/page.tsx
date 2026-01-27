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
import { controlActivities, risks, controls, evidence, changeRequests } from '@/data/fixtures';
import { allPendingFindings, uarFindings, soc2Findings, regulatoryFindings, contractFindings } from '@/data/aiFindings';
import { MultiSkillFindingsSummary } from '@/components/organisms/AIFindingsBanner';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedChart } from '@/components/visuals/AnimatedChart';

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

  const myTasks = controlActivities.filter(a => a.status !== 'done').slice(0, 4);
  const highRisks = risks.filter(r => r.impact >= 4).slice(0, 3);
  const pendingEvidence = evidence.filter(e => e.status !== 'reviewed').slice(0, 3);

  // Fake chart data generation
  const taskTrend = [12, 15, 13, 18, 16, 20, 18, 24, 22, 28];
  const findingTrend = [5, 8, 12, 15, 25, 22, 30, 28, 35, 32];
  const complianceTrend = [85, 86, 86, 87, 86, 87, 87, 88, 87, 87];

  // Count findings
  const highFindings = allPendingFindings.filter(f => f.severity === 'high').length;
  const totalFindings = allPendingFindings.length;

  const findingsSummary = [
    { skillName: 'User Access Review', count: uarFindings.filter(f => f.status === 'pending').length, highCount: uarFindings.filter(f => f.status === 'pending' && f.severity === 'high').length, path: '/automation/uar' },
    { skillName: 'SOC2 Parser', count: soc2Findings.filter(f => f.status === 'pending').length, highCount: soc2Findings.filter(f => f.status === 'pending' && f.severity === 'high').length, path: '/automation/soc2' },
    { skillName: 'Regulatory Mapping', count: regulatoryFindings.filter(f => f.status === 'pending').length, highCount: regulatoryFindings.filter(f => f.status === 'pending' && f.severity === 'high').length, path: '/automation/regulatory' },
    { skillName: 'Contract Analysis', count: contractFindings.filter(f => f.status === 'pending').length, highCount: contractFindings.filter(f => f.status === 'pending' && f.severity === 'high').length, path: '/automation/contracts' },
  ].filter(f => f.count > 0);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <Text className={styles.title}>Welcome back, Auditor</Text>
          <Text className={styles.subtitle}>Here is your compliance posture overview for today.</Text>
        </div>
        <Button appearance="primary" shape="circular" icon={<SparkleRegular />}>Ask AI Copilot</Button>
      </header>

      {/* AI Summary Banner */}
      {findingsSummary.length > 0 && <MultiSkillFindingsSummary findings={findingsSummary} />}

      <motion.div
        className={styles.bentoGrid}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Widget 1: My Tasks */}
        <GlassCard className={styles.widgetContent}>
          <div className={styles.widgetHeader}>
            <div className={styles.iconBox}><TaskListSquareLtrRegular fontSize={24} /></div>
            <Button appearance="transparent" icon={<MoreHorizontalRegular />} />
          </div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div className={styles.value}>{myTasks.length}</div>
            <div className={styles.label}>Pending Actions</div>
          </div>
          <AnimatedChart data={taskTrend} color="#0078d4" height={100} />
        </GlassCard>

        {/* Widget 2: AI Findings (Featured) */}
        <GlassCard variant="featured" className={styles.widgetContent}>
          <div className={styles.widgetHeader}>
            <div className={styles.iconBox} style={{ background: 'rgba(255, 99, 88, 0.2)', color: '#ff6358' }}><SparkleRegular fontSize={24} /></div>
            <Badge appearance="tint" color="danger">Action Required</Badge>
          </div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div className={styles.value} style={{ color: '#ff6358' }}>{totalFindings}</div>
            <div className={styles.label}>AI Issues Found</div>
          </div>
          <AnimatedChart data={findingTrend} color="#ff6358" height={100} />
        </GlassCard>

        {/* Widget 3: Compliance Score */}
        <GlassCard className={styles.widgetContent}>
          <div className={styles.widgetHeader}>
            <div className={styles.iconBox} style={{ background: 'rgba(16, 186, 128, 0.2)', color: '#10ba80' }}><ShieldCheckmarkRegular fontSize={24} /></div>
          </div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div className={styles.value} style={{ color: '#10ba80' }}>87%</div>
            <div className={styles.label}>Audit Readiness</div>
          </div>
          <AnimatedChart data={complianceTrend} color="#10ba80" height={100} />
        </GlassCard>

        {/* Widget 4: Deadlines */}
        <GlassCard className={styles.widgetContent}>
          <div className={styles.widgetHeader}>
            <div className={styles.iconBox}><CalendarRegular fontSize={24} /></div>
          </div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div className={styles.value}>4</div>
            <div className={styles.label}>Due This Week</div>
          </div>
          <div style={{ height: '60px' }}></div> {/* Spacer instead of chart */}
        </GlassCard>

        {/* Large Block 1: High Priority Risks */}
        <GlassCard className={styles.colSpan2} style={{ minHeight: '300px' }}>
          <div className={styles.sectionTitle}>
            High Priority Risks
            <Badge appearance="outline" color="warning">{highRisks.length}</Badge>
          </div>
          <div className={styles.listContainer}>
            {highRisks.map(risk => (
              <div key={risk.id} className={styles.listItem}>
                <div>
                  <Text weight="semibold" style={{ display: 'block', color: '#fff' }}>{risk.title}</Text>
                  <Text size={200} style={{ color: 'rgba(255,255,255,0.5)' }}>Values: ${risk.impact}M exposure</Text>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                    <span className={styles.statusDot} style={{ background: '#fce100' }}></span>
                    <Text size={200} style={{ color: '#fce100' }}>{risk.status}</Text>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link href="/risks" style={{ display: 'inline-block', marginTop: '16px' }}>
            <Button appearance="subtle" style={{ color: '#0078d4' }}>View Risk Register</Button>
          </Link>
        </GlassCard>

        {/* Large Block 2: Pending Evidence */}
        <GlassCard className={styles.colSpan2} style={{ minHeight: '300px' }}>
          <div className={styles.sectionTitle}>
            Pending Evidence Review
          </div>
          <div className={styles.listContainer}>
            {pendingEvidence.map(ev => (
              <div key={ev.id} className={styles.listItem}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <Avatar name={ev.assignedTo} size={24} />
                  <div>
                    <Text weight="semibold" style={{ display: 'block', color: '#fff' }}>{ev.title}</Text>
                    <Text size={200} style={{ color: 'rgba(255,255,255,0.5)' }}>{ev.fileName}</Text>
                  </div>
                </div>
                <Link href="/evidence">
                  <Button size="small">Review</Button>
                </Link>
              </div>
            ))}
          </div>
          <Link href="/evidence" style={{ display: 'inline-block', marginTop: '16px' }}>
            <Button appearance="subtle" style={{ color: '#0078d4' }}>Go to Evidence Locker</Button>
          </Link>
        </GlassCard>

        {/* Large Block 3: Change Requests */}
        <GlassCard className={styles.colSpan2} style={{ minHeight: '300px' }}>
          <div className={styles.sectionTitle}>
            Change Management
            <Badge appearance="outline" color="important">{changeRequests.filter(c => c.status === 'pending-approval').length}</Badge>
          </div>
          <div className={styles.listContainer}>
            {changeRequests.map(cr => (
              <div key={cr.id} className={styles.listItem}>
                <div>
                  <Text weight="semibold" style={{ display: 'block', color: '#fff' }}>{cr.title}</Text>
                  <Text size={200} style={{ color: 'rgba(255,255,255,0.5)' }}>{cr.id} • {cr.type} • Risk: {cr.riskLevel}</Text>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                    <Badge
                      appearance="filled"
                      color={cr.status === 'approved' ? 'success' : cr.status === 'pending-approval' ? 'warning' : 'brand'}
                    >
                      {cr.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link href="/changes" style={{ display: 'inline-block', marginTop: '16px' }}>
            <Button appearance="subtle" style={{ color: '#0078d4' }}>View Change Board</Button>
          </Link>
        </GlassCard>

      </motion.div>
    </div>
  );
}
