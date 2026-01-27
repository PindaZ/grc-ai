import { Requirement, Risk, Control, ControlActivity, Evidence, SkillDefinition, AutomationRecipe, AutomationLogEntry, AutomationJob } from '@/types';

export const requirements: Requirement[] = [
    { id: 'REQ-001', title: 'GDPR Article 5 - Data Processing Principles', description: 'Personal data shall be processed lawfully, fairly and in a transparent manner.', source: 'GDPR', status: 'active', linkedRiskIds: ['RISK-001', 'RISK-002'], createdAt: '2024-01-15', updatedAt: '2024-03-10' },
    { id: 'REQ-002', title: 'GDPR Article 32 - Security of Processing', description: 'Implement appropriate technical and organisational measures to ensure security.', source: 'GDPR', status: 'active', linkedRiskIds: ['RISK-003'], createdAt: '2024-01-15', updatedAt: '2024-02-20' },
    { id: 'REQ-003', title: 'SOC 2 CC6.1 - Logical Access Controls', description: 'Implement logical access controls to protect information assets.', source: 'SOC 2', status: 'active', linkedRiskIds: ['RISK-004'], createdAt: '2024-02-01', updatedAt: '2024-03-15' },
    { id: 'REQ-004', title: 'ISO 27001 A.12.4 - Logging and Monitoring', description: 'Record user activities, exceptions, and security events.', source: 'ISO 27001', status: 'draft', linkedRiskIds: [], createdAt: '2024-03-01', updatedAt: '2024-03-01' },
];

export const risks: Risk[] = [
    { id: 'RISK-001', title: 'Unauthorized Data Access', description: 'Risk of unauthorized access to personal data due to insufficient access controls.', impact: 4, likelihood: 3, status: 'mitigated', linkedRequirementIds: ['REQ-001'], linkedControlIds: ['CTL-001', 'CTL-002'], createdAt: '2024-01-20', updatedAt: '2024-03-10' },
    { id: 'RISK-002', title: 'Data Breach via Third Party', description: 'Risk of data breach through third-party vendor vulnerability.', impact: 5, likelihood: 2, status: 'assessed', linkedRequirementIds: ['REQ-001'], linkedControlIds: ['CTL-003'], createdAt: '2024-01-25', updatedAt: '2024-02-15' },
    { id: 'RISK-003', title: 'Encryption Key Compromise', description: 'Risk of encryption keys being compromised leading to data exposure.', impact: 5, likelihood: 1, status: 'mitigated', linkedRequirementIds: ['REQ-002'], linkedControlIds: ['CTL-004'], createdAt: '2024-02-01', updatedAt: '2024-03-05' },
    { id: 'RISK-004', title: 'Insufficient Audit Logging', description: 'Risk of security incidents going undetected due to inadequate logging.', impact: 3, likelihood: 4, status: 'identified', linkedRequirementIds: ['REQ-003'], linkedControlIds: [], createdAt: '2024-03-01', updatedAt: '2024-03-01' },
];

export const controls: Control[] = [
    { id: 'CTL-001', title: 'Role-Based Access Control', description: 'Implement RBAC to restrict system access based on user roles.', procedure: '1. Define roles\\n2. Assign permissions\\n3. Review quarterly', status: 'active', linkedRiskIds: ['RISK-001'], linkedEvidenceIds: ['EVD-001'], createdAt: '2024-01-25', updatedAt: '2024-03-10' },
    { id: 'CTL-002', title: 'Multi-Factor Authentication', description: 'Require MFA for all privileged access.', procedure: '1. Enable MFA\\n2. Enroll users\\n3. Monitor compliance', status: 'active', linkedRiskIds: ['RISK-001'], linkedEvidenceIds: ['EVD-002'], createdAt: '2024-01-28', updatedAt: '2024-02-20' },
    { id: 'CTL-003', title: 'Vendor Security Assessment', description: 'Conduct security assessments for all third-party vendors.', procedure: '1. Request SOC 2 report\\n2. Review findings\\n3. Document gaps', status: 'active', linkedRiskIds: ['RISK-002'], linkedEvidenceIds: [], createdAt: '2024-02-05', updatedAt: '2024-03-01' },
    { id: 'CTL-004', title: 'Key Management Procedures', description: 'Implement secure key management practices.', procedure: '1. Use HSM\\n2. Rotate keys annually\\n3. Audit access', status: 'active', linkedRiskIds: ['RISK-003'], linkedEvidenceIds: ['EVD-003'], createdAt: '2024-02-10', updatedAt: '2024-03-05' },
];

export const controlActivities: ControlActivity[] = [
    { id: 'ACT-001', controlId: 'CTL-001', title: 'Q1 Access Review', dueDate: '2024-03-31', status: 'in-progress', assigneeId: 'user-1' },
    { id: 'ACT-002', controlId: 'CTL-002', title: 'MFA Enrollment Check', dueDate: '2024-03-15', status: 'done', assigneeId: 'user-1' },
    { id: 'ACT-003', controlId: 'CTL-003', title: 'Vendor SOC 2 Collection', dueDate: '2024-04-15', status: 'todo', assigneeId: 'user-2' },
    { id: 'ACT-004', controlId: 'CTL-004', title: 'Annual Key Rotation', dueDate: '2024-04-30', status: 'todo', assigneeId: 'user-2' },
    { id: 'ACT-005', controlId: 'CTL-001', title: 'Q2 Access Review', dueDate: '2024-06-30', status: 'todo', assigneeId: 'user-1' },
];

