'use client';

import { makeStyles, tokens, mergeClasses, shorthands } from '@fluentui/react-components';
import { motion } from 'framer-motion';
import React from 'react';

const useStyles = makeStyles({
    card: {
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)', // Safari support
        ...shorthands.border('1px', 'solid', 'var(--glass-border)'),
        ...shorthands.borderRadius('16px'),
        ...shorthands.padding(tokens.spacingHorizontalL),
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',

        '&:hover': {
            background: 'rgba(255, 255, 255, 0.07)',
            ...shorthands.borderColor('rgba(255, 255, 255, 0.15)'),
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            transform: 'translateY(-2px)',
        },

        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, var(--glass-shine), transparent)',
            transition: 'left 0.5s ease',
            pointerEvents: 'none',
        },
        '&:hover::before': {
            left: '100%',
        },
    },
    featured: {
        background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
        ...shorthands.border('1px', 'solid', 'rgba(0, 120, 212, 0.3)'),
        boxShadow: '0 4px 30px rgba(0, 120, 212, 0.15)',
        '&:hover': {
            boxShadow: '0 8px 40px rgba(0, 120, 212, 0.25)',
            ...shorthands.borderColor('rgba(0, 120, 212, 0.5)'),
        },
    },
});

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    variant?: 'default' | 'featured';
}

export const GlassCard: React.FC<GlassCardProps> = ({
    children,
    className,
    variant = 'default',
    onClick,
    ...props
}) => {
    const styles = useStyles();

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={mergeClasses(
                styles.card,
                variant === 'featured' && styles.featured,
                className
            )}
            onClick={onClick}
            {...props as any}
        >
            {children}
        </motion.div>
    );
};
