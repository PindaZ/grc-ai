
import { Requirement, Risk, Control, ControlActivity, Evidence, SkillDefinition, AutomationRecipe, AutomationLogEntry, AutomationJob, ChangeRequest, AgentAction, AgentEvent } from '@/types';

// ==========================================
// 1. REQUIREMENTS (ISO, SOC 2, GDP, NIST)
// ==========================================
export const requirements: Requirement[] = [
    // Change Management Domain
    { id: 'REQ-CM-01', title: 'ISO 27001 A.12.1.2 - Change Management', description: 'Changes to information processing facilities and systems shall be controlled.', source: 'ISO 27001', status: 'active', linkedRiskIds: ['RISK-CM-01', 'RISK-CM-02'], createdAt: '2024-01-10', updatedAt: '2024-01-10' },
    { id: 'REQ-CM-02', title: 'SOC 2 CC8.1 - Authorization of Changes', description: 'The entity authorizes, designs, develops or acquires, configures, documents, tests, approves, and implements changes.', source: 'SOC 2', status: 'active', linkedRiskIds: ['RISK-CM-01'], createdAt: '2024-01-10', updatedAt: '2024-01-10' },
    { id: 'REQ-CM-03', title: 'NIST PR.IP-3 - Configuration Change Control', description: 'Configuration change control processes are in place.', source: 'NIST CSF', status: 'active', linkedRiskIds: ['RISK-CM-03'], createdAt: '2024-01-10', updatedAt: '2024-01-10' },

    // Privacy Domain
    { id: 'REQ-PRIV-01', title: 'GDPR Art 17 - Right to Erasure', description: 'The data subject shall have the right to obtain from the controller the erasure of personal data.', source: 'GDPR', status: 'active', linkedRiskIds: ['RISK-PRIV-01'], createdAt: '2024-01-15', updatedAt: '2024-01-15' },
    { id: 'REQ-PRIV-02', title: 'CCPA 1798.105 - Deletion Rights', description: 'A consumer shall have the right to request that a business delete any personal information about the consumer.', source: 'CCPA', status: 'active', linkedRiskIds: ['RISK-PRIV-01'], createdAt: '2024-01-15', updatedAt: '2024-01-15' },
    { id: 'REQ-PRIV-03', title: 'ISO 27001 A.18.1.4 - Privacy', description: 'Privacy and protection of personally identifiable information shall be ensured.', source: 'ISO 27001', status: 'active', linkedRiskIds: ['RISK-PRIV-02'], createdAt: '2024-01-15', updatedAt: '2024-01-15' },

    // Logical Access Domain
    { id: 'REQ-ACC-01', title: 'SOC 2 CC6.1 - Logical Access Security', description: 'The entity implements logical access security software, infrastructure, and architectures.', source: 'SOC 2', status: 'active', linkedRiskIds: ['RISK-ACC-01', 'RISK-ACC-02'], createdAt: '2024-01-20', updatedAt: '2024-01-20' },
    { id: 'REQ-ACC-02', title: 'ISO 27001 A.9.2.1 - User Registration', description: 'A formal user registration and de-registration process shall be implemented.', source: 'ISO 27001', status: 'active', linkedRiskIds: ['RISK-ACC-01'], createdAt: '2024-01-20', updatedAt: '2024-01-20' },
    { id: 'REQ-ACC-03', title: 'NIST PR.AC-6 - Least Privilege', description: 'Identity management, authentication and access control are implemented consistent with least privilege.', source: 'NIST CSF', status: 'active', linkedRiskIds: ['RISK-ACC-03'], createdAt: '2024-01-20', updatedAt: '2024-01-20' },

    // Physical Security Domain
    { id: 'REQ-PHYS-01', title: 'ISO 27001 A.11.1.1 - Physical Perimeter', description: 'Security perimeters shall be defined and used to protect information processing facilities.', source: 'ISO 27001', status: 'active', linkedRiskIds: ['RISK-PHYS-01'], createdAt: '2024-02-01', updatedAt: '2024-02-01' },
    { id: 'REQ-PHYS-02', title: 'SOC 2 CC6.4 - Physical Access', description: 'The entity restricts physical access to facilities and protected information assets.', source: 'SOC 2', status: 'active', linkedRiskIds: ['RISK-PHYS-02'], createdAt: '2024-02-01', updatedAt: '2024-02-01' },

    // Vendor Management Domain
    { id: 'REQ-VEND-01', title: 'ISO 27001 A.15.1.1 - Supplier Policy', description: 'Information security requirements for mitigating the risks associated with suppliers\' access.', source: 'ISO 27001', status: 'active', linkedRiskIds: ['RISK-VEND-01'], createdAt: '2024-02-05', updatedAt: '2024-02-05' },
    { id: 'REQ-VEND-02', title: 'SOC 2 CC9.2 - Vendor Risk', description: 'The entity assesses and manages risks associated with vendors and business partners.', source: 'SOC 2', status: 'active', linkedRiskIds: ['RISK-VEND-02'], createdAt: '2024-02-05', updatedAt: '2024-02-05' },

    // Asset Management
    { id: 'REQ-AST-01', title: 'ISO 27001 A.8.1.1 - Inventory of Assets', description: 'Assets associated with information and information processing facilities shall be identified.', source: 'ISO 27001', status: 'draft', linkedRiskIds: ['RISK-AST-01'], createdAt: '2024-03-01', updatedAt: '2024-03-01' },

    // Incident Management
    { id: 'REQ-INC-01', title: 'ISO 27001 A.16.1.2 - Reporting Events', description: 'Information security events shall be reported through appropriate management channels.', source: 'ISO 27001', status: 'active', linkedRiskIds: ['RISK-INC-01'], createdAt: '2024-03-05', updatedAt: '2024-03-05' },
];

