# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- PDF export for anamnesis sessions (CFM-compliant format)
  - ExportPDFButton component with loading states and toast notifications
  - API route `/api/anamnese/export-pdf` for server-side PDF generation
  - PDF template with header, red flags section, anamnesis content, and footer
  - Uses @react-pdf/renderer for reliable PDF generation
- Spec-Kit integration with complete workflow
- Development container configuration (.devcontainer/)
- Comprehensive templates (research, api-spec, data-model)
- Enhanced documentation structure
- AGENTS.md guide for AI agents
- CODE_OF_CONDUCT.md
- Improved CONTRIBUTING.md with Spec-Kit references

### Changed

- Standardized specs/ directory with numeric naming (001-, 002-, etc.)
- Updated all templates to Spec-Kit compliance
- Enhanced scripts for better Spec-Kit integration
- Improved documentation organization

### Fixed

- Template placeholders and structure
- Script validation and error handling

## [1.0.0] - 2025-12-25

### Added

- Initial WellWave MVP specification
- Spec-Driven Development workflow
- GitHub Spec-Kit integration
- Development environment setup
- Database schema and migrations
- Authentication system
- Anamnese digital feature
- Red flag detection
- EBM Chat functionality

### Changed

- Project structure to follow Spec-Kit standards
- Documentation to Spec-Driven approach

---

## Types of Changes

- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** for vulnerability fixes

## Version Format

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** version for incompatible API changes
- **MINOR** version for new functionality in a backwards compatible manner
- **PATCH** version for backwards compatible bug fixes

## Spec Archive Integration

When a specification is archived using `./scripts/archive-spec.sh`, an entry is automatically added to this changelog under the appropriate version.

---

**Note:** This changelog is maintained manually for major releases. For detailed feature changes, see individual specification files in `specs/`.
