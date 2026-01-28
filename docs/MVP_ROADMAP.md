# GRC AI Platform: Road to MVP

This document outlines the strategic steps to transition the GRC AI application from its current "Functional PoC" state to a production-ready "Minimum Viable Product" (MVP).

## 1. System Architecture & Persistence
**Goal:** Move from local development artifacts to a scalable, persistent cloud-ready architecture.

- [ ] **Database Migration (SQLite → PostgreSQL)**
    -   **Why:** SQLite files don't scale well in containerized environments like Dokploy without persistent volume headaches. Postgres is the industry standard for relational data.
    -   **Action:**
        -   Spin up a PostgreSQL container in Dokploy.
        -   Update `schema.prisma` provider to `postgresql`.
        -   Update `.env` to point to the remote DB.
        -   Run migration to create tables in the live DB.
- [ ] **Environment Hardening**
    -   **Why:** Security.
    -   **Action:** Ensure all API keys and secrets are strictly managed via Dokploy Environment Variables, not committed files.

## 2. Authentication & Multi-Tenancy
**Goal:** Secure the application and support multiple users/roles.

- [x] **Implement NextAuth.js (v5)** (*Completed 2026-01-27*)
    -   **Why:** We need secure login, session management, and role-based access control (RBAC).
    -   **Action:**
        -   Set up Google OAuth or Email/Password provider.
        -   Create `User` and `Account` models in Prisma.
        -   Protect all `/admin` and `/agents` routes.
- [ ] **Role-Based Access Control (RBAC)**
    -   **Why:** "Auditors" see different things than "Control Owners".
    -   **Action:** Implement middleware to enforce roles defined in the User model.

## 3. Data Realism (Replacing Mocks)
**Goal:** Ensure every number and chart on the dashboard reflects real system state.

- [ ] **Audit Mock Usage**
    -   **Current Status:** Agents page is real. Controls page is real.
    -   **Action:** Identify any remaining hardcoded JSON in `src/data` and replace with Database queries.
- [ ] **Live "System Health" Metrics**
    -   **Why:** The "99.9% Uptime" is currently fake.
    -   **Action:** Create a real "Health Check" service that pings critical internal services/APIs and logs the result to the DB.

## 4. Advanced AI & OSCAL Integration
**Goal:** Turn the "Chatbot" into a "Compliance Engine".

- [ ] **OSCAL-Native Agents**
    -   **Why:** The AI should understand compliance strictly in OSCAL terms.
    -   **Action:**
        -   give the Agent tool access to the parsed OSCAL structure (Controls, Components, Parameters).
        -   Allow the Agent to *write* evidence links directly into the OSCAL `remarks` or `links` arrays.
- [ ] **Automated Evidence Collection**
    -   **Why:** Manual uploads are slow.
    -   **Action:** Create "Connectors" (e.g., GitHub, AWS) that the Agent can query to automatically verify a control (e.g., "Check if MFA is enabled").

## 5. UI/UX Polish
**Goal:** A professional, trustworthy user experience.

- [ ] **Refactoring & Type Safety**
    -   **Why:** Stability. The current codebase has some `any` casts to bypass conflicts.
    -   **Action:** rigorosly clean up TypeScript types, especially around the AI SDK and Prisma generated types.
- [ ] **Error Boundaries**
    -   **Why:** If one component crashes (like the ticker earlier), the whole app shouldn't break.
    -   **Action:** Wrap major widgets in granular Error Boundaries.
