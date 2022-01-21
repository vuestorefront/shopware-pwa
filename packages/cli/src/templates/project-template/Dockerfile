ARG NODE_VERSION=16.13.1-alpine
FROM node:${NODE_VERSION}

ENV NODE_ENV production

RUN mkdir /app
COPY --chown=node:node . /app

WORKDIR /app
USER node

EXPOSE 3000

CMD yarn start