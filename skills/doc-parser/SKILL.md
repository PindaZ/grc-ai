---
name: doc-parser
description: Extract structured data from unstructured or semi-structured documents (PDF, Docx, HTML). Optimized for certifications and audit reports.
---

# Document Parser Skill

## Capabilities
Converts heavy documentation into queryable JSON.

## Instructions

### 1. Ingestion
-   Support PDF (OCR if image-based), Word, Excel.

### 2. Layout Analysis
-   Identify headers, footers, and tables.
-   Detect "Section IV" or "Appendix B" based on ToC.

### 3. Extraction
-   **Key-Value Extraction**: Find "Audit Period: [Date Range]".
-   **Table Extraction**: Convert "Control Exceptions" table to JSON array.

## Example Output
> **Parsing Complete**:
> -   **File**: `soc2_final.pdf`
> -   **tables_found**: 12
> -   **period_start**: 2023-01-01
> -   **period_end**: 2023-12-31
