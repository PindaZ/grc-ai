'use client';

import { useEffect, useRef } from 'react';
import { useAgentStore } from '@/store/useAgentStore';
import { AgentEvent } from '@/types';

const MOCK_MESSAGES = [
    { type: 'listening', message: 'Monitoring network traffic for unauthorized access patterns...' },
    { type: 'analyzing', message: 'Processing semantic matching for IST vs SOLL access lists.' },
    { type: 'evidence', message: 'Successfully captured evidence artifact for CTL-CM-02.' },
    { type: 'listening', message: 'Watching GitHub repo "core-services" for PR compliance...' },
    { type: 'analyzing', message: 'Evaluating PR #4052 against peer review policy.' },
    { type: 'evidence', message: 'Signed snapshot of firewall configuration stored in vault.' },
    { type: 'listening', message: 'Awaiting webhook from Workday for HR status sync...' },
];

const CONTROLS = ['CTL-ACC-01', 'CTL-ACC-02', 'CTL-CM-01', 'CTL-CM-03', 'CTL-PRIV-01', 'CTL-VEND-01'];

export function AgentEventGenerator() {
    const addEvent = useAgentStore(state => state.addEvent);
    const generatorRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Initial setup
        const generateEvent = () => {
            const randomMsg = MOCK_MESSAGES[Math.floor(Math.random() * MOCK_MESSAGES.length)];
            const randomControl = CONTROLS[Math.floor(Math.random() * CONTROLS.length)];

            const newEvent: AgentEvent = {
                id: `GEN-${Date.now()}`,
                controlId: randomControl as any,
                type: randomMsg.type as any,
                message: randomMsg.message,
                timestamp: new Date().toISOString(),
            };

            addEvent(newEvent);

            // Schedule next event with random delay (5s - 15s)
            const nextDelay = Math.floor(Math.random() * 10000) + 5000;
            generatorRef.current = setTimeout(generateEvent, nextDelay);
        };

        // Start generator
        generatorRef.current = setTimeout(generateEvent, 3000);

        return () => {
            if (generatorRef.current) clearTimeout(generatorRef.current);
        };
    }, [addEvent]);

    return null; // Background component
}
