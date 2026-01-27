# Component Library

Built on Microsoft Fluent UI React v9 (Fluent 2).

## Atoms
| Component | Purpose | Fluent Base |
|-----------|---------|-------------|
| StatusBadge | Entity status | Badge |
| ScoreIndicator | Visual score | ProgressBar |
| SeverityChip | Risk severity | Badge |
| AISparkleIcon | AI indicator | Custom SVG |

## Molecules
| Component | Purpose |
|-----------|---------|
| EntityCard | Summary card for entities |
| FilterBar | Search + filters + view toggle |
| DataTable | Sortable, selectable table |
| MetricWidget | Dashboard KPI display |
| RelatedPanel | Linked entities panel |
| SuggestionCard | AI suggestion with accept/reject |
| SkillBadge | AI skill indicator |
| TimelineEntry | Automation log entry |

## Organisms
| Component | Purpose |
|-----------|---------|
| NavSidebar | Primary navigation (collapsible) |
| TopBar | Breadcrumbs, notifications, user |
| AISidebar | Contextual AI panel (right side) |
| AICommandBar | Prompt input + quick actions |
| AIResponseDrawer | AI-generated content display |
| ControlWorkstation | Tabbed control detail view |
| KanbanBoard | Drag-and-drop execution board |
| EvidenceAnalyzer | Multi-step upload workflow |
| AutomationJobCard | Job status in queue |

## Templates
| Template | Used By |
|----------|---------|
| DashboardTemplate | Home, Reporting, Automation Hub |
| ListTemplate | Requirements, Risks, Controls, Evidence |
| DetailTemplate | Requirement, Risk detail pages |
| TabbedDetailTemplate | Control Workstation |
| KanbanTemplate | Control Execution |

## Folder Structure
```
components/
├── atoms/
├── molecules/
├── organisms/
└── templates/
```

## Fluent v9 Imports
```typescript
import { Button, Card, Table, Badge } from '@fluentui/react-components'
import { HomeRegular, WarningRegular } from '@fluentui/react-icons'
```
