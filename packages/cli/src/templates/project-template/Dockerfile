FROM node:14.15.3-alpine

ENV NODE_ENV production

RUN mkdir /app
COPY --chown=node:node . /app

WORKDIR /app
USER node

EXPOSE 3000

CMD yarn start