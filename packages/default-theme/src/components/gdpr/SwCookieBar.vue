<template>
  <SfTopBar v-if="displayCookieBar" class="sw-cookie-bar" data-cy="cookie-bar">
    <template #left>
      <div class="cookie-info">
        <SwCookieBarContent />
      </div>
    </template>
    <template #right>
      <SwButton class="button" data-cy="accept-cookies" @click="acceptCookies">
        {{ $t("Got it!") }}
      </SwButton>
    </template>
  </SfTopBar>
</template>

<script>
import { SfTopBar } from "@storefront-ui/vue"
import SwButton from "@/components/atoms/SwButton"
const SwCookieBarContent = () => import("@/components/gdpr/SwCookieBarContent")

export default {
  name: "SwCookieBar",
  components: {
    SfTopBar,
    SwButton,
    SwCookieBarContent,
  },
  data() {
    return {
      displayCookieBar: false,
    }
  },
  mounted() {
    const res = localStorage.getItem("gdpr-cookie-notification-accepted")
    if (res !== "true") {
      this.displayCookieBar = true
    }
  },

  methods: {
    acceptCookies() {
      localStorage.setItem("gdpr-cookie-notification-accepted", true)
      this.displayCookieBar = false
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

  .button {
    margin-left: var(--spacer-base);
    padding: var(--spacer-xs) var(--spacer-base);
  }
}
</style>
