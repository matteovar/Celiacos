# Etapa 1: build do frontend
FROM node:18 AS build-celiaco
WORKDIR /app/celiaco
COPY celiaco/ .

# Corrige o problema dos ícones do Leaflet
RUN mkdir -p public/leaflet-images && \
    cp -r node_modules/leaflet/dist/images/* public/leaflet-images/

RUN npm install && npm run build

# Etapa 2: backend com Flask
FROM python:3.11-slim AS backend
WORKDIR /app
COPY backend/ /app
COPY --from=build-celiaco /app/celiaco/dist /app/celiaco/dist
COPY --from=build-celiaco /app/celiaco/public/leaflet-images /app/celiaco/dist/leaflet-images

RUN pip install -r requirements.txt

ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
EXPOSE 5000

# Etapa 3: nginx para servir frontend
FROM nginx:alpine AS nginx
COPY --from=build-celiaco /app/celiaco/dist /usr/share/nginx/html
COPY --from=build-celiaco /app/celiaco/public/leaflet-images /usr/share/nginx/html/leaflet-images
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Configuração adicional do Nginx
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html