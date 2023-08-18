FROM node:16

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

COPY .env.example .env

RUN yarn build

EXPOSE 5173

CMD [ "yarn", "serve" ]
