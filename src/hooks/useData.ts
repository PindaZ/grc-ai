import useSWR from 'swr';
import { Control, Risk, Requirement } from '@/types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useControls() {
    const { data, error, isLoading, mutate } = useSWR<Control[]>('/api/controls', fetcher);
    return {
        controls: data || [],
        isLoading,
        isError: error,
        mutate,
    };
}

export function useRisks() {
    const { data, error, isLoading, mutate } = useSWR<Risk[]>('/api/risks', fetcher);
    return {
        risks: data || [],
        isLoading,
        isError: error,
        mutate,
    };
}

export function useRequirements() {
    const { data, error, isLoading, mutate } = useSWR<Requirement[]>('/api/requirements', fetcher);
    return {
        requirements: data || [],
        isLoading,
        isError: error,
        mutate,
    };
}

export function useAgentActivity() {
    const { data, error, isLoading, mutate } = useSWR<any[]>('/api/agents/activity', fetcher);
    return {
        activity: data || [],
        isLoading,
        isError: error,
        mutate,
    };
}

export function useActivities() {
    const { data, error, isLoading, mutate } = useSWR<any[]>('/api/activities', fetcher);
    return {
        activities: data || [],
        isLoading,
        isError: error,
        mutate,
    };
}

export function useStats() {
    const { data, error, isLoading } = useSWR<any>('/api/stats/summary', fetcher);
    return {
        stats: data,
        isLoading,
        isError: error,
    };
}
