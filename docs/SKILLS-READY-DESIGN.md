# Skills-Ready Design

## Concept Overview

The AI layer is designed to map to an Agent Skills architecture where:
- **Skills** are modular capability packages loaded dynamically
- **Progressive disclosure** shows summary first, details on demand
- **Auditability** records every AI action for review

This prototype builds the UI framework; real skills can be integrated later.

---

## 1. Skills Catalog UI

### Location
`/automation/skills` - accessible from AI Automation Hub

### Catalog Layout

#### Header
- Title: "AI Skills Catalog"
- Description: "Modular AI capabilities available in the platform"
- Search input
- Category filter pills

#### Skills Grid
- Cards layout (3-4 columns)
- Each card is a skill

#### Skill Card Structure
```
┌─────────────────────────────────┐
│ 🎯 [Skill Icon]                 │
│                                 │
│ Risk Generator                  │
│                                 │
│ Analyzes requirements and       │
│ generates associated risks      │
│                                 │
│ Category: Risk Management       │
│ Used: 147 times                 │
│                                 │
│ [View Details]  [Configure]     │
└─────────────────────────────────┘
```

### Skill Categories
- **Risk Management**: Risk generation, assessment, prioritization
- **Control Design**: Procedure generation, gap analysis
- **Evidence Analysis**: Document parsing, matching, extraction
- **Reporting**: Draft generation, summarization
- **Automation**: Scheduling, batch processing

### Skill Detail Page/Drawer

**Header**:
- Skill name + icon
- Category badge
- Status: Active/Inactive toggle

**Description Section**:
- What it does
- When it's used
- Example input/output

**Configuration**:
- Skill-specific settings (mock sliders, toggles)
- Trigger conditions

**Usage Stats**:
- Times invoked
- Acceptance rate
- Last used

**Recent Invocations**:
- Table of last 10 uses
- Entity, user, outcome, timestamp

---

## 2. Skills Manifest Schema

File: `/data/skills/manifest.json`

```typescript
interface ISkillManifest {
  version: string
  skills: ISkillDefinition[]
}

interface ISkillDefinition {
  id: string
  name: string
  description: string
  shortDescription: string
  category: SkillCategory
  icon: string
  triggers: SkillTrigger[]
  actions: SkillAction[]
  config: SkillConfig
  status: 'active' | 'inactive'
}

interface SkillTrigger {
  context: string  // e.g., "requirement-detail"
  condition?: string  // e.g., "no-linked-risks"
}

interface SkillAction {
  id: string
  label: string
  description: string
  inputSchema?: object
  outputType: 'suggestions' | 'draft' | 'analysis'
}

interface SkillConfig {
  autoSuggest: boolean
  requireApproval: boolean
  settings: Record<string, any>
}

type SkillCategory = 
  | 'risk-management'
  | 'control-design'
  | 'evidence-analysis'
  | 'reporting'
  | 'automation'
```

### Example Manifest Entry

```json
{
  "id": "risk-generator",
  "name": "Risk Generator",
  "description": "Analyzes regulatory requirements and generates associated risks based on industry frameworks and organizational context.",
  "shortDescription": "Generate risks from requirements",
  "category": "risk-management",
  "icon": "Target",
  "triggers": [
    { "context": "requirement-detail", "condition": "no-linked-risks" },
    { "context": "requirement-detail" }
  ],
  "actions": [
    {
      "id": "generate-risks",
      "label": "Generate Risks",
      "description": "Analyze requirement and suggest relevant risks",
      "outputType": "suggestions"
    }
  ],
  "config": {
    "autoSuggest": true,
    "requireApproval": true,
    "settings": {
      "maxSuggestions": 5,
      "includeRationale": true
    }
  },
  "status": "active"
}
```

---

## 3. "Skill Loaded" Indicator

### Purpose
Show users which skill is powering the current AI action.

### Location
- In AI Response Drawer header
- In AI Sidebar suggestion cards
- In Automation Log entries

### Visual Design
```
┌─────────────────────────────────────┐
│ 🎯 Risk Generator                   │
│ ───────────────────────────────────│
│ Generated 4 risks for REQ-001       │
│                                     │
│ [View Skill] [Why these?]          │
└─────────────────────────────────────┘
```

