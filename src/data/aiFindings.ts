// AI Control Skills - Findings and Exception Data
import { AIFinding, SkillDefinition, AutomationRun } from '@/types';

// Extended skills with the 10 AI-powered controls
export const controlSkills: SkillDefinition[] = [
    {
        id: 'skill-uar',
        name: 'User Access Review',
        shortDescription: 'Compare HR data with system rights',
        description: 'Automatically compares HR system data with IAM permissions to identify over-privileged users and stale accounts.',
        category: 'access-management',
        icon: 'Person',
        status: 'active',
        usageCount: 312,
        schedule: 'Weekly',
        lastRun: '2024-03-26T08:00:00Z',
        nextRun: '2024-04-02T08:00:00Z',
    },
    {
        id: 'skill-soc2-parser',
        name: 'SOC2 Report Parser',
        shortDescription: 'Extract exceptions from vendor SOC2 reports',
        description: 'Analyzes vendor SOC2 PDF reports to extract audit scope, opinion, and exceptions automatically.',
        category: 'vendor-risk',
        icon: 'DocumentSearch',
        status: 'active',
        usageCount: 89,
        schedule: 'On document receipt',
        lastRun: '2024-03-25T14:30:00Z',
    },
    {
        id: 'skill-regulatory-mapping',
        name: 'Regulatory Change Mapping',
        shortDescription: 'Map new regulations to internal policies',
        description: 'Monitors regulatory feeds and compares new requirements with existing internal policies to identify gaps.',
        category: 'regulatory',
        icon: 'Library',
        status: 'active',
        usageCount: 45,
        schedule: 'Daily',
        lastRun: '2024-03-27T06:00:00Z',
    },
    {
        id: 'skill-contract-analysis',
        name: 'Contract Compliance Analysis',
        shortDescription: 'Scan contracts for required clauses',
        description: 'Analyzes contracts from CLM system to verify required clauses (DPA, liability, termination) are present.',
        category: 'legal',
        icon: 'Document',
        status: 'active',
        usageCount: 156,
        schedule: 'On new contract',
    },
    {
        id: 'skill-tick-tie',
        name: 'Audit Evidence Tick & Tie',
        shortDescription: 'Verify figures match source documents',
        description: 'Compares numbers in audit evidence against source systems to detect discrepancies.',
        category: 'audit',
        icon: 'Calculator',
        status: 'active',
        usageCount: 78,
        schedule: 'On evidence attachment',
    },
    {
        id: 'skill-policy-gap',
        name: 'Policy Gap Analysis',
        shortDescription: 'Find inconsistencies between policies',
        description: 'Compares global policies with local procedures to identify coverage gaps and inconsistencies.',
        category: 'policy',
        icon: 'DocumentCopy',
        status: 'active',
        usageCount: 34,
        schedule: 'On policy update',
    },
    {
        id: 'skill-incident-triage',
        name: 'Incident & Case Triage',
        shortDescription: 'Auto-categorize incidents and cases',
        description: 'Analyzes incoming incidents, categorizes by type, assigns priority, and suggests routing.',
        category: 'incident',
        icon: 'AlertUrgent',
        status: 'active',
        usageCount: 423,
        schedule: 'Real-time',
        lastRun: '2024-03-27T10:45:00Z',
    },
    {
        id: 'skill-pii-classification',
        name: 'Data Classification (PII)',
        shortDescription: 'Identify PII in documents',
        description: 'Scans documents for personally identifiable information and tags sensitivity levels.',
        category: 'privacy',
        icon: 'Shield',
        status: 'active',
        usageCount: 567,
        schedule: 'On document ingestion',
    },
    {
        id: 'skill-marketing-review',
        name: 'Marketing Copy Review',
        shortDescription: 'Check marketing for compliance',
        description: 'Reviews marketing materials for required disclaimers and prohibited claims.',
        category: 'legal',
        icon: 'Megaphone',
        status: 'active',
        usageCount: 28,
        schedule: 'On campaign creation',
    },
    {
        id: 'skill-coi-check',
        name: 'Conflict of Interest Check',
        shortDescription: 'Cross-reference employees and vendors',
        description: 'Compares employee records with vendor/procurement data to identify potential conflicts.',
        category: 'ethics',
        icon: 'People',
        status: 'active',
        usageCount: 12,
        schedule: 'Quarterly',
        lastRun: '2024-01-15T00:00:00Z',
        nextRun: '2024-04-15T00:00:00Z',
    },
];

// UAR Findings
export const uarFindings: AIFinding[] = [
    { id: 'uar-001', skillId: 'skill-uar', severity: 'high', title: 'Admin access after role change', description: 'Jane Smith still has Admin access after moving from IT to Marketing on Jan 15.', entity: 'jane.smith@company.com', currentState: 'Admin, Finance-Read', expectedState: 'Marketing-Read only', recommendation: 'Revoke Admin and Finance-Read', status: 'pending', detectedAt: '2024-03-26T08:00:00Z' },
    { id: 'uar-002', skillId: 'skill-uar', severity: 'high', title: 'Terminated employee access', description: 'John Doe employment terminated Feb 28, still has active system access.', entity: 'john.doe@company.com', currentState: 'Active account, Full access', expectedState: 'Account disabled', recommendation: 'Immediately disable account', status: 'pending', detectedAt: '2024-03-26T08:00:00Z' },
    { id: 'uar-003', skillId: 'skill-uar', severity: 'medium', title: 'Excessive privileged access', description: 'Developer Bob Wilson has production database admin rights beyond job function.', entity: 'bob.wilson@company.com', currentState: 'DB-Admin, Prod-Deploy', expectedState: 'DB-ReadOnly, Prod-Deploy', recommendation: 'Downgrade to read-only DB access', status: 'pending', detectedAt: '2024-03-26T08:00:00Z' },
    { id: 'uar-004', skillId: 'skill-uar', severity: 'low', title: 'Stale service account', description: 'Service account svc_legacy_app not used in 180 days.', entity: 'svc_legacy_app', currentState: 'Active, API-Full', expectedState: 'Review or disable', recommendation: 'Verify if needed, otherwise disable', status: 'pending', detectedAt: '2024-03-26T08:00:00Z' },
];

