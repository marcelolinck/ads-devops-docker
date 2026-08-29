FROM node:22
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
#EXPONDO A PORTA 3000 PARA O MUNDO EXTERNO
EXPOSE 3000
CMD ["node", "app.js"]