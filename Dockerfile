FROM node:14 AS build

WORKDIR /app/frontend
COPY package*.json ./
COPY . ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/frontend/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/nginx.conf

COPY ./nginx/default.conf /etc/nginx/conf.d
COPY ./nginx/nginx.conf /etc/nginx

ENTRYPOINT ["nginx", "-g", "daemon off;"]
