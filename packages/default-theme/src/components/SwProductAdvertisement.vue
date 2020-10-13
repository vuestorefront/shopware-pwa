<template>
  <div class="sw-product-advertisement">
    <SfBanner
      title="Download our application to your mobile"
      image="/img/bannerD.png"
      class="banner-application sf-banner--left sf-banner--center desktop-only"
    >
      <template #subtitle>
        <div class="banner-application__subtitle">Fashion to Take Away</div>
      </template>
      <template #title>
        <h1 class="banner-application__title">
          Download our application to your&nbsp;mobile
        </h1>
      </template>
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

<style scoped></style>
