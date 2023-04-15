FROM node:alpine

WORKDIR /users/api

COPY package.json ./

RUN yarn

COPY . .

EXPOSE 8080

CMD ["yarn","dev"]