# TraceChain — Backend

API REST para trazabilidad de cadenas agroalimentarias. Permite registrar lotes, movimientos, transformaciones y generar códigos QR con historial público por lote.

## Requisitos previos

Tener instalado:
- [Node.js v20+](https://nodejs.org)
- [pnpm](https://pnpm.io) — `npm install -g pnpm`
- [Docker Desktop](https://www.docker.com/products/docker-desktop)

## Setup inicial

### 1. Clonar el repositorio

```bash
git clone https://github.com/julian402/tracechain.git
cd tracechain-backend
```

### 2. Instalar dependencias

```bash
pnpm install
pnpm approve-builds
```

### 3. Crear el archivo de variables de entorno

```bash
cp .env.example .env
```

El `.env` ya viene configurado para conectar con el contenedor de Docker. No hace falta cambiar nada si corres la BD con Docker.

### 4. Levantar la base de datos

Asegúrate de tener Docker Desktop abierto, luego:

```bash
docker compose up -d
```

Para ver los logs de la BD:

```bash
docker compose logs -f db
```

### 5. Correr las migraciones

```bash
pnpm dlx prisma@6 migrate dev
```

Esto crea todas las tablas en PostgreSQL.

### 6. Arrancar el servidor

```bash
pnpm dev
```

El servidor corre en `http://localhost:3000`. Para verificar que funciona:

```bash
curl http://localhost:3000/health
# { "status": "ok" }
```

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `pnpm dev` | Servidor en modo desarrollo con hot reload |
| `pnpm start` | Servidor en producción |
| `docker compose up -d` | Levantar base de datos |
| `docker compose down` | Apagar base de datos |
| `pnpm dlx prisma@6 migrate dev` | Correr migraciones |
| `pnpm dlx prisma@6 studio` | Abrir Prisma Studio (UI visual de la BD) |

## Flujo de trabajo Git

```
main      → código estable / entregas
develop   → integración del equipo
feature/* → trabajo individual por módulo
```

Nunca hacer push directo a `main` o `develop`. Todo va por Pull Request.

```bash
# Antes de empezar a trabajar
git checkout develop
git pull origin develop
git checkout -b feature/nombre-de-la-tarea

# Al terminar
git push origin feature/nombre-de-la-tarea
# → abrir PR hacia develop en GitHub
```

### Convención de commits

```
feat: descripción      → nueva funcionalidad
fix: descripción       → corrección de bug
chore: descripción     → configuración, dependencias
docs: descripción      → documentación
```

## Estructura del proyecto

```
tracechain-backend/
├── prisma/
│   ├── schema.prisma       # esquema de la BD
│   ├── migrations/         # historial de migraciones
│   └── seed.js             # datos de prueba
├── src/
│   ├── config/
│   │   ├── db.js           # instancia de Prisma
│   │   └── logger.js       # Winston logger
│   ├── middlewares/
│   │   ├── auth.js         # verificación JWT
│   │   ├── validate.js     # validación de DTOs
│   │   └── errorHandler.js # manejo global de errores
│   ├── modules/
│   │   ├── auth/           # login y registro
│   │   ├── lots/           # lotes (núcleo del sistema)
│   │   ├── movements/      # movimientos de lotes
│   │   ├── qr/             # generación de QR
│   │   ├── audit/          # bitácora de auditoría
│   │   └── users/          # usuarios y roles
│   ├── shared/
│   │   ├── AppError.js
│   │   └── response.helper.js
│   └── app.js
├── server.js
├── docker-compose.yml
├── .env.example
└── package.json
```

## Variables de entorno

| Variable | Descripción |
|---|---|
| `PORT` | Puerto del servidor (default: 3000) |
| `DATABASE_URL` | URL de conexión a PostgreSQL |
| `JWT_SECRET` | Secreto para firmar tokens JWT |
| `JWT_EXPIRES_IN` | Duración del token (ej: `7d`) |
| `NODE_ENV` | `development` o `production` |