// ==========================================
// 2. RISKS (Linked to Requirements)
// ==========================================
export const risks: Risk[] = [
    // Change Management Risks
    { id: 'RISK-CM-01', title: 'Unauthorized Production Changes', description: 'Risk of unapproved or untested code causing system instability.', impact: 5, likelihood: 4, status: 'mitigated', linkedRequirementIds: ['REQ-CM-01', 'REQ-CM-02'], linkedControlIds: ['CTL-CM-01', 'CTL-CM-02'], createdAt: '2024-01-10', updatedAt: '2024-01-10' },
    { id: 'RISK-CM-02', title: 'Malicious Code Injection', description: 'Insider threat injecting malicious code into build pipeline.', impact: 5, likelihood: 2, status: 'mitigated', linkedRequirementIds: ['REQ-CM-01'], linkedControlIds: ['CTL-CM-02', 'CTL-CM-03'], createdAt: '2024-01-10', updatedAt: '2024-01-10' },
    { id: 'RISK-CM-03', title: 'Lack of Backout Plan', description: 'Inability to revert failed changes leads to prolonged outages.', impact: 4, likelihood: 3, status: 'assessed', linkedRequirementIds: ['REQ-CM-03'], linkedControlIds: ['CTL-CM-01'], createdAt: '2024-01-10', updatedAt: '2024-01-10' },

    // Privacy Risks
    { id: 'RISK-PRIV-01', title: 'Failure to Honor Deletion Requests', description: 'Legal penalties due to failure to delete user data within non-compliance window.', impact: 5, likelihood: 3, status: 'mitigated', linkedRequirementIds: ['REQ-PRIV-01', 'REQ-PRIV-02'], linkedControlIds: ['CTL-PRIV-01'], createdAt: '2024-01-15', updatedAt: '2024-01-15' },
    { id: 'RISK-PRIV-02', title: 'Data Leakage in Lower Envs', description: 'Production PII leaked into staging/dev environments.', impact: 4, likelihood: 4, status: 'identified', linkedRequirementIds: ['REQ-PRIV-03'], linkedControlIds: [], createdAt: '2024-01-15', updatedAt: '2024-01-15' },

    // Access Risks
    { id: 'RISK-ACC-01', title: 'Terminated Employee Access', description: 'Former employees retain access to systems after departure.', impact: 4, likelihood: 3, status: 'mitigated', linkedRequirementIds: ['REQ-ACC-01', 'REQ-ACC-02'], linkedControlIds: ['CTL-ACC-01'], createdAt: '2024-01-20', updatedAt: '2024-01-20' },
    { id: 'RISK-ACC-02', title: 'Excessive Privileges', description: 'Users granted more permissions than necessary for their role.', impact: 3, likelihood: 5, status: 'mitigated', linkedRequirementIds: ['REQ-ACC-01', 'REQ-ACC-03'], linkedControlIds: ['CTL-ACC-02'], createdAt: '2024-01-20', updatedAt: '2024-01-20' },
    { id: 'RISK-ACC-03', title: 'Shared Account Abuse', description: 'Inability to attribute actions to specific users due to shared logins.', impact: 3, likelihood: 4, status: 'accepted', linkedRequirementIds: ['REQ-ACC-03'], linkedControlIds: [], createdAt: '2024-01-20', updatedAt: '2024-01-20' },

    // Physical Risks
    { id: 'RISK-PHYS-01', title: 'unauthorized Physical Entry', description: 'Tailgating allows unauthorized persons into server rooms.', impact: 5, likelihood: 2, status: 'mitigated', linkedRequirementIds: ['REQ-PHYS-01', 'REQ-PHYS-02'], linkedControlIds: ['CTL-PHYS-01'], createdAt: '2024-02-01', updatedAt: '2024-02-01' },
    { id: 'RISK-PHYS-02', title: 'Environmental Damage', description: 'Server failure due to overheating or water damage.', impact: 5, likelihood: 1, status: 'mitigated', linkedRequirementIds: ['REQ-PHYS-02'], linkedControlIds: ['CTL-PHYS-02'], createdAt: '2024-02-01', updatedAt: '2024-02-01' },

    // Vendor Risks
    { id: 'RISK-VEND-01', title: 'Supply Chain Compromise', description: 'Attacker compromises a vendor to gain access to our data.', impact: 5, likelihood: 3, status: 'mitigated', linkedRequirementIds: ['REQ-VEND-01'], linkedControlIds: ['CTL-VEND-01'], createdAt: '2024-02-05', updatedAt: '2024-02-05' },
    { id: 'RISK-VEND-02', title: 'Vendor Insolvency', description: 'Critical vendor goes out of business causing service disruption.', impact: 4, likelihood: 2, status: 'assessed', linkedRequirementIds: ['REQ-VEND-02'], linkedControlIds: ['CTL-VEND-02'], createdAt: '2024-02-05', updatedAt: '2024-02-05' },

    // Asset
    { id: 'RISK-AST-01', title: 'Shadow IT', description: 'Use of unauthorized software leading to data exfiltration.', impact: 3, likelihood: 5, status: 'identified', linkedRequirementIds: ['REQ-AST-01'], linkedControlIds: [], createdAt: '2024-03-01', updatedAt: '2024-03-01' },

    // Incident
    { id: 'RISK-INC-01', title: 'Undetected Data Breach', description: 'Attacker resides in network undetected for long periods.', impact: 5, likelihood: 3, status: 'mitigated', linkedRequirementIds: ['REQ-INC-01'], linkedControlIds: ['CTL-INC-01'], createdAt: '2024-03-05', updatedAt: '2024-03-05' },
];

