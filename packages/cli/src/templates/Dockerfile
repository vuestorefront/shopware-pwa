FROM node:12.16.1-alpine3.11

RUN mkdir /app
COPY . /app
RUN chown -R node:node /app

WORKDIR /app
USER node

EXPOSE 3000

CMD yarn start