'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const variants = {
    hidden: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
};

export const PageTransition = ({ children }: { children: ReactNode }) => {
    return (
        <motion.div
            variants={variants}
            initial="hidden"
            animate="enter"
            exit="exit"
            transition={{ duration: 0.3, ease: 'linear' }}
            style={{ width: '100%', height: '100%' }}
        >
            {children}
        </motion.div>
    );
};
