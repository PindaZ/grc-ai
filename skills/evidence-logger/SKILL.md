---
name: evidence-logger
description: Captures immutable proof of compliance actions. Screenshots, log exports, and cryptographic snapshots.
---

# Evidence Logger Skill

## Capabilities
Ensures that every action taken by the agent is audit-ready and defensible.

## Instructions

### 1. Snapshot Capture
-   **Input**: URL or API Response.
-   **Action**:
    -   If Web: Render page and save PNG.
    -   If API: Save formatted JSON with Hash.

### 2. Audit Trail Entry
-   **Fields**: `Actor` (Agent), `Action`, `Target`, `Timestamp`, `ProofHash`.
-   **Storage**: Write to `ProjectEvidence` folder (immutable).

### 3. Chain of Custody
-   Generate a `manifest.json` linking the Request (Ticket) to the Action (Provisioner) and the Proof (Evidence).

## Example Output
> **Evidence Secured**:
> -   **File**: `evidence/offboarding/jdoe_aws_inactive.png`
> -   **Hash**: `sha256:a1b2c3d4...`
> -   **Linked Control**: `CTL-ACC-01`
