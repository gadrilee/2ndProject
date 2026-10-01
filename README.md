# Trueque U
Segundo Proyecto de IHC



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

El cliente REST para hacer las peticiones al backend está en `backend/api.http`



## Instrucciones para ejecutar el frontend
```bash
cd frontend
npx serve -l 5000
```
| Abre en el navegador `http://localhost:5000`.