### Indicator States
- **Active**: Skill badge with icon + name
- **Loading**: Skill badge with spinner
- **Linked**: Click opens skill detail drawer

---

## 4. Progressive Disclosure UX

### Principle
Show summary first, allow expansion to full detail. Don't overwhelm.

### Three Levels

#### Level 1: Summary (Default)
- Suggestion title
- One-line description
- Accept/Reject buttons
- "Show more" link

#### Level 2: Details (Expanded)
- Full description
- Reasoning/rationale
- Related entities
- Confidence score

#### Level 3: Deep Dive (Linked)
- Skill detail page
- Full invocation history
- Configuration options

### Expansion Mechanics

**Accordion Pattern**:
- Click "Why this suggestion?" expands inline
- Click again collapses
- Only one expanded at a time (optional)

**Drawer Pattern**:
- "Learn more" opens right drawer
- Drawer shows full context
- Back button returns to list

### Example Flow

```
1. Sidebar shows: "Suggest controls for RISK-042"
   └─ [Accept] [Reject] [Why?]

2. User clicks [Why?]
   └─ Expands inline:
      "This risk relates to access management.
       Based on NIST CSF and your control library,
       3 existing controls could address this risk.
       Confidence: 87%"
      └─ [View Skill Details]

3. User clicks [View Skill Details]
   └─ Opens drawer with full skill info
```

---

## 5. Skill Invocation & Auditability

### Invocation Flow

```
User Action (e.g., "Generate Risks")
    ↓
Skill Loader identifies relevant skill
    ↓
AI Service invokes skill action
    ↓
Result displayed with skill badge
    ↓
User accepts/rejects/edits
    ↓
Action logged with skill ID
```

### Audit Log Entry Schema

```typescript
interface ISkillInvocation {
  id: string
  timestamp: Date
  skillId: string
  skillName: string
  actionId: string
  entityType: string
  entityId: string
  userId: string
  input: Record<string, any>
  output: {
    type: 'suggestions' | 'draft' | 'analysis'
    items: any[]
  }
  outcome: {
    status: 'accepted' | 'rejected' | 'partial' | 'modified' | 'auto-applied'
    acceptedItems?: string[]
    rejectedItems?: string[]
    modifications?: string
  }
  duration: number  // ms
}
```

### Automation Log UI

**Timeline Entry**:
```
┌───────────────────────────────────────────────────┐
│ 10:34 AM                                          │
│ ┌─────┐                                           │
│ │ 🎯  │ Risk Generator                            │
│ └─────┘                                           │
│ Generated 4 risks for REQ-001                     │
│                                                   │
│ Outcome: 3 accepted, 1 rejected                   │
│ User: @john.smith                                 │
│                                                   │
│ [View Details] [View Output] [View Skill]        │
└───────────────────────────────────────────────────┘
```

**Filters**:
- Skill type
- User
- Entity
- Outcome
- Date range

**Export**:
- Download as CSV
- Download as JSON (for audit purposes)

---

## 6. Skill Service Interface

```typescript
interface ISkillService {
  // Manifest operations
  getManifest(): Promise<ISkillManifest>
  getSkill(id: string): Promise<ISkillDefinition>
  getSkillsByCategory(category: SkillCategory): Promise<ISkillDefinition[]>
  
  // Context-aware loading
  getSkillsForContext(context: string): Promise<ISkillDefinition[]>
  
  // Invocation
  invoke(skillId: string, actionId: string, input: any): Promise<SkillResult>
  
  // Logging
  getInvocationHistory(filters?: InvocationFilters): Promise<ISkillInvocation[]>
  logOutcome(invocationId: string, outcome: InvocationOutcome): Promise<void>
}
```

### Mock Implementation Notes

- Load manifest from `/data/skills/manifest.json`
- `getSkillsForContext()` filters by trigger.context
- `invoke()` returns canned responses after fake delay
- Invocation history stored in-memory, resets on page refresh

---

## 7. Skills-Ready Checklist

- [ ] Skills manifest JSON file exists
- [ ] Skills catalog page renders all skills
- [ ] Skill detail drawer shows configuration
- [ ] AI actions show skill badge
- [ ] Suggestions show "Why?" expandable
- [ ] Automation log shows skill invocations
- [ ] Log entries include outcome tracking
- [ ] Progressive disclosure (3 levels) implemented
