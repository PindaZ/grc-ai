---
name: identity-mapper
description: Resolves user identities across disparate systems using fuzzy matching and heuristic reasoning. Maps 'jdoe' to 'John Doe'.
---

# Identity Mapper Skill

## Capabilities
The "Rosetta Stone" for user identities across fragmented SaaS stacks.

## Instructions

### 1. Ingestion & Normalization
-   **Inputs**:
    -   AWS IAM (`user_name`)
    -   Okta (`email`)
    -   HRIS (`employee_id`, `legal_name`)
-   **Normalization**: Convert all to lowercase, strip domain suffixes.

### 2. Matching Logic
-   **Exact Match**: `email` == `email`. (Confidence: 100%)
-   **Heuristic**: `first_initial` + `last_name` (jdoe) ~= `first` + `last` (John Doe). (Confidence: 85%)
-   **Manual Review**: If Confidence < 80%, flag for human review.

### 3. Enrichment
-   Decorate the technical ID (AWS) with business context (Department, Manager).

## Example Output
> **Identity Resolved**:
> -   **Source**: AWS `dev-01`
> -   **Target**: Okta `steve.smith@company.com`
> -   **Confidence**: 92% (Pattern Match)
