# GRC AI Platform

An intelligent Governance, Risk, and Compliance (GRC) automation platform powered by Agentic AI.

## 🚀 Key Features

-   **Agentic AI Core**: Autonomous agents capable of reasoning, planning, and executing compliance tasks.
-   **Neural Activity Feed**: Real-time visibility into agent operations and decision-making.
-   **OSCAL Integration**: Native support for NIST Open Security Controls Assessment Language.
-   **Modern Tech Stack**: Built with Next.js 15, Fluent UI (v9), and Prisma ORM.
-   **Secure**: Role-Based Access Control (RBAC) and NextAuth.js authentication.

## 🛠 Tech Stack

-   **Frontend**: Next.js 15 (App Router), Fluent UI React Components
-   **Backend**: Next.js Server Actions, Prisma ORM
-   **Database**: SQLite (Dev) / PostgreSQL (Prod)
-   **AI Engine**: Google Gemini 1.5 Flash (via Vercel AI SDK)
-   **Auth**: NextAuth.js v5

## 🚦 Getting Started

### Prerequisites

-   Node.js 20+
-   Google Gemini API Key

### Installation

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up environment variables (`.env`):
    ```env
    DATABASE_URL="file:./dev.db"
    GOOGLE_GENERATIVE_AI_API_KEY=your_key_here_no_quotes
    AUTH_SECRET="your_generated_secret"
    ```
4.  Initialize the database:
    ```bash
    npx prisma generate
    npx prisma migrate dev --name init
    ```
5.  Run the development server:
    ```bash
    npm run dev
    ```

### 🔐 Authentication (Mock Mode)

The current MVP uses a mock credentials provider for testing:
-   **Email**: `demo@grc.ai`
-   **Password**: `demo123`

## 📂 Project Structure

-   `/src/app`: Next.js App Router pages
-   `/src/lib/agent`: AI Agent logic (Runner, Tools, Skills)
-   `/src/components`: Fluent UI components (Atoms, Molecules, Organisms)
-   `/prisma`: Database schema and migrations
-   `/docs`: Architecture and planning documentation

## 📄 Documentation

See the `docs/` directory for detailed design docs:
-   [MVP Roadmap](./docs/MVP_ROADMAP.md)
-   [Changelog](./docs/CHANGELOG.md)
