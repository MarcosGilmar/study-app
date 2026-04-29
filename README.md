# Study App

Projeto para organizar estudos (monorepo).

## Tecnologias

- **Monorepo:** Turborepo
- **Frontend:** Next.js (App Router) + React + TailwindCSS
- **Backend:** NestJS + PrismaORM + PostgreSQL
- **Auth:** JWT RS256 com Passport
- **Validação:** Zod
- **Testes:** Vitest
- **Linguagem:** TypeScript

## Estrutura do repositório

```
/
├── apps/
│   ├── api/          — API (NestJS)
│   └── web/          — Aplicação web (Next.js)
├── config/
    ├── eslint-config/      — Configuração ESLint compartilhada
    └── typescript-config/  — Configuração TypeScript compartilhada

```

## Arquitetura

A API segue os princípios de Clean Architecture, separada em:

- `core/` — utilitários compartilhados (Either, Entity, UniqueEntityId)
- `domain/` — entidades, repositórios (contratos), use cases e erros do domínio
- `infra/` — implementações concretas (Prisma, JWT, bcrypt, controllers)

O domínio não depende de nenhum framework ou biblioteca externa — apenas TypeScript puro. A camada de infra é responsável por implementar os contratos definidos no domínio.

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

Subir os serviços em background:

```bash
docker-compose up -d
```

Parar e remover containers:

```bash
docker-compose down
```

O volume do Postgres é persistido em `docker/postgres/data`.

## Variáveis de ambiente

Crie `apps/api/.env` com base em `apps/api/.env.example`:

```env
DATABASE_URL=
JWT_PRIVATE_KEY=
JWT_PUBLIC_KEY=
PORT=3333
```

As chaves JWT devem ser geradas no formato RS256 e codificadas em base64.

## Prisma

O schema está em `apps/api/prisma/schema.prisma` e as migrações em `apps/api/prisma/migrations`.

Gerar o client do Prisma (necessário após alterar o schema):

```bash
cd apps/api
npm run prisma:generate
```

Rodar migrations em desenvolvimento:

```bash
cd apps/api
npm run prisma:migrate:dev
```

Abrir Prisma Studio:

```bash
cd apps/api
npm run prisma:studio
```

## Testes

Rodar testes unitários da API:

```bash
cd apps/api
npm run test
```