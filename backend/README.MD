# Backend - TruequeU
Servicio backend desarrollado en Node.js con Express y SQLite.

## Instrucciones para ejecutar el backend

1. Configurar las variables de entorno:
   Renombra o copia el archivo `example.env` a `.env` y define los valores de las variables requeridas (como `PORT` y `JWT_SECRET`).

   ```bash
   cp example.env .env
   ```

2. Ejecuta en la terminal dentro de la carpeta `backend` los siguientes comandos:

   ```bash
   npm install
   npm run seed
   npm run dev
   ```

El cliente REST para hacer las peticiones al backend está en `backend/api.http`.