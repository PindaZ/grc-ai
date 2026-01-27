'use client';

import { makeStyles, tokens, mergeClasses, shorthands } from '@fluentui/react-components';
import { motion } from 'framer-motion';
import React from 'react';

const useStyles = makeStyles({
    card: {
        backgroundColor: tokens.colorNeutralBackgroundAlpha2, // Adaptive semi-transparent background
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStrokeSubtle),
        ...shorthands.borderRadius('16px'),
        ...shorthands.padding(tokens.spacingHorizontalL),
        boxShadow: tokens.shadow8, // Adaptive shadow
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',

        '&:hover': {
            backgroundColor: tokens.colorNeutralBackgroundAlpha,
            ...shorthands.borderColor(tokens.colorNeutralStroke1),
            boxShadow: tokens.shadow16,
            transform: 'translateY(-4px)',
        },
    },
    featured: {
        background: 'linear-gradient(145deg, rgba(23, 171, 218, 0.08) 0%, rgba(0, 112, 173, 0.03) 100%)',
        ...shorthands.border('1px', 'solid', 'rgba(23, 171, 218, 0.2)'),
        boxShadow: '0 4px 30px rgba(0, 112, 173, 0.1)',
        '&:hover': {
            boxShadow: '0 12px 60px rgba(0, 112, 173, 0.2)',
            ...shorthands.borderColor('rgba(23, 171, 218, 0.4)'),
        },
        /* Glow effect on featured card corners */
        '&::after': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle at center, rgba(23, 171, 218, 0.05), transparent 70%)',
            pointerEvents: 'none',
            zIndex: -1,
        }
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
