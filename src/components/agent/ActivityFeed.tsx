
'use client';

import {
    makeStyles,
    tokens,
    Text,
    Avatar,
    Badge,
    Button,
    shorthands
} from '@fluentui/react-components';
import {
    CheckmarkCircleRegular,
    ClockRegular,
    DocumentRegular,
    LinkRegular,
    SparkleRegular
} from '@fluentui/react-icons';
import { motion, AnimatePresence } from 'framer-motion';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '24px',
    },
    feedItem: {
        display: 'flex',
        gap: '20px',
        position: 'relative',
        ...shorthands.padding('16px'),
        ...shorthands.borderRadius('12px'),
        backgroundColor: tokens.colorNeutralBackgroundAlpha,
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStrokeSubtle),
        transition: 'background-color 0.2s ease',
        '&:hover': {
            backgroundColor: tokens.colorNeutralBackgroundAlpha2,
        },
    },
    timelineLine: {
        position: 'absolute',
        left: '36px',
        top: '60px',
        bottom: '-30px',
        width: '1px',
        background: `linear-gradient(to bottom, ${tokens.colorBrandBackground} 0%, transparent 100%)`,
        zIndex: 0,
    },
    avatarWrapper: {
        zIndex: 1,
        position: 'relative',
        '&::after': {
            content: '""',
            position: 'absolute',
            top: '-4px',
            left: '-4px',
            right: '-4px',
            bottom: '-4px',
            borderRadius: '50%',
            backgroundColor: tokens.colorBrandBackground2,
            filter: 'blur(8px)',
            opacity: 0.2,
        }
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        flex: 1,
    },
    evidence: {
        display: 'flex',
        gap: '12px',
        marginTop: '4px',
        padding: '8px 12px',
        backgroundColor: tokens.colorBrandBackgroundInverted,
        ...shorthands.border('1px', 'dashed', tokens.colorBrandStroke1),
        ...shorthands.borderRadius('8px'),
        alignItems: 'center',
    },
    timestamp: {
        fontSize: '11px',
        color: tokens.colorNeutralForeground4,
        fontWeight: '500',
    }
});

interface ActivityItem {
    id: string;
    agentName: string;
    action: string;
    target: string;
    timestamp: string;
    status: 'success' | 'failed' | 'pending';
    evidenceLink?: string;
    controlId: string;
}

const mockActivity: ActivityItem[] = [
    {
        id: '1',
        agentName: 'Access Agent',
        action: 'Revoked Access',
        target: 'j.doe@example.com',
        timestamp: '2 MINS AGO',
        status: 'success',
        evidenceLink: 'evd-102.png',
        controlId: 'CTL-ACC-01'
    },
    {
        id: '2',
        agentName: 'Vendor Agent',
        action: 'Flagged Exception',
        target: 'AWS SOC 2 Type II',
        timestamp: '15 MINS AGO',
        status: 'pending',
        evidenceLink: 'soc2_aws.pdf',
        controlId: 'CTL-VEND-01'
    },
    {
        id: '3',
        agentName: 'Policy Agent',
        action: 'Validated PR #4022',
        target: 'core-backend',
        timestamp: '45 MINS AGO',
        status: 'success',
        controlId: 'CTL-CM-03'
    },
    {
        id: '4',
        agentName: 'Privacy Agent',
        action: 'Mapped PII Data',
        target: 'Ticket #9921',
        timestamp: '1 HOUR AGO',
        status: 'success',
        controlId: 'CTL-PRIV-01'
    }
];

export const AgentActivityFeed = () => {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <SparkleRegular style={{ color: tokens.colorBrandForeground1, fontSize: '20px' }} />
                <Text size={500} weight="bold" style={{ color: tokens.colorNeutralForeground1 }}>Neural Activity Feed</Text>
            </div>

            <AnimatePresence>
                {mockActivity.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className={styles.feedItem}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        {index !== mockActivity.length - 1 && <div className={styles.timelineLine} />}

                        <div className={styles.avatarWrapper}>
                            <Avatar
                                color={item.agentName.includes('Access') ? 'colorful' : 'brand'}
                                name={item.agentName}
                                size={40}
                                style={{ border: `2px solid ${tokens.colorNeutralBackground1}` }}
                            />
                        </div>

                        <div className={styles.content}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Text weight="semibold" style={{ color: tokens.colorNeutralForeground1, fontSize: '14px' }}>
                                        <span style={{ color: tokens.colorBrandForeground1 }}>{item.agentName}</span>
                                        <span style={{ color: tokens.colorNeutralForeground2, marginLeft: '6px' }}>{item.action}</span>
                                    </Text>
                                    <Text style={{ color: tokens.colorNeutralForeground4, fontSize: '12px' }}>{item.target}</Text>
                                </div>
                                <Text className={styles.timestamp}>{item.timestamp}</Text>
                            </div>

                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <Badge
                                    appearance="tint"
                                    size="small"
                                    icon={item.status === 'success' ? <CheckmarkCircleRegular /> : <ClockRegular />}
                                    color={item.status === 'success' ? 'success' : 'warning'}
                                >
                                    {item.status.toUpperCase()}
                                </Badge>
                                <Text style={{ color: tokens.colorNeutralForeground4, fontSize: '11px' }}>ID: {item.controlId}</Text>
                            </div>

                            {item.evidenceLink && (
                                <motion.div
                                    className={styles.evidence}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.2 + 0.3 }}
                                >
                                    <DocumentRegular style={{ color: tokens.colorBrandForeground1 }} />
                                    <Text size={200} style={{ color: tokens.colorNeutralForeground2, flex: 1 }}>Proof: {item.evidenceLink}</Text>
                                    <Button icon={<LinkRegular />} size="small" appearance="subtle" style={{ color: tokens.colorNeutralForeground3 }} />
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};
