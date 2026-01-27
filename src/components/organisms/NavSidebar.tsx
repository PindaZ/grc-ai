'use client';

import {
    makeStyles,
    tokens,
    Button,
    Badge,
    shorthands,
    Divider,
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
        backgroundColor: tokens.colorNeutralBackgroundAlpha2,
        backdropFilter: 'blur(20px)',
        borderRight: `1px solid ${tokens.colorNeutralStrokeSubtle}`,
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 10,
    },
    sidebarExpanded: {
        width: '260px',
    },
    sidebarCollapsed: {
        width: '72px',
    },
    logo: {
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        minHeight: '80px',
        marginBottom: '20px',
    },
    logoIcon: {
        fontSize: '32px',
        color: '#0070AD',
        filter: 'drop-shadow(0 0 10px rgba(0, 112, 173, 0.3))',
    },
    logoText: {
        fontWeight: '800',
        fontSize: '20px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        letterSpacing: '-0.02em',
        background: `linear-gradient(90deg, ${tokens.colorNeutralForeground1}, #0070AD)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    nav: {
        flex: 1,
        padding: '0 12px',
        overflowY: 'auto',
    },
    navItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '12px 16px',
        borderRadius: '12px',
        textDecoration: 'none',
        color: tokens.colorNeutralForeground4,
        marginBottom: '8px',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: tokens.colorNeutralBackgroundAlpha,
            color: tokens.colorNeutralForeground1,
        },
    },
    navItemActive: {
        backgroundColor: tokens.colorBrandBackground2,
        color: tokens.colorBrandForeground1,
        fontWeight: '600',
        borderLeft: `3px solid ${tokens.colorBrandStroke1}`,
        '&:hover': {
            backgroundColor: tokens.colorBrandBackground2Hover,
        },
    },
    navItemCollapsed: {
        justifyContent: 'center',
        padding: '12px',
    },
    navLabel: {
        fontSize: '14px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    navIcon: {
        fontSize: '22px',
        flexShrink: 0,
    },
    collapseButton: {
        margin: '24px',
        alignSelf: 'center',
        color: tokens.colorNeutralForeground4,
    },
});

const navItems = [
    { href: '/', label: 'Home', Icon: HomeIcon },
    { href: '/agents', label: 'Agents', Icon: BotRegular },
    { href: '/execution', label: 'Action Center', Icon: ExecutionIcon },
    { href: '/evidence', label: 'Evidence', Icon: EvidenceIcon },
    { href: '/reporting', label: 'Reporting', Icon: ReportingIcon },
    { type: 'divider' as const },
    { href: '/risks', label: 'Risks', Icon: RisksIcon },
    { href: '/controls', label: 'Controls', Icon: ControlsIcon },
    { href: '/requirements', label: 'Requirements', Icon: RequirementsIcon },
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
                <ShieldCheckmarkFilled className={styles.logoIcon} />
                {!navSidebarCollapsed && <span className={styles.logoText}>GRC Platform</span>}
            </div>

            <nav className={styles.nav}>
                {navItems.map((item, index) => {
                    if ('type' in item && item.type === 'divider') {
                        return <Divider key={`divider-${index}`} style={{ margin: '16px 12px' }} />;
                    }

                    const { href, label, Icon } = item as { href: string; label: string; Icon: any };
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
