---
name: event-listener
description: Monitors external sources (Email, Webhooks, Slack) for triggers like 'Termination', 'New Hire', or 'Alert'.
---

# Event Listener Skill

## Capabilities
Acts as the "ears" of the GRC Agent, listening for signals that require compliance action.

## Instructions

### 1. Webhook Processing
-   **Input**: JSON payload from IDP (Okta) or HRIS (Workday).
-   **Action**: Validate signature and parse event type.
-   **Events**:
    -   `user.lifecycle.terminate`: Prepare offboarding.
    -   `user.lifecycle.create`: Prepare onboarding.

### 2. Email Monitoring
-   **Input**: Email body/headers.
-   **Keywords**: "Termination", "Resignation", "Urgent Revoke".
-   **Extraction**: Identify Subject User, Effective Date, and Requestor.

### 3. Log Ingestion
-   **Input**: SIEM or System Logs.
-   **Match**: Patterns defined in `alert-rules.yaml`.

## Example Output
> **Event Detected**:
> -   **Source**: Workday Webhook
> -   **Type**: `TERMINATION`
> -   **Subject**: `john.doe@example.com`
> -   **Effective**: `IMMEDIATE`
> -   **Action**: Triggering `provisioner` skill...
