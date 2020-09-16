<template>
  <SfTopBar
    v-show="displayCookieBar"
    class="sw-cookie-bar"
    data-cy="cookie-bar"
  >
    <template #left>
      <div class="cookie-info">
        <slot name="cookieText" />
      </div>
    </template>
    <template #right>
      <SwButton class="btton" data-cy="accept-cookies" @click="acceptCookies">
        Got it!
      </SwButton>
    </template>
  </SfTopBar>
</template>

<script>
import { SfTopBar } from "@storefront-ui/vue"
import SwButton from "@/components/atoms/SwButton"
import { method } from "lodash"

export default {
  name: "SwCookieBar",
  components: {
    SfTopBar,
    SwButton,
  },
  data() {
    return {
      displayCookieBar: false,
    }
  },
  mounted() {
    this.$nextTick(function () {
      if (localStorage.getItem("cookies") === "accepted") {
        this.$parent.isAccepted = false
      } else {
        this.displayCookieBar = true
      }
    })
  },

  methods: {
    acceptCookies() {
      localStorage.setItem("cookies", "accepted")
      this.hideCookieBar()
    },

    hideCookieBar() {
      this.$parent.isAccepted = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.sw-cookie-bar ::v-deep.sf-top-bar__container {
  height: auto;
}

.sw-cookie-bar {
  --top-bar-background: var(--c-black-lighten);

  box-sizing: border-box;
  color: var(--c-white);
  width: 100%;

  .btton {
    height: 40px;
    transition: color 0.33s;
    margin-left: var(--spacer-base);
  }
}
</style>
