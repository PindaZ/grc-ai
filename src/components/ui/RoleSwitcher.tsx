'use client';

import { Menu, MenuTrigger, MenuList, MenuItem, Button, MenuPopover } from '@fluentui/react-components';
import { PersonAvailableRegular, ChevronDownRegular } from '@fluentui/react-icons';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';

export const RoleSwitcher = () => {
    const { currentRole, setCurrentRole } = useApp();

    const roles: { id: UserRole; label: string }[] = [
        { id: 'risk-owner', label: 'Risk Owner' },
        { id: 'control-owner', label: 'Control Owner' },
        { id: 'auditor', label: 'Auditor' },
    ];

    const currentLabel = roles.find(r => r.id === currentRole)?.label || 'Select Role';

    return (
        <Menu>
            <MenuTrigger disableButtonEnhancement>
                <Button
                    appearance="subtle"
                    icon={<PersonAvailableRegular />}
                    iconPosition="before"
                >
                    {currentLabel} <ChevronDownRegular style={{ marginLeft: '4px', fontSize: '12px' }} />
                </Button>
            </MenuTrigger>
            <MenuPopover>
                <MenuList>
                    {roles.map(role => (
                        <MenuItem
                            key={role.id}
                            onClick={() => setCurrentRole(role.id)}
                            persistOnClick
                        >
                            {role.label}
                        </MenuItem>
                    ))}
                </MenuList>
            </MenuPopover>
        </Menu>
    );
};
