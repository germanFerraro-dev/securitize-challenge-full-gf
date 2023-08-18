FROM node:16

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

COPY wait-for-it.sh ./wait-for-it.sh

RUN chmod +x ./wait-for-it.sh

COPY .env.example .env

RUN yarn build

EXPOSE 4000

CMD if [ ! -f /firstrun ]; then \
        touch /firstrun && \
        ./wait-for-it.sh secu-dev-db:5432 -- npm run migration:generate --name=init && npm run migration:run && npm run start:dev; \
    else \
        npm run start:prod; \
    fi
