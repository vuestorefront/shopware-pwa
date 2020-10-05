<template>
  <transition name="sf-collapse-bottom">
    <div v-if="show && isMobile" class="sw-popup container">
      <p class="text">
        TIP!
        <span class="strong">Press and hold item to drag them to the cart</span>
      </p>

      <SfIcon
        class="close"
        :color="'#ffffff'"
        icon="cross"
        size="16px"
        @click="closePopup"
      />
    </div>
  </transition>
</template>

<script>
import { SfIcon } from "@storefront-ui/vue"
import {
  mapMobileObserver,
  unMapMobileObserver,
} from "@storefront-ui/vue/src/utilities/mobile-observer"

export default {
  name: "SwTipPopup",
  components: {
    SfIcon,
  },

  setup(props, { root }) {
    return {
      mapMobileObserver,
      unMapMobileObserver,
    }
  },
  data() {
    return {
      show: false,
    }
  },
  computed: {
    ...mapMobileObserver(),
  },

  beforeDestroy() {
    unMapMobileObserver()
  },
  mounted() {
    if (document.cookie.includes("productPageTip=accepted")) {
      this.show = false
    } else {
      this.show = true
    }
  },
  methods: {
    closePopup() {
      this.show = false
      document.cookie = "productPageTip=accepted"
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.sw-popup {
  align-items: flex-start;
  background-color: rgba($color: #000000, $alpha: 0.8);
  bottom: 70px;
  color: var(--c-white);
  display: flex;
  left: 10px;
  padding: var(--spacer-sm);
  position: fixed;
  right: 10px;
  z-index: 1;

  .text {
    margin: 0 20px 0 0;
  }

  .close {
    margin-top: 4px;
  }

  .strong {
    font-weight: bolder;
  }
}
</style>
