FROM node:18-alpine

WORKDIR /app

COPY terranest/backend/package*.json ./
RUN npm install

COPY terranest/backend/ ./

EXPOSE 10000

ENV NODE_ENV=production
ENV PORT=10000

CMD ["npm", "start"]