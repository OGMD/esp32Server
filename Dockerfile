FROM node:20-alpine3.19
WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 8000

CMD ["npm","run","start"]