// ==========================================
// 3. CONTROLS (Multi-mapped)
// ==========================================
export const controls: Control[] = [
    // Change Management
    { id: 'CTL-CM-01', title: 'CAB Approval Process', description: 'All normal changes must be approved by the Change Advisory Board.', procedure: '1. Create ticket\n2. Attach risk analysis\n3. CAB vote\n4. Deploy', status: 'active', linkedRiskIds: ['RISK-CM-01', 'RISK-CM-03'], linkedEvidenceIds: ['EVD-CM-01'], createdAt: '2024-01-12', updatedAt: '2024-01-12' },
    { id: 'CTL-CM-02', title: 'CI/CD Automated Gates', description: 'Pipeline blocks deployment if unit tests or security scans fail.', procedure: '1. Commit code\n2. Run pipeline\n3. Pass SAST/Tests', status: 'active', linkedRiskIds: ['RISK-CM-01', 'RISK-CM-02'], linkedEvidenceIds: ['EVD-CM-02'], createdAt: '2024-01-12', updatedAt: '2024-01-12' },
    { id: 'CTL-CM-03', title: 'Pull Request Peer Review', description: 'Code changes require approval from 1 peer code owner.', procedure: '1. Open PR\n2. Peer Review\n3. Merge', status: 'active', linkedRiskIds: ['RISK-CM-02'], linkedEvidenceIds: ['EVD-CM-03', 'EVD-CM-04'], createdAt: '2024-01-12', updatedAt: '2024-01-12' },

    // Privacy
    { id: 'CTL-PRIV-01', title: 'Automated Account Deletion', description: 'Script runs daily to identify and purge accounts marked for deletion > 30 days.', procedure: '1. Mark for deletion\n2. Wait 30 days\n3. Hard delete', status: 'active', linkedRiskIds: ['RISK-PRIV-01'], linkedEvidenceIds: ['EVD-PRIV-01'], createdAt: '2024-01-18', updatedAt: '2024-01-18' },

    // Access
    { id: 'CTL-ACC-01', title: 'Offboarding Automation', description: 'HR system triggers deprovisioning within 24 hours of termination date.', procedure: '1. HR update\n2. IDP Webhook\n3. Revoke access', status: 'active', linkedRiskIds: ['RISK-ACC-01'], linkedEvidenceIds: ['EVD-ACC-01'], createdAt: '2024-01-22', updatedAt: '2024-01-22' },
    { id: 'CTL-ACC-02', title: 'Quarterly Access Review', description: 'Managers review access lists for their direct reports every 90 days.', procedure: '1. Generate list\n2. Send to manager\n3. Revoke/Keep', status: 'active', linkedRiskIds: ['RISK-ACC-02'], linkedEvidenceIds: ['EVD-ACC-02'], createdAt: '2024-01-22', updatedAt: '2024-01-22' },

    // Physical
    { id: 'CTL-PHYS-01', title: 'Biometric Data Center Access', description: 'Two-factor authentication (Badge + Bio) required for server room.', procedure: '1. Tap badge\n2. Scan fingerprint', status: 'active', linkedRiskIds: ['RISK-PHYS-01'], linkedEvidenceIds: [], createdAt: '2024-02-02', updatedAt: '2024-02-02' },
    { id: 'CTL-PHYS-02', title: 'UPS Maintenance Schedule', description: 'Quarterly testing and maintenance of UPS batteries.', procedure: '1. Vendor visit\n2. Test load\n3. Report', status: 'active', linkedRiskIds: ['RISK-PHYS-02'], linkedEvidenceIds: [], createdAt: '2024-02-02', updatedAt: '2024-02-02' },

    // Vendor
    { id: 'CTL-VEND-01', title: 'Vendor Security Review', description: 'Annual review of vendor SOC 2 and security posture.', procedure: '1. Request report\n2. Review exceptions\n3. Sign-off', status: 'active', linkedRiskIds: ['RISK-VEND-01'], linkedEvidenceIds: ['EVD-VEND-01'], createdAt: '2024-02-10', updatedAt: '2024-02-10' },
    { id: 'CTL-VEND-02', title: 'Vendor Business Continuity Check', description: 'Validate vendor holds sufficient insurance and BC plans.', procedure: '1. Check contract\n2. Verify insurance', status: 'draft', linkedRiskIds: ['RISK-VEND-02'], linkedEvidenceIds: [], createdAt: '2024-02-10', updatedAt: '2024-02-10' },

    // Incident
    { id: 'CTL-INC-01', title: 'SIEM Alerting Rules', description: 'Automated alerts for suspicious network activity.', procedure: '1. Ingest logs\n2. Match rules\n3. Alert SOC', status: 'active', linkedRiskIds: ['RISK-INC-01'], linkedEvidenceIds: [], createdAt: '2024-03-05', updatedAt: '2024-03-05' }
];

