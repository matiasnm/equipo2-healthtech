FROM node:22-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

FROM nginx:alpine
# Copiamos nuestra config de nginx personalizada
COPY nginx.conf /etc/nginx/conf.d/default.conf
# ⚠️ Revisa que esta ruta sea la correcta; Vite por defecto usa /dist
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
