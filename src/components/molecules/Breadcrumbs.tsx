'use client';

import {
    makeStyles,
    tokens,
    Text,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbDivider,
    BreadcrumbButton,
    Menu,
    MenuTrigger,
    MenuPopover,
    MenuList,
    MenuItem,
    Tooltip
} from '@fluentui/react-components';
import { HomeRegular, MoreHorizontalRegular } from '@fluentui/react-icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        alignItems: 'center',
        padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
        backgroundColor: tokens.colorNeutralBackground2,
        borderRadius: tokens.borderRadiusMedium,
        marginBottom: tokens.spacingVerticalM,
    },
});

const routeLabels: Record<string, string> = {
    '': 'Home',
    'requirements': 'Requirements & Regulations',
    'risks': 'Risk Register',
    'controls': 'Controls Library',
    'execution': 'Control Execution',
    'evidence': 'Evidence & Testing',
    'reporting': 'Reporting & Insights',
    'automation': 'AI Automation Hub',
};

export function Breadcrumbs() {
    const styles = useStyles();
    const pathname = usePathname();

    const segments = pathname.split('/').filter(Boolean);

    if (segments.length === 0) {
        return null;
    }

    return (
        <div className={styles.container}>
            <Breadcrumb aria-label="Breadcrumb navigation">
                {/* Home is always visible */}
                <BreadcrumbItem>
                    <Link href="/" passHref legacyBehavior>
                        <BreadcrumbButton icon={<HomeRegular />}>Home</BreadcrumbButton>
                    </Link>
                </BreadcrumbItem>

                {segments.length > 0 && <BreadcrumbDivider />}

                {/* If more than 3 items (Home + 3 segments), collapse middle ones */}
                {segments.length > 3 && (
                    <>
                        <BreadcrumbItem>
                            <Menu>
                                <MenuTrigger disableButtonEnhancement>
                                    <BreadcrumbButton icon={<MoreHorizontalRegular />} aria-label="Show collapsed items" />
                                </MenuTrigger>
                                <MenuPopover>
                                    <MenuList>
                                        {segments.slice(0, segments.length - 2).map((segment, i) => {
                                            const path = '/' + segments.slice(0, i + 1).join('/');
                                            const label = routeLabels[segment] || segment.toUpperCase().replace(/-/g, ' ');
                                            return (
                                                <MenuItem key={path}>
                                                    <Link href={path} style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>
                                                        {label}
                                                    </Link>
                                                </MenuItem>
                                            );
                                        })}
                                    </MenuList>
                                </MenuPopover>
                            </Menu>
                        </BreadcrumbItem>
                        <BreadcrumbDivider />
                    </>
                )}

                {/* Render last 2 segments if collapsed, otherwise all segments */}
                {(segments.length > 3 ? segments.slice(segments.length - 2) : segments).map((segment, i) => {
                    const originalIndex = segments.length > 3 ? segments.length - 2 + i : i;
                    const path = '/' + segments.slice(0, originalIndex + 1).join('/');
                    const isLast = originalIndex === segments.length - 1;
                    const label = routeLabels[segment] || segment.toUpperCase().replace(/-/g, ' ');

                    return (
                        <span key={path} style={{ display: 'contents' }}>
                            {segments.length <= 3 && i > 0 && <BreadcrumbDivider />}
                            {segments.length > 3 && i > 0 && <BreadcrumbDivider />}

                            <BreadcrumbItem>
                                {isLast ? (
                                    <Text weight="semibold" style={{ textWrap: 'nowrap' }}>{label}</Text>
                                ) : (
                                    <Link href={path} passHref legacyBehavior>
                                        <Tooltip content={label} relationship="label">
                                            <BreadcrumbButton style={{ maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {label}
                                            </BreadcrumbButton>
                                        </Tooltip>
                                    </Link>
                                )}
                            </BreadcrumbItem>
                        </span>
                    );
                })}
            </Breadcrumb>
        </div>
    );
}
