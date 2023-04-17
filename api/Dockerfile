FROM node:18.10.0

WORKDIR /users/api

COPY package.json ./

RUN yarn

COPY . .

EXPOSE 8080

CMD ["yarn","dev"]