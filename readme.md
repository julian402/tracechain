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

### 4. Levantar la base de datos

```bash
docker compose up -d
```

### 5. Correr las migraciones

```bash
pnpm dlx prisma@6 migrate dev
```

### 6. Cargar datos iniciales

```bash
pnpm prisma:seed
```

Crea un usuario administrador: `admin@tracechain.com` / `admin123`

### 7. Arrancar el servidor

```bash
pnpm dev
```

Servidor en `http://localhost:3000`. Verificar:
```bash
curl http://localhost:3000/health
# { "status": "ok" }
```

---

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `pnpm dev` | Servidor en modo desarrollo con hot reload |
| `pnpm start` | Servidor en producción |
| `pnpm test` | Correr tests en modo watch |
| `pnpm test:coverage` | Tests con reporte de cobertura |
| `docker compose up -d` | Levantar base de datos |
| `docker compose down` | Apagar base de datos |
| `docker compose logs -f db` | Ver logs de la BD en tiempo real |
| `pnpm dlx prisma@6 migrate dev` | Correr migraciones |
| `pnpm dlx prisma@6 studio` | UI visual de la BD (localhost:5555) |
| `pnpm prisma:seed` | Cargar datos iniciales |

---

## Endpoints

### Auth — `/api/auth`
| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| POST | `/register` | Registrar usuario | No |
| POST | `/login` | Iniciar sesión | No |

### Lotes — `/api/lots`
| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/` | Listar todos los lotes | Token |
| GET | `/search?status=&search=&fromDate=&toDate=` | Filtrar lotes | Token |
| GET | `/:id` | Obtener lote por ID | Token |
| GET | `/:id/tree` | Árbol de trazabilidad (padres e hijos) | Token |
| GET | `/public/:qrCode` | Vista pública del lote (sin login) | No |
| POST | `/` | Crear lote | ADMIN, OPERATOR |
| PATCH | `/:id/status` | Cambiar estado del lote | ADMIN, OPERATOR |

### Movimientos — `/api/movements`
| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/` | Listar todos los movimientos | Token |
| GET | `/lot/:lotId` | Movimientos de un lote | Token |
| POST | `/` | Registrar movimiento | ADMIN, OPERATOR |

### QR — `/api/qr`
| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/:qrCode` | Generar imagen QR en base64 | Token |

### Auditoría — `/api/audit`
| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/` | Listar todos los logs | ADMIN, AUDITOR |
| GET | `/search?action=&userId=&lotId=&fromDate=&toDate=` | Filtrar logs | ADMIN, AUDITOR |
| GET | `/lot/:lotId` | Logs de un lote | ADMIN, AUDITOR |
| GET | `/user/:userId` | Logs de un usuario | ADMIN, AUDITOR |

### Usuarios — `/api/users`
| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/` | Listar usuarios | ADMIN |
| GET | `/:id` | Obtener usuario | Token |
| PATCH | `/:id` | Actualizar usuario | ADMIN |
| PATCH | `/:id/password` | Cambiar contraseña | Token |
| DELETE | `/:id` | Eliminar usuario | ADMIN |

### Estadísticas — `/api/stats`
| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/dashboard` | KPIs, lotes recientes y alertas | Token |

### Inspecciones — `/api/inspections`
| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/` | Listar inspecciones | ADMIN, AUDITOR |
| GET | `/:id` | Obtener inspección | Token |
| GET | `/lot/:lotId` | Inspecciones de un lote | Token |
| POST | `/` | Crear inspección con hallazgos | ADMIN, AUDITOR, OPERATOR |

### Reportes — `/api/reports`
| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/lots/csv` | Exportar lotes en CSV | ADMIN, AUDITOR |
| GET | `/lots/pdf` | Exportar lotes en PDF | ADMIN, AUDITOR |
| GET | `/movements/csv` | Exportar movimientos en CSV | ADMIN, AUDITOR |

---

## Roles

| Rol | Descripción |
|---|---|
| `ADMIN` | Acceso total |
| `OPERATOR` | Crear lotes, movimientos e inspecciones |
| `AUDITOR` | Solo lectura, reportes y auditoría |

---

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
test: descripción      → tests
```

---

## Estructura del proyecto

```
tracechain-backend/
├── prisma/
│   ├── schema.prisma       # esquema de la BD
│   ├── migrations/         # historial de migraciones
│   └── seed.js             # datos iniciales
├── src/
│   ├── config/
│   │   ├── db.js           # instancia de Prisma
│   │   └── logger.js
│   ├── middlewares/
│   │   ├── auth.js         # verificación JWT y roles
│   │   ├── validate.js     # validación de DTOs con Joi
│   │   └── errorHandler.js
│   ├── modules/
│   │   ├── auth/
│   │   ├── lots/
│   │   ├── movements/
│   │   ├── qr/
│   │   ├── audit/
│   │   ├── users/
│   │   ├── stats/
│   │   ├── inspections/
│   │   └── reports/
│   ├── shared/
│   │   ├── AppError.js
│   │   ├── audit.helper.js
│   │   └── response.helper.js
│   └── app.js
├── tests/
│   ├── unit/
│   └── integration/
├── server.js
├── docker-compose.yml
├── .env.example
└── package.json
```

---

## Variables de entorno

| Variable | Descripción |
|---|---|
| `PORT` | Puerto del servidor (default: 3000) |
| `DATABASE_URL` | URL de conexión a PostgreSQL |
| `JWT_SECRET` | Secreto para firmar tokens JWT |
| `JWT_EXPIRES_IN` | Duración del token (ej: `7d`) |
| `NODE_ENV` | `development` o `production` |
| `PUBLIC_URL` | URL base para links de QR (ej: `http://localhost:3000`) |