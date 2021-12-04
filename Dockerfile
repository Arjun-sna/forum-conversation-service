# syntax=docker/dockerfile:1

FROM node:16.13-alpine3.13
RUN apk add g++ make py3-pip bash
WORKDIR /build
COPY package.json ./
RUN yarn install
COPY . .
RUN npm run build
COPY config/config.json dist/config
COPY .env dist/
EXPOSE 8080
CMD [ "node", "dist/server.js" ]