FROM node:18-alpine as frontend-build

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci --only=production
COPY frontend/ ./
RUN npm run build

FROM node:18-alpine as backend

WORKDIR /app
COPY backend/package*.json ./
RUN npm ci --only=production
COPY backend/ ./

COPY --from=frontend-build /app/frontend/build ./public

EXPOSE 5004

CMD ["npm", "start"]