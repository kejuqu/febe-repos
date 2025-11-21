# Project Tech Stack

This project is a monorepo managed by pnpm workspaces and Turborepo.

## Core Technologies

- **Language:** TypeScript
- **Monorepo Management:**
    - pnpm workspaces
    - Turborepo
- **Styling:** Tailwind CSS

## Applications

### 1. `apps/nestjs-be`
- **Framework:** NestJS (Node.js backend framework)
- **Purpose:** Backend services and API.

### 2. `apps/next-fe`
- **Framework:** Next.js (React framework)
- **Purpose:** Frontend application.

### 3. `apps/vite-react`
- **Build Tool:** Vite
- **Library:** React
- **Purpose:** Another frontend application or a component library showcase.

## Shared Packages

- `packages/eslint-config`: Shared ESLint configurations for consistent code style.
- `packages/shared`: Shared utilities and UI components.
- `packages/typescript-config`: Centralized TypeScript configurations (`tsconfig.json`).
