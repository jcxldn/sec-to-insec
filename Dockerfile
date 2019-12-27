FROM node:10-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

ENV PORT=80

EXPOSE $PORT

CMD ["node", "index.js"]
