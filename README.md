
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

## Uso com Docker

Este repositório inclui uma configuração `docker-compose.yml` para subir serviços em desenvolvimento.

- Para subir os serviços em background:

```bash
docker-compose up -d
```

- Para parar e remover containers:

```bash
docker-compose down
```

O volume do Postgres é persistido em `docker/postgres/data`.

## Prisma (migrations e cliente)

Este projeto usa Prisma para modelagem e migrações do banco de dados. O esquema está em `apps/api/prisma/schema.prisma` e as migrações em `apps/api/prisma/migrations`.

- Gerar o client do Prisma (necessário após alterar o schema):

```bash
cd apps/api
npm run prisma:generate
```

- Rodar migrations em desenvolvimento:

```bash
cd apps/api
npm run prisma:migrate:dev
```

- Abrir Prisma Studio:

```bash
cd apps/api
npm run prisma:studio
```

Observações:
- Crie `apps/api/.env` com base em `apps/api/.env.example`.
- Se estiver usando o Postgres via `docker-compose`, confirme que o serviço `postgres` está rodando antes de abrir o Studio.