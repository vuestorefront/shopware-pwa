FROM node:12.16.1-alpine
ENV DEBUG=nuxt:*
RUN mkdir /app
COPY . /app
RUN chown -R node:node /app

WORKDIR /app
USER node

EXPOSE 3000

CMD yarn start