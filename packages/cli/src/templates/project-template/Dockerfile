FROM node:14.15.3-alpine

ENV NODE_ENV production

RUN mkdir /app
COPY --chown=node:node . /app

WORKDIR /app
USER node
RUN ls -la ./node_modules/@shopware-pwa
RUN ls -la ./node_modules/@shopware-pwa/nuxt-module
RUN ls -la ./node_modules/@shopware-pwa/nuxt-module/dist
RUN cat ./node_modules/@shopware-pwa/nuxt-module/dist/nuxt-module.cjs.js

EXPOSE 3000

CMD yarn start