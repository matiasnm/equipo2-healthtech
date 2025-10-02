# Build con Node
FROM node:22-alpine AS build
WORKDIR /app

# Solo los archivos necesarios para instalar dependencias
COPY package*.json ./
RUN npm ci

# El resto del proyecto
COPY . .

# Variable de entorno para Vite 
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build de producción
RUN npm run build

# Servir con Nginx
FROM nginx:alpine

# Configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos el build generado
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