// SOC2 Findings
export const soc2Findings: AIFinding[] = [
    { id: 'soc2-001', skillId: 'skill-soc2-parser', severity: 'high', title: 'Exception: Access control monitoring', description: 'CloudVendor Inc SOC2 Type II contains exception for CC6.1 - Insufficient monitoring of privileged access.', entity: 'CloudVendor Inc', document: 'cloudvendor-soc2-2024.pdf', recommendation: 'Request remediation plan from vendor', controlMapping: 'CTL-003', status: 'pending', detectedAt: '2024-03-25T14:30:00Z' },
    { id: 'soc2-002', skillId: 'skill-soc2-parser', severity: 'medium', title: 'Qualified opinion on backup', description: 'DataProcessor LLC has qualified opinion regarding backup testing frequency.', entity: 'DataProcessor LLC', document: 'dataprocessor-soc2-2024.pdf', recommendation: 'Add to vendor risk register, monitor remediation', controlMapping: 'CTL-004', status: 'pending', detectedAt: '2024-03-25T14:35:00Z' },
];

// Regulatory Change Findings
export const regulatoryFindings: AIFinding[] = [
    { id: 'reg-001', skillId: 'skill-regulatory-mapping', severity: 'high', title: 'EU AI Act - High-risk AI systems', description: 'New requirement for documentation of high-risk AI systems. No current policy coverage found.', entity: 'EU AI Act Article 11', currentState: 'No policy exists', expectedState: 'Policy required', recommendation: 'Create AI system documentation policy', status: 'pending', detectedAt: '2024-03-27T06:00:00Z' },
    { id: 'reg-002', skillId: 'skill-regulatory-mapping', severity: 'medium', title: 'EU AI Act - Transparency obligations', description: 'Partial coverage in existing AI Ethics policy but missing specific transparency requirements.', entity: 'EU AI Act Article 13', currentState: 'Partial coverage', expectedState: 'Full alignment required', recommendation: 'Update AI Ethics Policy section 4.2', linkedPolicy: 'POL-AI-001', status: 'pending', detectedAt: '2024-03-27T06:00:00Z' },
    { id: 'reg-003', skillId: 'skill-regulatory-mapping', severity: 'low', title: 'DORA - ICT risk management', description: 'Existing IT Risk Policy aligns well, minor updates needed for terminology.', entity: 'DORA Article 5', currentState: 'Mostly aligned', expectedState: 'Terminology update', recommendation: 'Minor policy language update', linkedPolicy: 'POL-IT-RISK-001', status: 'pending', detectedAt: '2024-03-27T06:05:00Z' },
];

// Contract Findings
export const contractFindings: AIFinding[] = [
    { id: 'contract-001', skillId: 'skill-contract-analysis', severity: 'high', title: 'Missing DPA clause', description: 'Contract with NewVendor Corp missing Data Processing Agreement clause required for GDPR.', entity: 'NewVendor Corp - MSA', document: 'newvendor-msa-2024.pdf', recommendation: 'Request DPA addendum before signing', status: 'pending', detectedAt: '2024-03-27T09:00:00Z' },
    { id: 'contract-002', skillId: 'skill-contract-analysis', severity: 'medium', title: 'Liability cap below threshold', description: 'Liability limitation of $50K below company standard of $1M for this vendor tier.', entity: 'SaaSProvider Inc - SLA', document: 'saasprovider-sla.pdf', recommendation: 'Negotiate higher liability cap', status: 'pending', detectedAt: '2024-03-27T09:05:00Z' },
];

// Automation Runs (scheduled job history)
export const automationRuns: AutomationRun[] = [
    { id: 'run-001', skillId: 'skill-uar', status: 'completed', startedAt: '2024-03-26T08:00:00Z', completedAt: '2024-03-26T08:03:45Z', findingsCount: 12, resolvedCount: 8, pendingCount: 4 },
    { id: 'run-002', skillId: 'skill-regulatory-mapping', status: 'completed', startedAt: '2024-03-27T06:00:00Z', completedAt: '2024-03-27T06:02:12Z', findingsCount: 3, resolvedCount: 0, pendingCount: 3 },
    { id: 'run-003', skillId: 'skill-soc2-parser', status: 'completed', startedAt: '2024-03-25T14:30:00Z', completedAt: '2024-03-25T14:32:00Z', findingsCount: 2, resolvedCount: 0, pendingCount: 2 },
    { id: 'run-004', skillId: 'skill-uar', status: 'running', startedAt: '2024-03-27T08:00:00Z', findingsCount: 0, resolvedCount: 0, pendingCount: 0 },
];

// Aggregate all pending findings for dashboard
export const allPendingFindings: AIFinding[] = [
    ...uarFindings.filter(f => f.status === 'pending'),
    ...soc2Findings.filter(f => f.status === 'pending'),
    ...regulatoryFindings.filter(f => f.status === 'pending'),
    ...contractFindings.filter(f => f.status === 'pending'),
];
