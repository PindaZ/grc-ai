---
name: provisioner
description: Executes changes in target systems. Provisions/Deprovisions users in SaaS apps (AWS, GitHub, Slack) via APIs.
---

# Provisioner Skill

## Capabilities
The "hands" of the agent. Executes write interactions with external APIs to manage identity lifecycle.

## Instructions

### 1. Deprovisioning (Offboarding)
-   **Goal**: Revoke access immediately.
-   **Steps**:
    1.  **Suspend Account**: Set status to `Inactive`.
    2.  **Revoke Sessions**: Trigger `logout` or `revoke_token`.
    3.  **Transfer Assets**: Reassign Google Drive/GitHub repos to Manager.
-   **Safety**: If `User.Role == 'CEO'`, require `HumanApproval` before execution.

### 2. Provisioning (Onboarding)
-   **Goal**: Grant birthright access.
-   **Steps**:
    1.  Create Account.
    2.  Assign to default groups (e.g., `employees`, `wifi-users`).
    3.  Send Welcome Email with credentials.

## Example Output
> **Action Execution Report**:
> -   **Target**: `AWS IAM`
> -   **Action**: `DeactivateUser`
> -   **User**: `j.doe`
> -   **Status**: SUCCESS
> -   **Timestamp**: 2024-03-27T10:00:00Z
