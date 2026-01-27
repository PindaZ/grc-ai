# UX Flows - Role-Based User Journeys

## Roles

### Risk Owner
**Responsibility**: Identify, assess, and monitor risks. Ensure risks are linked to controls.
**Primary areas**: Risks, Requirements, Home Dashboard

### Control Owner
**Responsibility**: Implement and maintain controls. Execute control activities and gather evidence.
**Primary areas**: Controls, Execution, Evidence, Home Dashboard

### Auditor
**Responsibility**: Review controls, evidence, and test results. Generate compliance reports.
**Primary areas**: Evidence & Testing, Reporting, all areas (read-heavy)

---

## Risk Owner Journeys

### Journey 1: Review New Requirement and Generate Risks
**Goal**: Analyze a new regulation and use AI to generate associated risks.

```
1. Home Dashboard
   └─ Click "3 new requirements" widget
2. Requirements List
   └─ Click on "GDPR Article 32" row
3. Requirement Detail
   ├─ Review requirement text
   ├─ Open AI Command Bar
   └─ Click "Generate risks" action
4. AI Modal: Generated Risks
   ├─ Review 4 suggested risks
   ├─ Accept 3, Reject 1
   └─ Click "Apply"
5. Requirement Detail
   └─ See 3 new linked risks in Related panel
6. Risk Detail (click through)
   └─ Review generated risk, edit if needed
```

**UI States**:
- AI sidebar shows: "This requirement has no linked risks yet"
- After generation: "3 risks linked"
- Rejected risk: Visual strikethrough, "Rejected" badge

### Journey 2: Assess Risk and Suggest Controls
**Goal**: Review a risk, set its score, and use AI to suggest controls.

```
1. Home Dashboard
   └─ Click "Risk heatmap" widget
2. Risks (Heatmap View)
   └─ Click on red cell (high impact/likelihood)
3. Risk Detail
   ├─ View current scoring (mock: Impact 4, Likelihood 5)
   ├─ Check linked controls (none)
   └─ Click "Suggest controls" in AI Command Bar
4. AI Drawer: Suggested Controls
   ├─ View 3 suggested controls with descriptions
   ├─ Click "Why this suggestion?" on each
   ├─ Accept 2 controls
   └─ Click "Create Controls"
5. Risk Detail
   └─ 2 new controls linked
6. Control Detail (click through)
   └─ New control created with AI-generated procedure
```

---

## Control Owner Journeys

### Journey 1: Execute Control Activity and Upload Evidence
**Goal**: Complete a control activity and attach evidence.

```
1. Home Dashboard
   └─ Click "My tasks" widget → "5 activities due"
2. Execution (Kanban)
   └─ See card "CTL-015: Quarterly Access Review" in "To do"
3. Drag card to "In progress"
4. Click card → Control Detail opens
5. Control Workstation (Procedure Tab)
   └─ Review procedure steps
6. Switch to Evidence Tab
   └─ Click "Upload evidence"
7. Evidence Upload Dropzone
   ├─ Drag file "Q4-access-review.xlsx"
   └─ Wait for "AI analyzing..."
8. Evidence Analyzer
   ├─ View extracted fields
   ├─ View matching score (92% match)
   └─ Click "Attach to Control"
9. Control Workstation (Evidence Tab)
   └─ New evidence attached
10. Execution (Kanban)
    └─ Card now in "Evidence submitted"
```

### Journey 2: Review AI Completeness Check and Fix Gap
**Goal**: Respond to AI-detected evidence gap.

```
1. Home Dashboard
   └─ See banner: "AI detected 3 controls with missing evidence"
   └─ Click "Review now"
2. Controls List (filtered: incomplete)
   └─ 3 controls shown
3. Click first control → Control Workstation
4. AI Sidebar shows:
   └─ "Missing: Approval signature on procedure"
   └─ "Suggested action: Upload signed document"
5. Click "Check completeness" in Command Bar
6. AI Modal: Completeness Report
   ├─ Required: 4 items
   ├─ Present: 3 items
   ├─ Missing: Approval document
   └─ Suggested fix link
7. Upload missing document
8. AI Sidebar updates: "All evidence complete ✓"
```

---

## Auditor Journeys

### Journey 1: Review Evidence and Validate Testing
**Goal**: Audit control evidence and record test results.

```
1. Home Dashboard (Auditor view)
   └─ Widget: "Pending reviews: 8"
   └─ Click widget
2. Evidence Inbox
   └─ Filter: "Pending review"
3. Click evidence item → Evidence Detail
   ├─ View attached file preview
   ├─ View AI-extracted summary
   └─ Review linked control
4. Testing Tab
   ├─ View test criteria
   ├─ Record test result: Pass/Fail
   └─ Add notes
5. Click "Complete Review"
6. Evidence moves to "Reviewed" status
```

### Journey 2: Generate Compliance Report
**Goal**: Draft an audit report using AI assistance.

```
1. Home Dashboard
   └─ Click "Reporting" in nav
2. Reporting Dashboard
   ├─ View compliance score widgets
   ├─ View coverage charts
   └─ Click "Draft report" in AI Command Bar
3. AI Drawer: Report Draft
   ├─ Generated executive summary
   ├─ Control coverage stats
   ├─ Risk summary
   ├─ Evidence gaps
   └─ Recommendations
4. Edit sections inline
5. Click "Export package"
6. Export Modal
   ├─ Select format (PDF/DOCX)
   ├─ Select sections to include
   └─ Click "Download"
7. Report downloaded (mock)
```

---

## Click Path Summary

| Role | Flow | Start | End | Key Actions |
|------|------|-------|-----|-------------|
| Risk Owner | 1 | Home | Risk Detail | Generate risks (AI), Accept/Reject |
| Risk Owner | 2 | Home | Control Detail | Suggest controls (AI), Create |
| Control Owner | 1 | Home | Execution | Upload evidence, AI analyze, Attach |
| Control Owner | 2 | Home | Control Detail | View AI gap, Upload fix |
| Auditor | 1 | Home | Evidence | Review, Test, Complete |
| Auditor | 2 | Home | Export | Draft report (AI), Export |

---

## State Transitions

### Control Activity Progress
```
To do → In progress → Evidence submitted → Review → Done
```

### Evidence Status
```
Uploaded → Analyzing → Analyzed → Attached → Reviewed
```

### AI Suggestion Status
```
Suggested → Accepted/Rejected → Applied
```

### Risk Linkage
```
Unlinked → AI Suggested → Linked
```
