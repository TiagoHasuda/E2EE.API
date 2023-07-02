FROM node:18.16.0

WORKDIR /jws/e2ee/api

COPY package.json ./

RUN yarn

COPY . .

RUN yarn build

CMD ["yarn", "start:prod"]