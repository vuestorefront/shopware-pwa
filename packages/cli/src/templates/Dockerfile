FROM node:12.16.1-alpine3.11

RUN mkdir /app \
  && chown -R node:node /app

USER node
WORKDIR /app
COPY . /app

EXPOSE 3000

CMD yarn start