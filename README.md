# Proyecto Financial Products Interview

## Developer
Lino Ontano

## Requisitos Previos

Tener instalado lo siguiente en tu máquina:

- [Node.js](https://nodejs.org/) (versión 18.9.1 o superior)
- [Angular CLI](https://angular.io/cli) (instalación global: `npm install -g @angular/cli`)

## Levantar el Proyecto

Para levantar el proyecto, sigue estos pasos:

1. **Clona el repositorio:**

    ```bash
    git clone https://github.com/linontano/financial-products
    cd financial-products
    ```

2. **Instala las dependencias:**

    ```bash
    npm install
    ```

3. **Crea un archivo proxy.conf.json en la raíz del     proyecto.** Este archivo es necesario para redirigir las solicitudes API al backend. Su estructura es la siguiente:

    ```json
    {
    "/api": {
        "target": "http://localhost:3002",
        "secure": false,
        "changeOrigin": true,
        "pathRewrite": {
        "^/api": ""
        }
    }
    }
    ```

    Este proxy redirige todas las solicitudes que comienzan con /api al servidor backend en http://localhost:3002.

4. **Configurar el archivo `environment.ts`**:

    ```js
    export const environment = {
        production: false,
        API_BASE_URL: '/api',
        PRODUCTS_PATH: '/bp/products'
    };
    ```

5. **Levantar el servidor de desarrollo**:

    ```bash
    ng serve --proxy-config proxy.conf.json
    ```

    Esto iniciará el servidor de desarrollo y podrás acceder a la aplicación en http://localhost:4200.