# Information Architecture

## Sitemap

```
/                           → Home (Role-Based Dashboard)
├── /requirements           → Requirements & Regulations
│   └── /requirements/[id]  → Requirement Detail
├── /risks                  → Risk Register
│   └── /risks/[id]         → Risk Detail
├── /controls               → Controls Library
│   └── /controls/[id]      → Control Workstation
├── /execution              → Control Execution (Kanban)
├── /evidence               → Evidence & Testing
│   ├── /evidence/inbox     → Evidence Inbox
│   └── /evidence/analyze   → Evidence Analyzer
├── /reporting              → Reporting & Insights
│   └── /reporting/draft    → Report Draft (modal/page)
└── /automation             → AI Automation Hub
    ├── /automation/recipes → Automation Recipes
    ├── /automation/skills  → Skills Catalog
    └── /automation/logs    → Automation Logs
```

## Route Map

| Route | Page | Template |
|-------|------|----------|
| `/` | Home Dashboard | Dashboard |
| `/requirements` | Requirements List | List |
| `/requirements/[id]` | Requirement Detail | Detail |
| `/risks` | Risk Register | List + Heatmap |
| `/risks/[id]` | Risk Detail | Detail |
| `/controls` | Controls Library | List |
| `/controls/[id]` | Control Workstation | Tabbed Detail |
| `/execution` | Control Execution | Kanban |
| `/evidence` | Evidence Hub | List |
| `/evidence/inbox` | Evidence Inbox | List |
| `/evidence/analyze` | Evidence Analyzer | Workflow |
| `/reporting` | Reporting Dashboard | Dashboard |
| `/automation` | Automation Hub | Dashboard |
| `/automation/recipes` | Recipes Gallery | Cards |
| `/automation/skills` | Skills Catalog | Cards |
| `/automation/logs` | Automation Logs | Timeline |

## Navigation Structure

### Primary Navigation (Left Sidebar)
1. **Home** - Dashboard icon
2. **Requirements** - Document icon
3. **Risks** - Warning icon
4. **Controls** - Shield icon
5. **Execution** - Kanban icon
6. **Evidence** - Folder icon
7. **Reporting** - Chart icon
8. **Automation** - Robot icon

### Secondary Navigation
- Sub-routes appear as tabs or nested nav within sections
- Evidence: Inbox / Analyzer tabs
- Automation: Recipes / Skills / Logs tabs

### Utility Navigation (Top Bar)
- AI Command Bar (search/prompt)
- Notifications
- Role Switcher
- User Profile

## Breadcrumb Model

```
Home > [Section] > [Entity Name]
```

Examples:
- `Home > Requirements > REQ-001: GDPR Article 5`
- `Home > Risks > RISK-042: Data Breach`
- `Home > Controls > CTL-015: Access Control > Evidence`

### Breadcrumb Rules
1. Always start with "Home"
2. Section name matches primary nav
3. Entity name shows ID + title
4. Tab name appended for tabbed views
5. Max depth: 4 levels

## Domain Relationship Model

```
Requirement
    └── Risk (1:N)
          └── Control (1:N)
                └── Control Activity (1:N)
                      └── Evidence (1:N)
                            └── Testing (1:N)
```

### Cross-Link Panels

Each detail page shows "Related Items" panel:

| Page | Shows Related |
|------|--------------|
| Requirement | Risks |
| Risk | Requirements (parent), Controls |
| Control | Risks (parent), Activities, Evidence |
| Evidence | Control, Testing Results |

## Page Templates

### 1. Dashboard Template
- Grid of widgets/cards
- Quick action buttons
- Summary metrics
- Used by: Home, Reporting, Automation Hub

### 2. List Template
- Filter bar
- Data table with sorting
- Bulk actions toolbar
- Pagination
- Used by: Requirements, Risks, Controls, Evidence

### 3. Detail Template
- Header with title, status, actions
- Metadata panel
- Content area
- Related items panel
- Used by: Requirement, Risk

### 4. Tabbed Detail Template
- Same as Detail + tab navigation
- Used by: Control Workstation

### 5. Kanban Template
- Column headers
- Draggable cards
- Card quick-view
- Used by: Execution

### 6. Workflow Template
- Step indicators
- Form/upload areas
- Preview pane
- Used by: Evidence Analyzer

### 7. Cards/Gallery Template
- Grid of cards
- Category filters
- Used by: Recipes, Skills

### 8. Timeline Template
- Chronological list
- Filter by type/date
- Used by: Automation Logs

## Navigation Behaviors

### Sidebar
- Collapsible to icons only
- Active item highlighted
- Hover shows tooltip when collapsed

### AI Sidebar (Right)
- Collapsible
- Context changes based on current page
- Persists across navigation

### Modals/Drawers
- AI actions open in drawer (right side)
- Quick view opens in panel (right side)
- Confirmations use dialog modal

## URL State

Preserve in URL:
- Active filters
- Current tab
- Sort order
- Selected view (list/grid/heatmap)

Not in URL:
- Modal open state
- AI sidebar state
- Expanded/collapsed items
