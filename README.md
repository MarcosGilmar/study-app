
# Study App

Projeto para organizar estudos (monorepo).

## Tecnologias

- **Monorepo:** Turborepo
- **Frontend:** Next.js (App Router) + React + TailwindCSS + Zustand
- **Backend:** Nest.js, PrismaORM, PostgreSQL
- **Linguagem:** TypeScript

## Estrutura do repositório

- [apps/web](apps/web) — aplicação web (Next.js)
- [apps/api](apps/api) — API (NestJS)

## Como rodar

Instalar dependências na raiz do monorepo:

```bash
npm install
```

Subir o ambiente de desenvolvimento (via Turborepo):

```bash
npm run dev
```