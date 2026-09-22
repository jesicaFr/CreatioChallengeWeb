# CreatioIntegrationWeb

Frontend Angular para consultar cuentas de Creatio a través de la API .NET del proyecto `CreatioChallengeBack`.

## Ejecutar localmente

1. Iniciá el backend con el perfil HTTP en `http://localhost:5204`.
# Creatio Accounts Web

Aplicación Angular para consultar y crear cuentas de Creatio mediante la API .NET del proyecto `CreatioChallengeBack`.

## Instrucciones para levantar el proyecto

### Requisitos

- Node.js y npm.
- .NET SDK compatible con el backend.
- El repositorio backend `CreatioChallengeBack` descargado en la máquina.
- Configuración OAuth válida de Creatio para probar contra el tenant real.

### 1. Levantar la API

Desde la carpeta del backend ejecutá:

```powershell
dotnet run --project .\CreatioChallengeBack.csproj --urls "http://localhost:5204"
```

La API queda disponible en `http://localhost:5204`.

Antes de iniciar la API, verificá que la configuración de Creatio tenga la URL base, el cliente OAuth, el secreto y los datos necesarios para obtener el token.

### 2. Instalar dependencias del frontend

Desde la raíz de este repositorio ejecutá:

```powershell
npm install
```

### 3. Levantar Angular

```powershell
npm start
```

Abrí `http://localhost:4200` en el navegador.

El archivo `proxy.conf.json` redirige las llamadas `/api` hacia `http://localhost:5204`, por lo que el navegador no recibe credenciales ni tokens de Creatio.

## Funcionalidades

- Listado de cuentas desde `GET /api/Accounts`.
- Búsqueda por nombre.
- Paginación server-side con `page` y `pageSize`.
- Alta desde un diálogo separado.
- Validación de nombre y código duplicados en la interfaz.
- Refresco automático del listado luego de crear una cuenta.

El alta envía este contrato a `POST /api/Accounts`:

```json
{
	"Name": "Empresa Cliente S.A.",
	"Code": "CLI-2026-001",
	"Phone": "+54 11 1234-5678",
	"Web": "https://www.empresacliente.com",
	"TypeId": "57412fad-53e6-df11-971b-001d60e938c6"
}
```

## Estructura principal

```text
src/app/creatio-accounts/
├── dto/
│   └── account.dto.ts
├── services/
│   └── creatio-accounts.service.ts
├── creatio-accounts.ts
├── creatio-accounts.html
└── creatio-accounts.css
```

- `dto/`: contratos de datos usados por la feature.
- `services/`: comunicación HTTP con la API.
- `creatio-accounts.ts`: estado, validaciones y acciones de la pantalla.

## Verificaciones

Compilar el frontend:

```powershell
npm run build
```

Ejecutar las pruebas:

```powershell
npm test
```

Documentación de OAuth y Creatio: [docs/creatio-oauth-client-credentials.md](docs/creatio-oauth-client-credentials.md).
