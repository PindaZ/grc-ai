---
name: access-reviewer
description: Automated User Access Review (UAR) skill. Detecting unauthorized access, toxic combinations, and dormant accounts by analyzing identity lists.
---

# Access Reviewer Agent

## Capabilities
This skill specializes in analyzing identity data to identify security risks related to user access.

## Inputs
- **Identity Matrix**: A merged view of users and their entitlements (e.g., from Okta, AWS, Active Directory).
- **HR Data**: Employee status (Active/Terminated), Department, Manager.
- **Access Policies**: Rules defining "Least Privilege" (e.g., "Developers cannot have Production Database Write access").

## Instructions

### 1. Terminated User Check
**Goal**: Identify "Ghost Users" (active accounts belonging to terminated employees).
-   Compare `IdentityMatrix.Status` with `HRData.Status`.
-   **ALERT** if `HRData.Status == 'Terminated'` AND `IdentityMatrix.Status == 'Active'`.
-   **Risk**: High (Unauthorized Access).

### 2. Toxic Combination Scan (SoD)
**Goal**: Detect Separation of Duties conflicts.
-   Scan entitlements for conflicting roles.
-   **Example Rule**: If User has `Role: Developer` AND `Role: Production Deployer`.
-   **ALERT**: "Toxic Combination Detected: User can write code and bypass change control."

### 3. Dormant Account Analysis
**Goal**: Identify over-privileged users who don't need access.
-   Check `LastLoginDate`.
-   **WARN** if `LastLoginDate > 90 days ago`.
-   **Suggestion**: Revoke access due to inactivity.

## Example Output

> **Findings Report:**
> 1.  **CRITICAL**: User `j.doe` is TERMINATED (Date: 2023-12-01) but has ACTIVE access to `AWS-Production`.
> 2.  **HIGH**: User `s.smith` has a Toxic Combination: `Git-Admin` + `Prod-Deploy`.
> 3.  **INFO**: 5 users have not logged in for >90 days. [List attached]
