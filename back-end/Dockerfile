FROM node:12

WORKDIR /usr/api

COPY package*.json ./

COPY . .

RUN apt update && apt install postgresql postgresql-contrib -y

RUN yarn install

RUN chmod +x wait-for-it.sh

EXPOSE 3000