FROM node:alpine

WORKDIR /users/api

COPY package.json ./

RUN yarn

COPY . .

EXPOSE 8081

CMD ["yarn","dev"]