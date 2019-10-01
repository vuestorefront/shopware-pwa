FROM node:10-alpine

# set the configuration
ARG STOREFRONT_URL="https://demo.vuestorefront.io"
ARG THEME_NAME="vsf-shopware-theme"
ARG STOREFRONT_UI_REPOSITORY="https://github.com/DivanteLtd/storefront-ui.git"
ARG SHOPWARE_PWA_REPOSITORY="https://github.com/DivanteLtd/shopware-pwa.git"
ARG VUE_STOREFRONT_REPOSITORY="https://github.com/DivanteLtd/vue-storefront.git"
ARG SHOPWARE_PWA_REVISION="master"
ARG VSF_BRANCH="release/v2.0"


RUN apk add --no-cache wget yarn git
RUN mkdir /srv/vsf && chown -R node:node /srv/vsf
USER node
WORKDIR /srv/vsf

# follow the steps from README
RUN git clone --single-branch --branch master $STOREFRONT_UI_REPOSITORY \
    && git clone --single-branch --branch $SHOPWARE_PWA_REVISION $SHOPWARE_PWA_REPOSITORY \
    && git clone --single-branch --branch $VSF_BRANCH $VUE_STOREFRONT_REPOSITORY
RUN mkdir -p ./shopware-pwa/theme/resource/i18n \
    && cd /srv/vsf/shopware-pwa && cd theme && yarn link \
    && cd /srv/vsf/shopware-pwa && cd catalog && yarn link \
    && cd /srv/vsf/shopware-pwa && cd catalog && yarn link \
    && cd /srv/vsf/shopware-pwa && yarn \
    && cd /srv/vsf/vue-storefront && yarn && yarn link "vsf-shopware-theme" && cd node_modules/vsf-shopware-theme && yarn link "vsf-shopware-catalog" \
    && cd /srv/vsf/vue-storefront && sed -i -e 's@http://localhost:8080@'"$STOREFRONT_URL"'@g' ./config/default.json \
    && cd /srv/vsf/vue-storefront && sed -i -e 's#@vue-storefront/theme-default#'"$THEME_NAME"'#g' ./config/default.json

WORKDIR /srv/vsf/vue-storefront
EXPOSE 3000
# replace with RUN yarn build and then CMD yarn start on production
CMD yarn dev