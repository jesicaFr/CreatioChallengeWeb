# OAuth 2.0 client credentials para Creatio y app externa

## Estado actual

Este proyecto ya quedó organizado con el componente principal dentro de una carpeta dedicada llamada `creatio-accounts`, y además incorporé una versión mock del caso 3.3: alta de cuenta, con creación local desde la aplicación sin depender de una API real.

La implementación visible queda en:
- src/app/creatio-accounts/creatio-accounts.ts
- src/app/creatio-accounts/creatio-accounts.html
- src/app/creatio-accounts/creatio-accounts.css

La app compila correctamente con Angular en este workspace.

## Qué sí está hecho y qué no

### Hecho
- Estructura del componente reubicada en su propia carpeta: `src/app/creatio-accounts/`
- Vista para listar cuentas
- Buscador/paginación
- Alta de cuenta simulada en frontend con mock
- Documentación del flujo OAuth 2.0 client credentials y de los pasos esperados en Creatio

### No validado contra una instancia real de Creatio
No tengo acceso a la consola de administración ni a un tenant real de Creatio en esta sesión, por lo que no pude registrar un cliente OAuth real ni probar el token contra la API del entorno de la empresa. El flujo que sigue es el correcto desde el punto de vista de la especificación, pero requiere una instancia de Creatio con permisos de administración para configurarlo en el ambiente real.

## Flujo recomendado para configurar OAuth 2.0 en Creatio (client credentials)

Estos son los pasos recomendados para una implementación real en Creatio, tal como se suele hacer en un entorno con OAuth 2.0 para integraciones backend-to-backend.

1. Definir la aplicación externa
   - Identificar la app que va a consumir la API de Creatio.
   - Decidir si la autenticación será con secret compartido o con certificado, según la seguridad del entorno.
   - Mantener las credenciales fuera del código fuente y del repositorio.

2. Crear el cliente OAuth en Creatio / el sistema de identidad
   - Registrar la aplicación cliente desde el panel de administración de identidad o de integración.
   - Obtener:
     - client_id
     - client_secret o certificado
     - tenant / authority (si aplica)

3. Configurar permisos de acceso a la API
   - Otorgar a la aplicación cliente el permiso necesario sobre la API de Creatio.
   - Si la API expone scopes / roles, asignar los mínimos necesarios.
   - Recomendar: no otorgar más permisos que los estrictamente necesarios.

4. Generar el token con el flujo client credentials
   - El cliente envía una petición POST al endpoint de token del proveedor de identidad.
   - Parámetros típicos:
     - grant_type=client_credentials
     - client_id=...
     - client_secret=...
     - scope=...
   - La respuesta devuelve un access_token y un tiempo de expiración.

5. Consumir la API con el token
   - Incluir el encabezado Authorization: Bearer <access_token>
   - Realizar las llamadas a la API protegida de Creatio.
   - Guardar el token en caché con expiración controlada y renovarlo cuando caduque.

6. Manejar errores y rotación
   - Capturar errores 401/403.
   - Reintentar la obtención de token según una política segura.
   - Rotar secrets/certificados en forma periódica.

## Ejemplo conceptual del request de token

El patrón típico es este:

POST /token

client_id=<id>
client_secret=<secret>
grant_type=client_credentials
scope=<resource>/.default

El detalle exacto del endpoint depende del proveedor de identidad de la instancia de Creatio y del tenant configurado.

## Dificultades reales y bloqueo

En esta sesión no existe acceso a:
- la instancia de Creatio
- la configuración del tenant
- la administración de clientes OAuth
- el secret o certificado real
- la API expuesta por el entorno de producción o staging

Por eso, lo que quedó implementado es la parte funcional del frontend con mock para que la UI y la lógica de alta de cuenta queden listas, y la documentación del flujo real para cuando haya instancia y permisos reales.

## Fuentes consultadas

1. Microsoft Learn - OAuth 2.0 client credentials flow
   - https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-client-creds-grant-flow
   - Fuente principal para el protocolo OAuth 2.0 client credentials, parámetros del token y flujo del cliente confidencial.

2. RFC 6749 - The OAuth 2.0 Authorization Framework
   - https://datatracker.ietf.org/doc/html/rfc6749
   - Base formal del flujo de client credentials.

3. Documentación general de seguridad de identidad / APIs segmentadas
   - Se usó como referencia conceptual para la separación de responsabilidades entre aplicación cliente, API y permisos.

## Recomendación para la siguiente etapa real

Cuando se tenga acceso al tenant de Creatio, estos serían los siguientes pasos concretos:
- confirmar el endpoint OAuth del entorno
- registrar la aplicación cliente
- asignar permisos sobre la API
- obtener client_id y client_secret
- probar el token con curl o Postman
- dejar la app frontend consumiendo la API real con token en backend
- mover la secretidad fuera del navegador

## Estado del mock del caso 3.3

Se incorporó la opción de alta de cuenta desde la interfaz, con comportamiento mock. Esto cumple el requisito funcional de demo y permite avanzar la UX sin depender de una API real.

La lógica del alta de cuenta:
- valida formulario
- crea un registro en memoria
- agrega la cuenta nueva a la lista visible
- deja el flujo listo para conectar con la API real cuando exista.

Si la API real de Creatio llega a quedar disponible, el único cambio necesario es reemplazar la lógica mock del submit por el POST real a la endpoint de creación de cuenta.
