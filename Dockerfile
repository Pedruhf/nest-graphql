FROM node:16-alpine

WORKDIR /home/api

COPY package.json .
COPY yarn.lock .

COPY . .

RUN yarn install

CMD ["yarn", "start:dev"]