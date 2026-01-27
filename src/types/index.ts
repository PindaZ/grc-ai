// Domain models for the Compliance Automation Platform

export type UserRole = 'risk-owner' | 'control-owner' | 'auditor';

export interface Requirement {
  id: string;
  title: string;
  description: string;
  source: string;
  status: 'active' | 'draft' | 'archived';
  linkedRiskIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Risk {
  id: string;
  title: string;
  description: string;
  impact: 1 | 2 | 3 | 4 | 5;
  likelihood: 1 | 2 | 3 | 4 | 5;
  status: 'identified' | 'assessed' | 'mitigated' | 'accepted';
  linkedRequirementIds: string[];
  linkedControlIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Control {
  id: string;
  title: string;
  description: string;
  procedure: string;
  status: 'draft' | 'active' | 'deprecated';
  linkedRiskIds: string[];
  linkedEvidenceIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ControlActivity {
  id: string;
  controlId: string;
  title: string;
  dueDate: string;
  status: 'todo' | 'in-progress' | 'evidence-submitted' | 'review' | 'done';
  assigneeId: string;
}

export interface Evidence {
  id: string;
  title: string;
  fileName: string;
  uploadedAt: string;
  status: 'uploaded' | 'analyzing' | 'analyzed' | 'attached' | 'reviewed';
  linkedControlId?: string;
  assignedTo?: string;
  extractedData?: Record<string, string>;
  matchScore?: number;
}

export interface TestResult {
  id: string;
  evidenceId: string;
  testDate: string;
  result: 'pass' | 'fail' | 'partial';
  notes: string;
  testerId: string;
}

export interface AutomationJob {
  id: string;
  title: string;
  skillId: string;
  status: 'queued' | 'running' | 'completed' | 'failed';
  progress: number;
  startedAt?: string;
  completedAt?: string;
  error?: string;
}

export interface AutomationLogEntry {
  id: string;
  timestamp: string;
  skillId: string;
  skillName: string;
  action: string;
  entityType: string;
  entityId: string;
  userId: string;
  outcome: 'accepted' | 'rejected' | 'partial' | 'auto-applied';
  details?: string;
}

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  reasoning?: string;
  skillId: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface SkillDefinition {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  category: 'risk-management' | 'control-design' | 'evidence-analysis' | 'reporting' | 'automation' | 'access-management' | 'vendor-risk' | 'regulatory' | 'legal' | 'audit' | 'policy' | 'incident' | 'privacy' | 'ethics';
  icon: string;
  status: 'active' | 'inactive';
  usageCount: number;
  schedule?: string;
  lastRun?: string;
  nextRun?: string;
}

export interface AutomationRecipe {
  id: string;
  name: string;
  description: string;
  steps: string[];
  skillIds: string[];
  category: string;
}

// AI Finding from automated control checks
export interface AIFinding {
  id: string;
  skillId: string;
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  entity: string;
  document?: string;
  currentState?: string;
  expectedState?: string;
  recommendation: string;
  controlMapping?: string;
  linkedPolicy?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'investigating';
  detectedAt: string;
  resolvedAt?: string;
  resolvedBy?: string;
}

// Automation run history
export interface AutomationRun {
  id: string;
  skillId: string;
  status: 'running' | 'completed' | 'failed';
  startedAt: string;
  completedAt?: string;
  findingsCount: number;
  resolvedCount: number;
  pendingCount: number;
  error?: string;
}

export interface ChangeApproval {
  id: string;
  approverId: string;
  role: 'peer' | 'manager' | 'security' | 'cab';
  status: 'pending' | 'approved' | 'rejected';
  timestamp?: string;
  comment?: string;
}

export interface ChangeRequest {
  id: string;
  title: string;
  description: string;
  service: string;
  requester: string;
  status: 'draft' | 'pending-approval' | 'approved' | 'rejected' | 'implemented';
  type: 'standard' | 'normal' | 'emergency';
  riskLevel: 'low' | 'medium' | 'high';
  createdAt: string;
  scheduledFor: string;
  approvals: ChangeApproval[];
  linkedTickets?: string[];
  pipelineUrl?: string;
  deploymentStatus?: 'success' | 'failure' | 'pending';
}

export interface AgentAction {
  id: string;
  controlId: string;
  type: 'suggestion' | 'decision' | 'task';
  title: string;
  description: string;
  reasoning: string;
  status: 'pending' | 'accepted' | 'rejected' | 'executed';
  timestamp: string;
}

export interface AgentEvent {
  id: string;
  controlId: string;
  type: 'listening' | 'analyzing' | 'action' | 'evidence' | 'alert';
  message: string;
  timestamp: string;
  details?: string;
}
