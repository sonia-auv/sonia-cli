FROM node:lts-buster-slim

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm ci
RUN npm test
