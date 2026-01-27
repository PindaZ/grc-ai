# AI UX Layer Design

## Overview

AI is integrated as a core UX layer, not a bolt-on chat widget. Three primary surfaces:
1. **AI Sidebar** - Contextual suggestions (right side, collapsible)
2. **AI Command Bar** - Prompt input + quick actions (top)
3. **Agentic Automation UX** - Background process visibility

---

## 1. AI Sidebar

### Layout
- Position: Right side, collapsible
- Width: 320px expanded, 48px collapsed (icon only)
- Sections stacked vertically

### Sections

#### Header
- "AI Assistant" title
- Collapse/expand toggle
- Refresh button

#### Context Indicator
- Shows current page context
- Example: "📋 Viewing: REQ-001 GDPR Article 5"

#### Suggestions Panel
- Title: "Suggested Actions"
- List of 2-4 context-aware suggestions
- Each suggestion:
  - Icon + Action title
  - Brief description
  - "Accept" and "Dismiss" buttons
  - "Why?" expandable (shows reasoning)

#### Insights Panel
- Title: "AI Insights"
- Findings about current entity
- Example: "⚠️ 2 linked controls lack evidence"
- Click to navigate to relevant items

#### Recent Actions Panel
- Title: "Recent AI Actions"
- Last 3 AI actions on this entity
- Status: Applied, Rejected, Pending
- Timestamps

### Context Rules

| Current Page | Suggestions | Insights |
|--------------|-------------|----------|
| Home | "Prioritize risks", "Review due items" | Overall health metrics |
| Requirement | "Generate risks", "Map to framework" | Missing coverage |
| Risk | "Suggest controls", "Refine statement" | Severity assessment |
| Control | "Generate procedure", "Check completeness" | Evidence gaps |
| Evidence | "Analyze document", "Match to control" | Extraction summary |
| Reporting | "Draft report", "Summarize findings" | Report suggestions |
| Automation | "Run recipe", "Schedule job" | Job queue status |

### States

**Collapsed**:
- Shows AI icon with notification badge (if suggestions exist)

**Expanded (Default)**:
- All panels visible
- Scrollable if content overflows

**Loading**:
- Skeleton placeholders while AI "thinks"

**Empty**:
- "No suggestions for this context"
- Link to AI Automation Hub

---

## 2. AI Command Bar

### Layout
- Position: Top of content area (below breadcrumbs)
- Full width of content area
- Height: 48px

### Components

#### Prompt Input
- Placeholder: "Ask AI or type a command..."
- Icon: Sparkle/AI icon
- On focus: Shows recent prompts dropdown
- On enter: Opens response drawer

#### Quick Actions
- Row of pills/buttons
- Page-specific actions
- Click opens relevant AI modal/drawer

### Quick Actions by Page

| Page | Quick Actions |
|------|---------------|
| Home | "Summarize my tasks", "Prioritize work" |
| Requirements | "Generate risks", "Map to controls" |
| Risks | "Suggest controls", "Refine statement", "Assess severity" |
| Controls | "Generate procedure", "Check completeness", "Find evidence" |
| Execution | "Recommend priorities", "Flag overdue" |
| Evidence | "Analyze upload", "Match to control", "Extract fields" |
| Reporting | "Draft report", "Summarize gaps", "Compare periods" |
| Automation | "Run recipe", "Create workflow", "View logs" |

### Behaviors

**On Action Click**:
1. Show loading state (2s mock delay)
2. Open AI Response Drawer (right side, full height)
3. Display generated content
4. Show Accept/Reject/Edit controls

**On Free-form Prompt**:
1. Show loading state
2. Open AI Response Drawer
3. Display generated response
4. May include actionable items

---

## 3. AI Response Drawer

### Layout
- Position: Right side overlay
- Width: 480px
- Full height
- Closes on backdrop click or X

### Sections

#### Header
- Action name (e.g., "Generated Risks")
- Close button
- "Generating..." status during load

#### Content Area
- Rendered output (rich text, tables, lists)
- For suggestions: Checkbox list with Accept/Reject per item
- For drafts: Editable rich text

#### Reasoning Section (Collapsible)
- "Why these suggestions?"
- Explanation of AI logic
- Referenced sources/data

#### Actions
- Primary: "Apply Selected" / "Apply All"
- Secondary: "Edit", "Regenerate"
- Tertiary: "Cancel"

### Output Examples

