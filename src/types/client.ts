
export interface Client {
    id: string;
    name: string;
    industry: string;
    status: 'active' | 'onboarding' | 'audit-mode';
}
