FROM node:12

WORKDIR /usr/app

COPY package*.json ./

COPY . .

# RUN yarn add ts-node-dev --dev
# RUN apt update && apt install postgresql postgresql-contrib -y

RUN yarn install

EXPOSE 3333