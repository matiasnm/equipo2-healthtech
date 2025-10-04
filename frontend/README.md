# Frontend - equipo2-healthtech

Proyecto creado con Vite + React.

## Stack

- React + Vite + TypeScript
- Tailwind CSS
- Zustand 

## Comandos

- `npm install` → instala dependencias
- `npm run dev` → inicia servidor local
- `npm run build` → genera build de producción

## Estructura

- `src/components` → componentes reutilizables
- `src/pages` → vistas principales
- `src/styles` → estilos globales

## Flujo de trabajo

- main: rama estable
- dev: integración continua
- feature-*: desarrollo de funcionalidades

## Migración a TypeScript

El proyecto fue migrado de JavaScript a TypeScript para mejorar la seguridad en el manejo de props, estados y funciones. Esto facilita el mantenimiento.

## 🐳 Dockerización del frontend

### Construcción
docker build -t healthtech-fe --build-arg VITE_API_URL=https://api.tuapp.com .

### Ejecución 
docker run -p 3000:80 healthtech-fe


La app estará disponible en http://localhost:3000.

## Normalización de line ending

Para evitar conflictos entre sistemas operativos, se agregó el archivo .gitattributes con * text=auto para asegurar que los finales de línea se normalicen automáticamente según el S.O. del dev.

## 🐳 Levantar el entorno con Docker Compose

- Crear un archivo .env en la carpeta frontend/ basado en env.example.env

- Completar según el entorno. No subir al repositorio.

- Ejecutar desde la carpeta frontend
docker compose up --build -d

- Acceder a la app en http://localhost:3000

- Verificar que se conecta al backend (http://app:8080)

Comandos útiles

docker compose down        # Detiene y elimina los contenedores
docker compose stop        # Solo detiene los servicios
docker compose ps          # Ver estado de los contenedores
docker logs healthtech     # Consultar logs

Esto permite levantar el frontend, el backend y la base de datos desde el mismo archivo con un solo comando.