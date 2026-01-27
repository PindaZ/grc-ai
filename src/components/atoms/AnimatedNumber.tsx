
'use client';

import { useEffect, useState } from 'react';
import { animate } from 'framer-motion';

interface AnimatedNumberProps {
    value: number;
    duration?: number;
    format?: (n: number) => string;
}

export const AnimatedNumber = ({
    value,
    duration = 2,
    format = (n) => Math.round(n).toString()
}: AnimatedNumberProps) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const controls = animate(0, value, {
            duration,
            onUpdate: (latest) => setDisplayValue(latest)
        });

        return () => controls.stop();
    }, [value, duration]);

    return <>{format(displayValue)}</>;
};