// ==========================================
// 4. CONTROL ACTIVITIES (Tasks)
// ==========================================
export const controlActivities: ControlActivity[] = [
    { id: 'ACT-001', controlId: 'CTL-ACC-02', title: 'Q1 User Access Review', dueDate: '2024-03-31', status: 'in-progress', assigneeId: 'user-1' },
    { id: 'ACT-002', controlId: 'CTL-CM-01', title: 'Review Emergency Changes', dueDate: '2024-03-15', status: 'done', assigneeId: 'user-3' },
    { id: 'ACT-003', controlId: 'CTL-VEND-01', title: 'AWS SOC 2 Review', dueDate: '2024-04-15', status: 'todo', assigneeId: 'user-2' },
    { id: 'ACT-004', controlId: 'CTL-PHYS-02', title: 'Q2 UPS Maintenance', dueDate: '2024-06-30', status: 'todo', assigneeId: 'user-4' },
    { id: 'ACT-005', controlId: 'CTL-PRIV-01', title: 'Verify Data Purge Logs', dueDate: '2024-04-01', status: 'todo', assigneeId: 'user-1' },
    { id: 'ACT-006', controlId: 'CTL-ACC-01', title: 'Offboarding Audit (Feb)', dueDate: '2024-03-01', status: 'evidence-submitted', assigneeId: 'user-2' },
];

