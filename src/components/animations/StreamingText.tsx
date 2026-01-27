'use client';

import { useState, useEffect } from 'react';

interface StreamingTextProps {
    text: string;
    speed?: number;
    onComplete?: () => void;
}

export const StreamingText = ({ text, speed = 30, onComplete }: StreamingTextProps) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayedText(text.slice(0, i + 1));
            i++;
            if (i === text.length) {
                clearInterval(interval);
                onComplete?.();
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, onComplete]);

    return <span>{displayedText}</span>;
};
