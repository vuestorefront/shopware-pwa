<template>
  <div class="hello-cody">
    <h3>{{ phrase }}</h3>
  </div>
</template>
<script>
import axios from "axios";
import config from "~/shopware-pwa.config.js";

// TODO: API CLIENT needs to provide get/post methods to be able to invoke
const SHOPWARE_API_URL = config.shopwareEndpoint;
const PLUGIN_ENDPOINT_URL = "/sales-channel-api/v1/random-phrase";
const SW_ACCESS_KEY = config.shopwareAccessToken;

export default {
  data() {
    return {
      phraseResponse: null
    };
  },
  async mounted() {
    try {
      this.phraseResponse = await axios.get(
        `${SHOPWARE_API_URL}${PLUGIN_ENDPOINT_URL}`,
        {
          headers: {
            "sw-access-key": SW_ACCESS_KEY
          }
        }
      );
    } catch (e) {
      console.warn("SwHelloCody.vue: ", e);
    }
  },
  computed: {
    phrase() {
      return (
        this.phraseResponse &&
        this.phraseResponse.data &&
        this.phraseResponse.data.phrase
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.hello-cody {
  padding: 20px 5px;
  min-height: 30px;
  text-align: right;

  h3 {
    font-weight: 100;
  }
}
</style>
