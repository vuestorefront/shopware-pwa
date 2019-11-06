import Vue from "vue";
import App from "./App.vue";
import VueYouTubeEmbed from "vue-youtube-embed";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { setup } from "@shopware-pwa/shopware-6-client";
import "@storefront-ui/vue/styles.scss";

Vue.config.productionTip = false;

Vue.use(VueYouTubeEmbed);

setup({
  endpoint: "https://shopware-2.vuestorefront.io/sales-channel-api/v1",
  accessToken: "SWSCBVBBZET1RTFIYWY4YVLICA"
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
