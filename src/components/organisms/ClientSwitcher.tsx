'use client';

import {
    makeStyles,
    tokens,
    Button,
    Menu,
    MenuTrigger,
    MenuPopover,
    MenuList,
    MenuItem,
    Text,
    Badge,
} from '@fluentui/react-components';
import {
    ChevronDownRegular,
    CheckmarkCircleRegular,
    BuildingRegular,
    AddRegular,
} from '@fluentui/react-icons';
import { useApp } from '@/context/AppContext';
import { Client } from '@/types/client';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '4px 12px',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
            backgroundColor: tokens.colorNeutralBackground1Hover,
        },
    },
    clientInfo: {
        display: 'flex',
        flexDirection: 'column',
    },
    clientName: {
        fontWeight: '700',
        fontSize: '14px',
        color: tokens.colorNeutralForeground1,
        lineHeight: '1.2',
    },
    clientIndustry: {
        fontSize: '11px',
        color: tokens.colorNeutralForeground3,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    statusBadge: {
        fontSize: '10px',
        height: '18px',
        padding: '0 6px',
    },
});

export function ClientSwitcher() {
    const styles = useStyles();
    const { currentClient, setCurrentClient, clients } = useApp();

    const getStatusColor = (status: Client['status']) => {
        switch (status) {
            case 'active': return 'success';
            case 'audit-mode': return 'warning';
            case 'onboarding': return 'important';
            default: return 'informative';
        }
    };

    return (
        <Menu>
            <MenuTrigger disableButtonEnhancement>
                <div className={styles.container}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        backgroundColor: tokens.colorBrandBackground2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: tokens.colorBrandForeground1
                    }}>
                        <BuildingRegular />
                    </div>
                    <div className={styles.clientInfo}>
                        <Text className={styles.clientName}>{currentClient.name}</Text>
                        <Text className={styles.clientIndustry}>{currentClient.industry}</Text>
                    </div>
                    <ChevronDownRegular style={{ color: tokens.colorNeutralForeground3, fontSize: '12px' }} />
                </div>
            </MenuTrigger>
            <MenuPopover>
                <MenuList>
                    <div style={{ padding: '8px 12px', borderBottom: `1px solid ${tokens.colorNeutralStrokeSubtle}` }}>
                        <Text size={200} weight="bold" style={{ color: tokens.colorNeutralForeground4, textTransform: 'uppercase' }}>Switch Client</Text>
                    </div>
                    {clients.map((client) => (
                        <MenuItem
                            key={client.id}
                            onClick={() => setCurrentClient(client)}
                            icon={client.id === currentClient.id ? <CheckmarkCircleRegular style={{ color: tokens.colorPaletteGreenForeground1 }} /> : <div style={{ width: '16px' }} />}
                            secondaryContent={
                                <Badge
                                    appearance="outline"
                                    color={getStatusColor(client.status)}
                                    className={styles.statusBadge}
                                >
                                    {client.status}
                                </Badge>
                            }
                        >
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Text weight="semibold">{client.name}</Text>
                                <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>{client.industry}</Text>
                            </div>
                        </MenuItem>
                    ))}
                    <div style={{ borderTop: `1px solid ${tokens.colorNeutralStrokeSubtle}`, marginTop: '4px' }}>
                        <MenuItem icon={<AddRegular />}>Add New Client</MenuItem>
                    </div>
                </MenuList>
            </MenuPopover>
        </Menu>
    );
}