export const evidence: Evidence[] = [
    { id: 'EVD-001', title: 'Q4 Access Review Report', fileName: 'q4-access-review.xlsx', uploadedAt: '2024-01-10', status: 'reviewed', linkedControlId: 'CTL-001', matchScore: 95 },
    { id: 'EVD-002', title: 'MFA Enrollment Summary', fileName: 'mfa-enrollment-jan.pdf', uploadedAt: '2024-01-20', status: 'attached', linkedControlId: 'CTL-002', matchScore: 88 },
    { id: 'EVD-003', title: 'Key Rotation Certificate', fileName: 'key-rotation-cert.pdf', uploadedAt: '2024-02-15', status: 'analyzed', linkedControlId: 'CTL-004', matchScore: 92 },
    { id: 'EVD-004', title: 'Vendor Questionnaire Response', fileName: 'vendor-response.docx', uploadedAt: '2024-03-01', status: 'uploaded', matchScore: undefined },
];

export const skills: SkillDefinition[] = [
    { id: 'skill-risk-gen', name: 'Risk Generator', shortDescription: 'Generate risks from requirements', description: 'Analyzes regulatory requirements and generates associated risks based on industry frameworks.', category: 'risk-management', icon: 'Target', status: 'active', usageCount: 147 },
    { id: 'skill-control-suggest', name: 'Control Suggester', shortDescription: 'Suggest controls for risks', description: 'Recommends appropriate controls based on identified risks and control frameworks.', category: 'control-design', icon: 'Shield', status: 'active', usageCount: 98 },
    { id: 'skill-procedure-gen', name: 'Procedure Generator', shortDescription: 'Generate control procedures', description: 'Creates detailed control procedures based on control objectives and best practices.', category: 'control-design', icon: 'Document', status: 'active', usageCount: 76 },
    { id: 'skill-evidence-analyzer', name: 'Evidence Analyzer', shortDescription: 'Analyze uploaded evidence', description: 'Extracts key fields from documents and matches them to controls.', category: 'evidence-analysis', icon: 'Search', status: 'active', usageCount: 234 },
    { id: 'skill-report-draft', name: 'Report Drafter', shortDescription: 'Draft compliance reports', description: 'Generates compliance report drafts based on current state and findings.', category: 'reporting', icon: 'Document', status: 'active', usageCount: 45 },
    { id: 'skill-completeness', name: 'Completeness Checker', shortDescription: 'Check control evidence completeness', description: 'Analyzes controls to identify missing evidence and documentation gaps.', category: 'evidence-analysis', icon: 'Checkmark', status: 'active', usageCount: 112 },
];

export const recipes: AutomationRecipe[] = [
    { id: 'recipe-001', name: 'New Regulation Onboarding', description: 'Automatically analyze new regulation, generate risks, and suggest controls.', steps: ['Parse regulation text', 'Identify requirements', 'Generate risks', 'Suggest controls'], skillIds: ['skill-risk-gen', 'skill-control-suggest'], category: 'Onboarding' },
    { id: 'recipe-002', name: 'Evidence Collection Reminder', description: 'Send reminders for upcoming evidence due dates and check completeness.', steps: ['Check due dates', 'Identify gaps', 'Send notifications'], skillIds: ['skill-completeness'], category: 'Monitoring' },
    { id: 'recipe-003', name: 'Quarterly Compliance Report', description: 'Generate quarterly compliance status report with all findings.', steps: ['Collect metrics', 'Analyze trends', 'Draft report'], skillIds: ['skill-report-draft'], category: 'Reporting' },
];

export const automationLogs: AutomationLogEntry[] = [
    { id: 'log-001', timestamp: '2024-03-27T10:34:00Z', skillId: 'skill-risk-gen', skillName: 'Risk Generator', action: 'Generated 4 risks', entityType: 'requirement', entityId: 'REQ-001', userId: 'user-1', outcome: 'partial', details: '3 accepted, 1 rejected' },
    { id: 'log-002', timestamp: '2024-03-27T10:32:00Z', skillId: 'skill-procedure-gen', skillName: 'Procedure Generator', action: 'Created procedure', entityType: 'control', entityId: 'CTL-002', userId: 'user-1', outcome: 'accepted' },
    { id: 'log-003', timestamp: '2024-03-27T10:30:00Z', skillId: 'skill-evidence-analyzer', skillName: 'Evidence Analyzer', action: 'Matched document', entityType: 'evidence', entityId: 'EVD-003', userId: 'system', outcome: 'auto-applied' },
    { id: 'log-004', timestamp: '2024-03-27T10:28:00Z', skillId: 'skill-report-draft', skillName: 'Report Drafter', action: 'Generated report', entityType: 'report', entityId: 'Q4-2024', userId: 'user-2', outcome: 'accepted', details: 'Edited and saved' },
];

export const automationJobs: AutomationJob[] = [
    { id: 'job-001', title: 'Analyze evidence batch', skillId: 'skill-evidence-analyzer', status: 'running', progress: 45, startedAt: '2024-03-27T10:33:00Z' },
    { id: 'job-002', title: 'Generate quarterly risks', skillId: 'skill-risk-gen', status: 'queued', progress: 0 },
    { id: 'job-003', title: 'Draft SOC 2 report', skillId: 'skill-report-draft', status: 'completed', progress: 100, startedAt: '2024-03-27T10:25:00Z', completedAt: '2024-03-27T10:27:00Z' },
];
