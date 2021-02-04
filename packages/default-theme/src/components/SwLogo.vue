<template>
  <nuxt-link
    :to="$routing.getUrl('/')"
    class="sf-header__logo"
    data-cy="header-logo"
  >
    <SfImage src="/img/logo.svg" :alt="$t('page.title')" />
  </nuxt-link>
</template>

<script>
import { SfImage } from "@storefront-ui/vue"

export default {
  components: {
    SfImage,
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.sf-header__logo {
  height: 2rem;
}
</style>
