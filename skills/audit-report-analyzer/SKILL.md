---
name: audit-report-analyzer
description: Analyzes third-party audit reports (SOC 2, ISO 27001) to identify control failures, exceptions, and qualified opinions for Vendor Risk Management.
---

# Audit Report Analyzer (TPRM)

## Capabilities
Deep analysis of long-form audit documentation to extract risk-relevant signals.

## Instructions

### 1. Report Validation
-   **Period Verification**: targeted check of the "Audit Period".
    -   *Rule*: If `Audit Period End Date` is > 12 months ago -> **FLAG** "Outdated Report".
-   **Scope Check**: Verify the "System Description" matches the service being purchased.

### 2. Exception Extraction (Section IV)
-   Locate "Section IV: Independent Service Auditor's Description of Tests of Controls and Results".
-   Scan for keywords: "Exception", "Deviation", "Failure", "Not Effective".
-   **Extraction Format**:
    -   *Control ID*: The specific control that failed.
    -   *Exception Detail*: What exactly went wrong?
    -   *Management Response*: Did the vendor fix it?

### 3. Opinion Classification
-   Check the "Auditor's Opinion" (Section I).
-   **Unqualified Opinion**: Clean report. (Green)
-   **Qualified Opinion**: Material issues found. (Red/Critical)
-   **Adverse Opinion**: Failed audit. (Black/Block Vendor)

## Example Output

> **SOC 2 Analysis Results**:
> -   **Status**: Qualified Opinion (Action Required)
> -   **Audit Period**: Jan 1, 2023 - Dec 31, 2023 (Status: Current)
> -   **Exceptions Found**:
>     1.  *Control CC6.1*: Server patching was delayed by >30 days for 5% of fleet.
>         -   *Risk*: Medium (Vulnerability Exposure).
>         -   *Vendor Response*: "Automated patching implemented in Q1 2024". -> **Recommendation**: Verify evidence of Q1 fix.
