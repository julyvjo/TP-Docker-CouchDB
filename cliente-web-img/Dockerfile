FROM node:16-alpine3.15
WORKDIR /cliente-web
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node","index.js"]
