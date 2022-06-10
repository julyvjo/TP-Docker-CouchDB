FROM node:16-alpine3.15
WORKDIR /cliente-consola
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node","index.js"]
