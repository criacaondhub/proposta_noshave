FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
# Alinha o npm do build (Alpine traz 10.x) com o que gerou o package-lock.json (npm 11),
# evitando erro de "package.json e package-lock.json fora de sincronia" no npm ci.
RUN npm install -g npm@11 && npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
# O Vite gera os caminhos com /proposta/ (base no vite.config.ts), então o build mora nessa subpasta
COPY --from=build /app/dist /usr/share/nginx/html/proposta
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
