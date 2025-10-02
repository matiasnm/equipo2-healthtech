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