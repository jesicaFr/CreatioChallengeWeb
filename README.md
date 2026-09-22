# CreatioIntegrationWeb

Frontend Angular para consultar cuentas de Creatio a través de la API .NET del proyecto `CreatioChallengeBack`.

## Ejecutar localmente

1. Iniciá el backend con el perfil HTTP en `http://localhost:5204`.
2. Desde esta carpeta ejecutá:

```bash
npm install
npm start
```

Abrí `http://localhost:4200`. El proxy de desarrollo reenvía `/api` al backend, por lo que no se exponen credenciales ni tokens en el navegador.

La pantalla consulta `GET /api/Accounts` con `search`, `page` y `pageSize`. La búsqueda tiene debounce y la paginación se resuelve en el backend; únicamente se muestran los campos de la lista, incluyendo los lookups `CountryName` y `AccountTypeName` ya resueltos por Creatio.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.0.8.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
