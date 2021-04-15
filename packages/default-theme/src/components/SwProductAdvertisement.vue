<template>
  <div class="sw-product-advertisement">
    <SfBanner
      title="Download our application to your mobile"
      subtitle="Fashion to Take Away"
      image="/img/bannerD.png"
      class="banner-application sf-banner--left sf-banner--center desktop-only"
    >
      <template #call-to-action>
        <div>
          <img
            class="banner-application__download"
            src="/img/google.png"
            alt=""
          />
          <img
            class="banner-application__download"
            src="/img/apple.png"
            alt=""
          />
        </div>
      </template>
    </SfBanner>
  </div>
</template>

<script>
import { SfBanner } from "@storefront-ui/vue"

export default {
  name: "SwProductAdvertisement",
  components: { SfBanner },
}
</script>

<style scoped>
::v-deep .sf-banner__title {
  margin-bottom: var(--spacer-xl);
}
</style>
