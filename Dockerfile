# FROM node:lts-alpine3.24
FROM node:lts-trixie-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
#EXPONDO A PORTA 3000 PARA O MUNDO EXTERNO
EXPOSE 3000
CMD ["node", "app.js"]