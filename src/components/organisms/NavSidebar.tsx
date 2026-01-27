'use client';

import {
    makeStyles,
    tokens,
    Button,
    Tooltip,
} from '@fluentui/react-components';
import {
    HomeFilled,
    HomeRegular,
    DocumentTextFilled,
    DocumentTextRegular,
    WarningFilled,
    WarningRegular,
    ShieldCheckmarkFilled,
    ShieldCheckmarkRegular,
    TaskListSquareLtrFilled,
    TaskListSquareLtrRegular,
    FolderOpenFilled,
    FolderOpenRegular,
    DataUsageFilled,
    DataUsageRegular,
    BotFilled,
    BotRegular,
    ChevronLeftFilled,
    ChevronRightFilled,
    bundleIcon,
} from '@fluentui/react-icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';

const HomeIcon = bundleIcon(HomeFilled, HomeRegular);
const RequirementsIcon = bundleIcon(DocumentTextFilled, DocumentTextRegular);
const RisksIcon = bundleIcon(WarningFilled, WarningRegular);
const ControlsIcon = bundleIcon(ShieldCheckmarkFilled, ShieldCheckmarkRegular);
const ExecutionIcon = bundleIcon(TaskListSquareLtrFilled, TaskListSquareLtrRegular);
const EvidenceIcon = bundleIcon(FolderOpenFilled, FolderOpenRegular);
const ReportingIcon = bundleIcon(DataUsageFilled, DataUsageRegular);
const AutomationIcon = bundleIcon(BotFilled, BotRegular);

const useStyles = makeStyles({
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: tokens.colorNeutralBackground1,
        borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
        transition: 'width 0.2s ease',
    },
    sidebarExpanded: {
        width: '240px',
    },
    sidebarCollapsed: {
        width: '60px',
    },
    logo: {
        padding: tokens.spacingVerticalL,
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacingHorizontalM,
        borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
        minHeight: '60px',
    },
    logoText: {
        fontWeight: tokens.fontWeightSemibold,
        fontSize: tokens.fontSizeBase400,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    nav: {
        flex: 1,
        padding: tokens.spacingVerticalS,
        overflowY: 'auto',
    },
    navItem: {
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacingHorizontalM,
        padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
        borderRadius: tokens.borderRadiusMedium,
        textDecoration: 'none',
        color: tokens.colorNeutralForeground1,
        marginBottom: tokens.spacingVerticalXS,
        transition: 'background-color 0.15s ease',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: tokens.colorNeutralBackground1Hover,
        },
    },
    navItemActive: {
        backgroundColor: tokens.colorBrandBackground2,
        color: tokens.colorBrandForeground1,
        '&:hover': {
            backgroundColor: tokens.colorBrandBackground2Hover,
        },
    },
    navItemCollapsed: {
        justifyContent: 'center',
        padding: tokens.spacingVerticalS,
    },
    navLabel: {
        fontSize: tokens.fontSizeBase300,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    navIcon: {
        fontSize: '20px',
        flexShrink: 0,
    },
    collapseButton: {
        margin: tokens.spacingVerticalM,
        alignSelf: 'center',
    },
});

const navItems = [
    { href: '/', label: 'Home', Icon: HomeIcon },
    { href: '/requirements', label: 'Requirements', Icon: RequirementsIcon },
    { href: '/risks', label: 'Risks', Icon: RisksIcon },
    { href: '/controls', label: 'Controls', Icon: ControlsIcon },
    { href: '/execution', label: 'Execution', Icon: ExecutionIcon },
    { href: '/evidence', label: 'Evidence', Icon: EvidenceIcon },
    { href: '/reporting', label: 'Reporting', Icon: ReportingIcon },
    { href: '/automation', label: 'Automation', Icon: AutomationIcon },
];

export function NavSidebar() {
    const styles = useStyles();
    const pathname = usePathname();
    const { navSidebarCollapsed, setNavSidebarCollapsed } = useApp();

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <aside className={`${styles.sidebar} ${navSidebarCollapsed ? styles.sidebarCollapsed : styles.sidebarExpanded}`}>
            <div className={styles.logo}>
                <ShieldCheckmarkFilled style={{ fontSize: '24px', color: tokens.colorBrandForeground1 }} />
                {!navSidebarCollapsed && <span className={styles.logoText}>GRC Platform</span>}
            </div>

            <nav className={styles.nav}>
                {navItems.map(({ href, label, Icon }) => {
                    const active = isActive(href);
                    const itemClass = `${styles.navItem} ${active ? styles.navItemActive : ''} ${navSidebarCollapsed ? styles.navItemCollapsed : ''}`;

                    const content = (
                        <Link href={href} className={itemClass} key={href}>
                            <Icon className={styles.navIcon} filled={active} />
                            {!navSidebarCollapsed && <span className={styles.navLabel}>{label}</span>}
                        </Link>
                    );

                    if (navSidebarCollapsed) {
                        return (
                            <Tooltip content={label} relationship="label" positioning="after" key={href}>
                                {content}
                            </Tooltip>
                        );
                    }

                    return content;
                })}
            </nav>

            <Button
                className={styles.collapseButton}
                appearance="subtle"
                icon={navSidebarCollapsed ? <ChevronRightFilled /> : <ChevronLeftFilled />}
                onClick={() => setNavSidebarCollapsed(!navSidebarCollapsed)}
            />
        </aside>
    );
}
