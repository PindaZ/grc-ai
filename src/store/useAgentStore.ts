import { create } from 'zustand';
import { AgentEvent, AgentAction, AIFinding, AutomationJob } from '@/types';

interface AgentState {
    events: AgentEvent[];
    actions: AgentAction[];
    findings: AIFinding[];
    jobs: AutomationJob[];
    agentHealth: {
        active: number;
        warnings: number;
        critical: number;
        eventsPerMin: number;
    };

    // Actions
    addEvent: (event: AgentEvent) => void;
    addAction: (action: AgentAction) => void;
    addFinding: (finding: AIFinding) => void;
    updateJob: (job: AutomationJob) => void;
    setHealth: (health: Partial<AgentState['agentHealth']>) => void;
    resolveAction: (id: string, status: AgentAction['status']) => void;
}

export const useAgentStore = create<AgentState>((set) => ({
    events: [],
    actions: [],
    findings: [],
    jobs: [],
    agentHealth: {
        active: 8,
        warnings: 3,
        critical: 0,
        eventsPerMin: 12,
    },

    addEvent: (event) => set((state) => ({
        events: [event, ...state.events].slice(0, 50)
    })),

    addAction: (action) => set((state) => ({
        actions: [action, ...state.actions]
    })),

    addFinding: (finding) => set((state) => ({
        findings: [finding, ...state.findings]
    })),

    updateJob: (job) => set((state) => ({
        jobs: state.jobs.some(j => j.id === job.id)
            ? state.jobs.map(j => j.id === job.id ? job : j)
            : [...state.jobs, job]
    })),

    setHealth: (health) => set((state) => ({
        agentHealth: { ...state.agentHealth, ...health }
    })),

    resolveAction: (id, status) => set((state) => ({
        actions: state.actions.map(a => a.id === id ? { ...a, status } : a)
    })),
}));