// ==========================================
// 5. EVIDENCE (Docs)
// ==========================================
export const evidence: Evidence[] = [
    { id: 'EVD-CM-01', title: 'CAB Meeting Minutes - March', fileName: 'cab-mins-mar.pdf', uploadedAt: '2024-03-10', status: 'reviewed', linkedControlId: 'CTL-CM-01', matchScore: 100, assignedTo: 'user-1' },
    { id: 'EVD-CM-02', title: 'CI/CD Pipeline Log #4022', fileName: 'build-log-4022.txt', uploadedAt: '2024-03-12', status: 'analyzed', linkedControlId: 'CTL-CM-02', matchScore: 98, assignedTo: 'system' },
    { id: 'EVD-CM-03', title: 'GitHub PR #2345', fileName: 'pr-2345.json', uploadedAt: '2024-03-15', status: 'analyzed', linkedControlId: 'CTL-CM-03', matchScore: 100, assignedTo: 'system' },
    { id: 'EVD-CM-04', title: 'Branch Protection Rules', fileName: 'branch-protection.png', uploadedAt: '2024-03-15', status: 'reviewed', linkedControlId: 'CTL-CM-03', matchScore: 100, assignedTo: 'user-3' },
    { id: 'EVD-ACC-01', title: 'Terminated User Report', fileName: 'term-report-jan.csv', uploadedAt: '2024-02-01', status: 'reviewed', linkedControlId: 'CTL-ACC-01', matchScore: 95, assignedTo: 'user-2' },
    { id: 'EVD-ACC-02', title: 'Access Review Attestation', fileName: 'uar-engineering.pdf', uploadedAt: '2024-01-30', status: 'attached', linkedControlId: 'CTL-ACC-02', matchScore: 85, assignedTo: 'user-1' },
    { id: 'EVD-PRIV-01', title: 'Deletion Script Output', fileName: 'del-log-2024.log', uploadedAt: '2024-03-28', status: 'analyzing', linkedControlId: 'CTL-PRIV-01', matchScore: undefined, assignedTo: 'system' },
    { id: 'EVD-VEND-01', title: 'AWS SOC 2 Type II Bridge Letter', fileName: 'aws-bridge-letter.pdf', uploadedAt: '2024-01-05', status: 'reviewed', linkedControlId: 'CTL-VEND-01', matchScore: 92, assignedTo: 'user-3' },
];

