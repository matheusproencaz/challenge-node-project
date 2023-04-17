FROM node:18.10.0 as angular 
WORKDIR /users/frontend
COPY package.json /users/frontend
RUN npm install --silent
COPY . .
RUN npm run build


FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular /users/frontend/dist/frontend /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf


