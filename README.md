# NestReact — Aula

Herramienta sencilla de **profesores, cursos y estudiantes** con login, construida para aprender **NestJS** y **React**.

- **Profesor:** crea, edita y elimina sus cursos.
- **Estudiante:** se inscribe y se da de baja de cursos, y ve "Mis cursos".

## Stack

| | Tecnologías |
|---|---|
| **Backend** | NestJS 12 (ESM) · TypeScript estricto · Prisma 7 · PostgreSQL 17 · JWT · Zod · Vitest |
| **Frontend** | React 19 · Vite 8 · TypeScript estricto · React Router 8 · TanStack Query 5 · ESLint |
| **Infraestructura** | Docker (PostgreSQL) · Node 24 LTS |

## Estructura

```
nextnest/
├── backend/     ← API REST en NestJS (arquitectura por capas: domain, application, infrastructure, presentation)
└── frontend/    ← SPA en React + Vite (organizada por features)
```

## Requisitos

- **Node.js 24 LTS** (recomendado con `nvm`)
- **Docker Desktop**
- **NestJS CLI:** `npm install -g @nestjs/cli`

---

## Backend — dependencias

### Proyecto base

```bash
nest new backend --strict --package-manager npm   # elegir: ESM (ES Modules) [with vitest]
```

El template de Nest instala: `@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`, `reflect-metadata`, `rxjs`, y en desarrollo `@nestjs/cli`, `@nestjs/schematics`, `@nestjs/testing`, `typescript`, `vitest`, `@vitest/coverage-v8`, `vite-tsconfig-paths`, `oxlint`, `prettier`, `supertest`, entre otras.

### Instaladas manualmente

```bash
# Configuración (.env)
npm i @nestjs/config

# Base de datos: Prisma 7 + driver de PostgreSQL
npm i @prisma/client@7 @prisma/adapter-pg@7 pg dotenv
npm i -D prisma@7 @types/pg

# Autenticación con JWT
npm i @nestjs/jwt

# Validación de entrada (Standard Schema)
npm i zod
```

| Paquete | Para qué se usa |
|---|---|
| `@nestjs/config` | Leer variables de entorno con `ConfigService` |
| `@prisma/client` | Cliente tipado para consultar la base de datos |
| `@prisma/adapter-pg` + `pg` | Conexión de Prisma 7 a PostgreSQL mediante el driver `pg` |
| `dotenv` | Carga el `.env` en `prisma.config.ts` |
| `prisma` (dev) | CLI: migraciones y generación del cliente |
| `@types/pg` (dev) | Tipos de TypeScript del driver `pg` |
| `@nestjs/jwt` | Firmar y verificar tokens JWT |
| `zod` | Esquemas de validación de los DTOs (`StandardSchemaValidationPipe`) |

> El hash de contraseñas usa `scrypt` del módulo nativo `node:crypto`: no requiere dependencias.

---

## Frontend — dependencias

### Proyecto base

```bash
npm create vite@latest frontend -- --template react-ts   # linter: ESLint
```

El template de Vite instala: `react`, `react-dom`, y en desarrollo `vite`, `@vitejs/plugin-react`, `typescript`, `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `globals`, `@types/react`, `@types/react-dom`, `@types/node`.

### Instaladas manualmente

```bash
# Rutas
npm i react-router@8

# Estado del servidor (caché, mutaciones)
npm i @tanstack/react-query@5
npm i -D @tanstack/react-query-devtools@5
```

| Paquete | Para qué se usa |
|---|---|
| `react-router` | Rutas de la SPA (modo declarativo) |
| `@tanstack/react-query` | Peticiones a la API con caché, reintentos e invalidación |
| `@tanstack/react-query-devtools` (dev) | Panel para inspeccionar la caché en desarrollo |

---

## Cómo levantar el proyecto

### 1. Backend

```bash
cd backend
cp .env.example .env          # y ajusta los valores (contraseña y JWT_SECRET)
npm install
docker compose up -d          # levanta PostgreSQL
npx prisma migrate dev        # crea las tablas
npx prisma generate           # genera el cliente de Prisma
npm run start:dev             # http://localhost:3000
```

### 2. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev                   # http://localhost:5173
```

## Scripts útiles

| Backend | | Frontend | |
|---|---|---|---|
| `npm run start:dev` | Servidor en modo desarrollo | `npm run dev` | Servidor de desarrollo |
| `npm run test` | Tests con Vitest | `npm run build` | Compilación de producción |
| `npm run lint` | Linter (oxlint) | `npm run lint` | Linter (ESLint) |
| `npx prisma studio` | Explorar la base de datos | `npm run preview` | Previsualizar el build |

## Endpoints de la API

| Método | Ruta | Acceso |
|---|---|---|
| `GET` | `/health` | Público |
| `POST` | `/auth/register` | Público |
| `POST` | `/auth/login` | Público |
| `GET` | `/auth/me` | Autenticado |
| `GET` | `/courses` | Autenticado |
| `GET` | `/courses/:id` | Autenticado |
| `POST` | `/courses` | Profesor |
| `PATCH` | `/courses/:id` | Profesor dueño |
| `DELETE` | `/courses/:id` | Profesor dueño |
| `POST` | `/enrollments` | Estudiante |
| `DELETE` | `/enrollments/:courseId` | Estudiante |
| `GET` | `/enrollments/my-courses` | Estudiante |