// ==========================================
// 6. CHANGE REQUESTS
// ==========================================
export const changeRequests: ChangeRequest[] = [
    {
        id: 'CR-2024-001',
        title: 'Upgrade Database to v14',
        description: 'Upgrade the primary production database to version 14 to fix security vulnerabilities.',
        service: 'Core Database',
        requester: 'user-3',
        status: 'pending-approval',
        type: 'normal',
        riskLevel: 'medium',
        createdAt: '2024-03-25T09:00:00Z',
        scheduledFor: '2024-04-01T02:00:00Z',
        linkedTickets: ['JIRA-4022', 'JIRA-4025'],
        approvals: [
            { id: 'app-1', approverId: 'user-manager', role: 'manager', status: 'approved', timestamp: '2024-03-26T10:00:00Z', comment: 'Approved for Q2 window' },
            { id: 'app-2', approverId: 'user-sec', role: 'security', status: 'pending' },
            { id: 'app-3', approverId: 'cal-cab', role: 'cab', status: 'pending' }
        ]
    },
    {
        id: 'CR-2024-002',
        title: 'Hotfix: Payment Gateway Timeout',
        description: 'Increase timeout settings for payment gateway to prevent transaction failures during load.',
        service: 'Payment Service',
        requester: 'user-4',
        status: 'implemented',
        type: 'emergency',
        riskLevel: 'high',
        createdAt: '2024-03-20T14:30:00Z',
        scheduledFor: '2024-03-20T15:00:00Z',
        linkedTickets: ['INC-9021'],
        deploymentStatus: 'success',
        approvals: [
            { id: 'app-4', approverId: 'user-lead', role: 'manager', status: 'approved', timestamp: '2024-03-20T14:45:00Z' },
            { id: 'app-5', approverId: 'user-sec', role: 'security', status: 'approved', timestamp: '2024-03-20T14:50:00Z', comment: 'Emergency approval granted' }
        ]
    },
    {
        id: 'CR-2024-003',
        title: 'Update Frontend Assets',
        description: 'Routine update of static assets and content for the landing page.',
        service: 'Frontend Web',
        requester: 'user-5',
        status: 'approved',
        type: 'standard',
        riskLevel: 'low',
        createdAt: '2024-03-27T08:00:00Z',
        scheduledFor: '2024-03-29T10:00:00Z',
        approvals: []
    }
];


// ==========================================
// 7. SKILLS & RECIPES (Unchanged mainly)
// ==========================================
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

export const agentActions: AgentAction[] = [
    {
        id: 'AA-001',
        controlId: 'CTL-ACC-02',
        type: 'decision',
        title: 'Approve Remediation Draft',
        description: 'AI has detected 3 unauthorized users in the Q1 access review. A draft email to their managers is ready.',
        reasoning: 'Proactive remediation reduces risk exposure time for excessive privileges.',
        status: 'pending',
        timestamp: '2024-03-27T14:20:00Z'
    },
    {
        id: 'AA-002',
        controlId: 'CTL-ACC-02',
        type: 'suggestion',
        title: 'Automate Evidence Collection',
        description: 'I can connect to the Azure AD API to automate the quarterly user list generation.',
        reasoning: 'Connectors for Azure AD already exist in the environment. This would increase automation score by 15%.',
        status: 'pending',
        timestamp: '2024-03-27T15:05:00Z'
    },
    {
        id: 'AA-003',
        controlId: 'CTL-CM-03',
        type: 'decision',
        title: 'Flag Suspicious PR Bypass',
        description: 'PR #2345 was merged without approvals. A rollback or exemption is required.',
        reasoning: 'Policy dictates 1 peer review. Bypassing this is a CRITICAL violation.',
        status: 'pending',
        timestamp: '2024-03-27T14:30:00Z'
    }
];

export const agentEvents: AgentEvent[] = [
    { id: 'AE-001', controlId: 'CTL-ACC-02', type: 'listening', message: 'Monitoring Azure AD audit logs for access changes...', timestamp: '2024-03-27T16:00:00Z' },
    { id: 'AE-002', controlId: 'CTL-ACC-02', type: 'evidence', message: 'Auto-collected Q1 Engineering Access List from Azure AD.', timestamp: '2024-03-27T15:30:00Z' },
    { id: 'AE-003', controlId: 'CTL-ACC-02', type: 'analyzing', message: 'Analyzing match between policy REQ-ACC-03 and collected evidence.', timestamp: '2024-03-27T15:35:00Z' },
    { id: 'AE-004', controlId: 'CTL-ACC-02', type: 'alert', message: 'Detected 3 users with "Global Admin" role who have not logged in for 60 days.', timestamp: '2024-03-27T15:40:00Z', details: 'Users: j.doe, s.smith, t.brown' },

    { id: 'AE-005', controlId: 'CTL-CM-03', type: 'listening', message: 'Watching GitHub repository "core-backend" for Pull Request events...', timestamp: '2024-03-27T18:00:00Z' },
    { id: 'AE-006', controlId: 'CTL-CM-03', type: 'alert', message: 'PR #2345 merged by "superuser-admin" without required reviews.', timestamp: '2024-03-27T14:28:00Z' },
    { id: 'AE-007', controlId: 'CTL-CM-03', type: 'analyzing', message: 'Comparing PR metadata against "Require Peer Review" policy.', timestamp: '2024-03-27T14:29:00Z' },

];
