<template>
  <div class="sw-product-tabs">
    <SfTabs class="product-details__tabs" :open-tab="openTab">
      <slot />
    </SfTabs>
  </div>
</template>

<script>
import { SfTabs } from '@storefront-ui/vue'

export default {
  name: 'SwProductTabs',
  components: { SfTabs },
  props: {
    openTab: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style lang="scss" scoped></style>
