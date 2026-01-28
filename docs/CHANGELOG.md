# Changelog

## [Unreleased] - 2026-01-27

### 🚀 Added
-   **Authentication System**:
    -   Integrated `next-auth` (v5) for secure session management.
    -   Added `User`, `Account`, `Session` models to Prisma schema.
    -   Implemented Custom Sign-In Page (`/auth/signin`) with glassmorphism UI.
    -   Configured Mock Credentials Provider (Demo User: `demo@grc.ai`).
    -   Added `middleware.ts` to protect all routes (redirects to sign-in).
-   **AI Agent Enhancements**:
    -   **Neural Output UI**: Added a dedicated response card in the Command Center to display AI text answers directly.
    -   **Resiliency**: Implemented "Raw SQL Fallback" to bypass Prisma Client locking issues during development.
    -   **Model Optimization**: Switched to `gemini-1.5-flash` for improved stability and fixed API quota errors.
-   **Dashboard Features**:
    -   Added **Neural Activity Feed** ticker to the Home Dashboard.
    -   Updated TopBar to show authenticated user profile and "Sign Out" option.

### 🐛 Fixed
-   **Prisma Client Locking**: Fixed issue where `prisma generate` would fail due to file locks by implementing a robust fallback mechanism in `AgentRunner`.
-   **API Key Format**: Corrected `.env` parsing issue where quotes around the API key caused "Model Not Found" errors.
-   **UI Crashes**: Added defensive checks to `AgentActivityTicker` to prevent crashes when the activity log is empty.

### 🔧 Infrastructure
-   Created `docker-compose.yml` for future PostgreSQL production deployment.
-   Created `schema.postgres.prisma` for production database definition.
-   Created `MVP_ROADMAP.md` (see internal artifacts) to guide next architecture phases.
