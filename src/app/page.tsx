'use client';

import {
  makeStyles,
  tokens,
  Card,
  CardHeader,
  Text,
  Button,
  Badge,
  Divider,
} from '@fluentui/react-components';
import {
  TaskListSquareLtrRegular,
  SparkleRegular,
  CalendarRegular,
  ShieldCheckmarkRegular,
  ArrowRightRegular,
  WarningRegular,
} from '@fluentui/react-icons';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { controlActivities, risks, controls, evidence } from '@/data/fixtures';
import { allPendingFindings, uarFindings, soc2Findings, regulatoryFindings, contractFindings } from '@/data/aiFindings';
import { MultiSkillFindingsSummary } from '@/components/organisms/AIFindingsBanner';

const useStyles = makeStyles({
  page: {
    padding: tokens.spacingHorizontalXXL,
    maxWidth: '1400px',
  },
  header: {
    marginBottom: tokens.spacingVerticalXXL,
  },
  title: {
    fontSize: tokens.fontSizeHero800,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: tokens.spacingVerticalS,
  },
  subtitle: {
    color: tokens.colorNeutralForeground3,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: tokens.spacingHorizontalL,
    marginBottom: tokens.spacingVerticalXXL,
  },
  widgetCard: {
    minHeight: '160px',
  },
  widgetValue: {
    fontSize: tokens.fontSizeHero700,
    fontWeight: tokens.fontWeightBold,
    color: tokens.colorBrandForeground1,
  },
  widgetLabel: {
    color: tokens.colorNeutralForeground3,
    marginBottom: tokens.spacingVerticalM,
  },
  listSection: {
    marginBottom: tokens.spacingVerticalXXL,
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: tokens.spacingVerticalM,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: tokens.spacingVerticalS,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  listItemContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXXS,
  },
  statusBadge: {
    textTransform: 'capitalize',
  },
});

const roleGreetings = {
  'risk-owner': 'Risk Management Overview',
  'control-owner': 'Control Operations Dashboard',
  'auditor': 'Audit and Compliance Dashboard',
};

