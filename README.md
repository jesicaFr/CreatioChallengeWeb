# Creatio Accounts

Aplicación web desarrollada con **Angular** para consultar y administrar cuentas de **Creatio** a través de una API REST.

## Funcionalidades

La aplicación permite:

* 📋 Consultar el listado de cuentas de Creatio.
* 📄 Navegar el listado mediante paginación.
* ➕ Crear nuevas cuentas.
* ✅ Validar los datos obligatorios del formulario.
* 🔄 Actualizar automáticamente el listado después de crear una cuenta.
* ⚠️ Informar errores provenientes de la API y validaciones del formulario.

## Instalación

Instalá las dependencias del proyecto:

```bash
npm install
```

## Iniciar la aplicación

Ejecutá:

```bash
npm start
```

Luego abrí la URL indicada por Angular en el navegador.

## Uso

### Listado de cuentas

Al ingresar a la aplicación se muestra el listado de cuentas disponibles en Creatio.

El listado permite navegar entre las diferentes páginas y consultar las cuentas disponibles.

### Crear una cuenta

Seleccioná **Nueva cuenta** para abrir el formulario de alta.

Completá los datos requeridos y seleccioná **Crear cuenta**.

Una vez creada correctamente, el listado se actualiza automáticamente.

La aplicación informa si:

* Faltan datos obligatorios.
* La cuenta ya existe con el mismo nombre o código.
* Se produce un error durante la operación.

## Comandos útiles

### Iniciar en desarrollo

```bash
npm start
```

### Compilar para producción

```bash
npm run build
```

## Tecnologías

* Angular
* TypeScript
* HTML / CSS
* REST API
* Creatio OData

## Arquitectura

La aplicación frontend se comunica con el backend mediante una API REST. El frontend no maneja directamente las credenciales de Creatio.

```text
Angular
   │
   │ HTTP / REST
   ▼
Creatio Challenge API
   │
   │ OAuth 2.0 + OData
   ▼
Creatio
```

