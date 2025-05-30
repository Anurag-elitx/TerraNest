FROM node:18-alpine

WORKDIR /app

COPY terranest/backend/package*.json ./
RUN npm install

COPY terranest/backend/ ./

RUN ls -la
RUN cat package.json

EXPOSE 10000

ENV NODE_ENV=production
ENV PORT=10000

RUN echo "About to run: npm start"
RUN npm run --silent

CMD ["npm", "start"]