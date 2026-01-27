'use client';

import {
    makeStyles,
    tokens,
    Button,
    Avatar,
    Menu,
    MenuTrigger,
    MenuPopover,
    MenuList,
    MenuItem,
    Badge,
    Popover,
    PopoverTrigger,
    PopoverSurface,
    Text,
    Divider,
    Tooltip,
} from '@fluentui/react-components';
import {
    SparkleRegular,
    AlertRegular,
    PersonRegular,
    ChevronDownRegular,
    CheckmarkCircleRegular,
    WeatherMoonRegular,
    WeatherSunnyRegular,
} from '@fluentui/react-icons';
import { AICommandBar } from '../molecules/AICommandBar';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';

const useStyles = makeStyles({
    topBar: {
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacingHorizontalM,
        padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
        backgroundColor: tokens.colorNeutralBackground1,
        borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
        minHeight: '60px',
    },
    commandBar: {
        flex: 1,
        maxWidth: '600px',
    },
    commandInput: {
        width: '100%',
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacingHorizontalS,
        marginLeft: 'auto',
    },
    roleSelector: {
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacingHorizontalXS,
        padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`,
        borderRadius: tokens.borderRadiusMedium,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: tokens.colorNeutralBackground1Hover,
        },
    },
    notificationPanel: {
        width: '320px',
        maxHeight: '400px',
        overflowY: 'auto',
    },
    notificationItem: {
        padding: tokens.spacingVerticalS,
        borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
        '&:last-child': {
            borderBottom: 'none',
        },
    },
    notificationTitle: {
        fontWeight: tokens.fontWeightSemibold,
    },
    notificationTime: {
        fontSize: tokens.fontSizeBase200,
        color: tokens.colorNeutralForeground3,
    },
});

const roleLabels: Record<UserRole, string> = {
    'risk-owner': 'Risk Owner',
    'control-owner': 'Control Owner',
    'auditor': 'Auditor',
};

const mockNotifications = [
    { id: '1', title: 'AI detected 3 controls with missing evidence', time: '5 min ago', type: 'ai' },
    { id: '2', title: 'Q1 Access Review due in 3 days', time: '1 hour ago', type: 'deadline' },
    { id: '3', title: 'New risk assessment completed', time: '2 hours ago', type: 'complete' },
];

// ... types or mock data

export function TopBar() {
    const styles = useStyles();
    const { currentRole, setCurrentRole, themeMode, toggleTheme } = useApp();

    return (
        <header className={styles.topBar}>
            <div className={styles.commandBar}>
                <AICommandBar />
            </div>

            <div className={styles.actions}>
                <Tooltip content={themeMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'} relationship="label">
                    <Button
                        appearance="subtle"
                        icon={themeMode === 'light' ? <WeatherMoonRegular /> : <WeatherSunnyRegular />}
                        onClick={toggleTheme}
                        aria-label={themeMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                    />
                </Tooltip>

                <Popover>
                    <PopoverTrigger disableButtonEnhancement>
                        <Button appearance="subtle" icon={<AlertRegular />}>
                            <Badge appearance="filled" color="danger" size="extra-small">3</Badge>
                        </Button>
                    </PopoverTrigger>
                    <PopoverSurface className={styles.notificationPanel}>
                        <Text weight="semibold" size={400}>Notifications</Text>
                        <Divider style={{ margin: `${tokens.spacingVerticalS} 0` }} />
                        {mockNotifications.map((n) => (
                            <div key={n.id} className={styles.notificationItem}>
                                <Text className={styles.notificationTitle} block>{n.title}</Text>
                                <Text className={styles.notificationTime}>{n.time}</Text>
                            </div>
                        ))}
                    </PopoverSurface>
                </Popover>

                <Menu>
                    <MenuTrigger disableButtonEnhancement>
                        <div className={styles.roleSelector}>
                            <PersonRegular />
                            <Text>{roleLabels[currentRole]}</Text>
                            <ChevronDownRegular />
                        </div>
                    </MenuTrigger>
                    <MenuPopover>
                        <MenuList>
                            {(Object.keys(roleLabels) as UserRole[]).map((role) => (
                                <MenuItem
                                    key={role}
                                    onClick={() => setCurrentRole(role)}
                                    icon={currentRole === role ? <CheckmarkCircleRegular /> : undefined}
                                >
                                    {roleLabels[role]}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </MenuPopover>
                </Menu>

                <Avatar name="John Dekker" size={32} />
            </div>
        </header>
    );
}