**Generate Risks (Modal)**:
```
Generated 4 risks for REQ-001:

☑ RISK-101: Unauthorized data access
  Impact: High | Likelihood: Medium
  [Accept] [Reject] [Why?]

☑ RISK-102: Data breach via third party
  Impact: High | Likelihood: High
  [Accept] [Reject] [Why?]

☐ RISK-103: Consent management failure
  Impact: Medium | Likelihood: Medium
  [Accept] [Reject] [Why?]

☑ RISK-104: Incomplete data mapping
  Impact: Medium | Likelihood: High
  [Accept] [Reject] [Why?]

[Apply Selected (3)] [Regenerate]
```

**Draft Report (Modal)**:
```
# Q4 2024 Compliance Report

## Executive Summary
The organization maintained 94% control effectiveness...

## Key Findings
- 3 high-risk areas require attention
- 12 controls updated this quarter
- Evidence coverage: 89%

## Recommendations
1. Address access control gaps in System X
2. Update data retention procedures

[Edit in Full Screen] [Download Draft] [Apply]
```

---

## 4. Agentic Automation UX

### In-Product Banners
- Position: Top of content area, below command bar
- Dismissible, but persists until addressed
- Types:
  - Info (blue): "AI detected 3 controls ready for review"
  - Warning (yellow): "5 activities overdue"
  - Action (purple): "AI found evidence for 2 controls"

### Notification Panel
- Accessed via bell icon (top nav)
- Lists recent automation notifications
- Types:
  - Job completed
  - Suggestion ready
  - Item needs attention
- Click navigates to relevant item

### Automation Job Runner UI

**Queue View** (in Automation Hub):
```
Job Queue

[Running] Analyze evidence batch - 45% complete
[Queued]  Generate quarterly risks - Waiting
[Queued]  Update control mappings - Waiting

[Completed] Draft SOC 2 report - 2 min ago
[Completed] Evidence match for CTL-015 - 5 min ago
[Failed] Risk assessment - Retry available
```

**Job Progress States**:
- Queued: Gray, waiting indicator
- Running: Blue, progress bar, percentage
- Completed: Green, checkmark, actions
- Failed: Red, error message, retry button

### Automation Log Timeline

**Entry Structure**:
```
[Timestamp] [Skill Badge] [Action] [Entity] [User/System] [Outcome]
```

**Example Entries**:
```
10:34 AM | 🎯 Risk Generator | Generated 4 risks | REQ-001 | System | User accepted 3
10:32 AM | 📋 Procedure Gen  | Created procedure | CTL-022 | @john.doe | Applied
10:30 AM | 🔍 Evidence Match | Matched document  | CTL-015 | System | Auto-applied
10:28 AM | 📊 Report Draft   | Generated report  | Q4-2024 | @jane.smith | Edited & saved
```

**Filters**:
- By skill/type
- By entity
- By user
- By outcome (accepted/rejected/auto)
- By date range

---

## 5. Acceptance/Rejection UI States

### Suggestion Cards

**Default**:
- Normal styling
- Accept (primary) / Reject (secondary) buttons

**Accepted**:
- Green left border
- Checkmark icon
- "Accepted" badge
- "Undo" link

**Rejected**:
- Red left border
- Strikethrough title
- "Rejected" badge
- "Reconsider" link

**Applied**:
- Dimmed styling
- "Applied to [entity]" text
- Timestamp

### Bulk Actions

When multiple suggestions:
- "Accept All" button
- "Reject All" button
- Selected count indicator
- "Apply X selected" primary action

---

## 6. Loading & Empty States

### AI Loading
- Skeleton placeholders in sidebar
- "Thinking..." animation in command bar
- Spinner with "Generating..." in drawer

### Empty States

**No Suggestions**:
- Illustration + "All caught up!"
- "AI has no suggestions for this context"
- Link to Automation Hub

**No Results**:
- "No matches found"
- "Try refining your request"

**Error State**:
- "Something went wrong"
- "Retry" button
- Error code for debugging

---

## 7. Mock Implementation Notes

All AI features use:
- 1.5-2.5 second fake delays (random)
- Pre-defined response fixtures
- Local state updates (no persistence)
- Deterministic outputs (same input → same output)

AI Service Interface:
```typescript
interface IAIService {
  suggest(context: AIContext): Promise<Suggestion[]>
  generate(action: string, entity: Entity): Promise<GeneratedContent>
  analyze(document: File): Promise<AnalysisResult>
  draft(type: string, data: any): Promise<DraftContent>
  explain(suggestion: Suggestion): Promise<string>
}
```