export default function HomePage() {
  const styles = useStyles();
  const { currentRole } = useApp();

  const myTasks = controlActivities.filter(a => a.status !== 'done').slice(0, 4);
  const highRisks = risks.filter(r => r.impact >= 4).slice(0, 3);
  const pendingEvidence = evidence.filter(e => e.status !== 'reviewed').slice(0, 3);
  const activeControls = controls.filter(c => c.status === 'active');

  // Count findings by severity
  const highFindings = allPendingFindings.filter(f => f.severity === 'high').length;
  const totalFindings = allPendingFindings.length;

  // Aggregate findings by skill for summary banner
  const findingsSummary = [
    { skillName: 'User Access Review', count: uarFindings.filter(f => f.status === 'pending').length, highCount: uarFindings.filter(f => f.status === 'pending' && f.severity === 'high').length, path: '/automation/uar' },
    { skillName: 'SOC2 Parser', count: soc2Findings.filter(f => f.status === 'pending').length, highCount: soc2Findings.filter(f => f.status === 'pending' && f.severity === 'high').length, path: '/automation/soc2' },
    { skillName: 'Regulatory Mapping', count: regulatoryFindings.filter(f => f.status === 'pending').length, highCount: regulatoryFindings.filter(f => f.status === 'pending' && f.severity === 'high').length, path: '/automation/regulatory' },
    { skillName: 'Contract Analysis', count: contractFindings.filter(f => f.status === 'pending').length, highCount: contractFindings.filter(f => f.status === 'pending' && f.severity === 'high').length, path: '/automation/contracts' },
  ].filter(f => f.count > 0);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Text className={styles.title}>{roleGreetings[currentRole]}</Text>
        <Text className={styles.subtitle}>
          Welcome back! Here&apos;s your compliance overview.
        </Text>
      </div>

      {/* AI Findings Summary Banner */}
      {findingsSummary.length > 0 && (
        <MultiSkillFindingsSummary findings={findingsSummary} />
      )}

      <div className={styles.grid}>
        <Card className={styles.widgetCard}>
          <CardHeader
            image={<TaskListSquareLtrRegular fontSize={24} />}
            header={<Text weight="semibold">My Tasks</Text>}
          />
          <Text className={styles.widgetValue}>{myTasks.length}</Text>
          <Text className={styles.widgetLabel}>activities pending</Text>
          <Link href="/execution">
            <Button appearance="subtle" icon={<ArrowRightRegular />} iconPosition="after">
              View all
            </Button>
          </Link>
        </Card>

        <Card className={styles.widgetCard}>
          <CardHeader
            image={<SparkleRegular fontSize={24} />}
            header={<Text weight="semibold">AI Findings</Text>}
          />
          <Text className={styles.widgetValue} style={{ color: highFindings > 0 ? tokens.colorPaletteRedForeground1 : tokens.colorBrandForeground1 }}>
            {totalFindings}
          </Text>
          <Text className={styles.widgetLabel}>
            {highFindings > 0 ? `${highFindings} high priority` : 'items to review'}
          </Text>
          <Link href="/automation?tab=findings">
            <Button appearance="subtle" icon={<ArrowRightRegular />} iconPosition="after">
              Review
            </Button>
          </Link>
        </Card>

        <Card className={styles.widgetCard}>
          <CardHeader
            image={<CalendarRegular fontSize={24} />}
            header={<Text weight="semibold">Upcoming Deadlines</Text>}
          />
          <Text className={styles.widgetValue}>4</Text>
          <Text className={styles.widgetLabel}>due this week</Text>
          <Link href="/execution">
            <Button appearance="subtle" icon={<ArrowRightRegular />} iconPosition="after">
              View calendar
            </Button>
          </Link>
        </Card>

        <Card className={styles.widgetCard}>
          <CardHeader
            image={<ShieldCheckmarkRegular fontSize={24} />}
            header={<Text weight="semibold">Audit Readiness</Text>}
          />
          <Text className={styles.widgetValue}>87%</Text>
          <Text className={styles.widgetLabel}>compliance score</Text>
          <Link href="/reporting">
            <Button appearance="subtle" icon={<ArrowRightRegular />} iconPosition="after">
              View report
            </Button>
          </Link>
        </Card>
      </div>

      <div className={styles.listSection}>
        <div className={styles.sectionHeader}>
          <Text size={500} weight="semibold">High Priority Risks</Text>
          <Link href="/risks">
            <Button appearance="subtle" size="small">View all</Button>
          </Link>
        </div>
        <Card>
          {highRisks.map((risk) => (
            <div key={risk.id} className={styles.listItem}>
              <div className={styles.listItemContent}>
                <Link href={`/risks/${risk.id}`}>
                  <Text weight="semibold">{risk.id}: {risk.title}</Text>
                </Link>
                <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                  Impact: {risk.impact} | Likelihood: {risk.likelihood}
                </Text>
              </div>
              <Badge
                appearance="filled"
                color={risk.status === 'mitigated' ? 'success' : 'warning'}
                className={styles.statusBadge}
              >
                {risk.status}
              </Badge>
            </div>
          ))}
        </Card>
      </div>

      <div className={styles.listSection}>
        <div className={styles.sectionHeader}>
          <Text size={500} weight="semibold">Pending Evidence</Text>
          <Link href="/evidence">
            <Button appearance="subtle" size="small">View all</Button>
          </Link>
        </div>
        <Card>
          {pendingEvidence.map((ev) => (
            <div key={ev.id} className={styles.listItem}>
              <div className={styles.listItemContent}>
                <Text weight="semibold">{ev.title}</Text>
                <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                  {ev.fileName} • Uploaded {ev.uploadedAt}
                </Text>
              </div>
              <Badge appearance="tint" color="informative" className={styles.statusBadge}>
                {ev.status}
              </Badge>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
