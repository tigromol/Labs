FROM node
WORKDIR /app

COPY webpack.config.js package*.json ./

RUN npm install 

COPY ./src /app/src
RUN npm run build

FROM nginx
COPY --from=0 /app/.dist /data/www
COPY nginx.conf /etc/nginx/nginx.conf