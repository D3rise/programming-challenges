FROM node:16

COPY package.json /app
COPY yarn.lock /app
WORKDIR /app

RUN yarn --production

CMD ["yarn", "start"]