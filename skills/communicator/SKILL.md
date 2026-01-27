---
name: communicator
description: Manages outreach to humans. Sends Slack messages, Emails, or Jira comments to request approvals or notify of status.
---

# Communicator Skill

## Capabilities
Handles the "Human-in-the-Loop" interactions.

## Instructions

### 1. Approval Request
-   **Channel**: Slack / Microsoft Teams.
-   **Content**: "User X needs access to Y. Do you approve?"
-   **Interactive Elements**: [Approve] [Deny] buttons.

### 2. Notification
-   **Channel**: Email.
-   **Content**: Compliance Report summary or Breach Notification.

### 3. Escalation
-   **Logic**: If no response in 24h -> Nudge. If no response in 48h -> Escalate to Manager.

## Example Output
> **Message Sent**:
> -   **To**: `@security-manager` (Slack)
> -   **Type**: Approval Request
> -   **Status**: Waiting for response...
