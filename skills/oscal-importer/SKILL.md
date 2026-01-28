# OSCAL Importer Skill

The `oscal-importer` skill enables the AI agent to ingest, parse, and integrate NIST Open Security Controls Assessment Language (OSCAL) data into the GRC platform. This skill specifically handles the transformation of machine-readable catalogs and profiles into internal compliance objects.

## Capabilities

- **Catalog Ingestion**: Parse OSCAL JSON/YAML catalogs (e.g., NIST 800-53) and map them to internal `Control` and `Requirement` structures.
- **Profile Application**: Handle OSCAL profiles that select and tailor controls from base catalogs for specific compliance frameworks (e.g., FedRAMP, HIPAA).
- **Validation**: Ensure incoming OSCAL data adheres to the official NIST schemas.

## Usage

Agents should trigger this skill when the user provides an OSCAL-formatted file or URL, or when a new compliance framework needs to be initialized from an official baseline.

### Direct Execution
`import_oscal_catalog(url_or_content)`

## Implementation Details

- **Mapping Logic**: 
  - `OSCAL Control` -> Platform `Control`
  - `OSCAL Part (statement)` -> Platform `Requirement`
  - `OSCAL Property` -> Platform Metadata/Tags
- **Baseline**: NIST 800-53 Rev 5 is the default imported catalog.
