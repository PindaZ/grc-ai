import { Requirement, Risk, Control, ControlActivity, Evidence } from '@/types';

// Helpers
const pickRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomDate = (start: Date, end: Date) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];

const riskTitles = [
    'Unauthorized Access to database', 'Data Loss Prevention failure', 'Vendor Supply Chain attack',
    'Phishing attempting credentials', 'API Injection vulnerability', 'DDOS Attack susceptibility',
    'Encryption Key mismanagement', 'GDPR Non-compliance', 'Cloud Configuration error',
    'Insider Threat activity', 'Patch Management delay', 'Backup Restoration failure'
];

const controlTitles = [
    'MFA Enforcement', 'Database Encryption', 'Quarterly Access Review',
    'Vendor Security Assessment', 'Penetration Testing', 'Incident Response Plan',
    'Data Retention Policy', 'Audit Logging', 'Endpoint Protection'
];

export const generateRisks = (count: number): Risk[] => {
    return Array.from({ length: count }).map((_, i) => ({
        id: `RISK-${100 + i}`,
        title: pickRandom(riskTitles) + ` ${i + 1}`,
        description: 'Generated risk description for demo purposes.',
        impact: pickRandom([1, 2, 3, 4, 5]),
        likelihood: pickRandom([1, 2, 3, 4, 5]),
        status: pickRandom(['identified', 'assessed', 'mitigated', 'accepted']),
        linkedRequirementIds: [`REQ-${randomInt(1, 10)}`],
        linkedControlIds: [`CTL-${randomInt(1, 20)}`],
        createdAt: '2024-01-01',
        updatedAt: '2024-03-01',
    }));
};

export const generateSparklineData = (points: number = 10) => {
    return Array.from({ length: points }).map(() => randomInt(20, 100));
};

// ... add more generators as needed
