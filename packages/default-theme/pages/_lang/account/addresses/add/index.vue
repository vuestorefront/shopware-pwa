<template>
  <div class="addresses-add">
    <SwAddress />
  </div>
</template>

<script>
import SwAddress from "@shopware-pwa/default-theme/components/forms/SwAddress.vue"

export default {
  components: { SwAddress },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.addresses-add {
  box-sizing: border-box;
  width: 100%;

  @include for-mobile {
    padding: var(--spacer-sm);
  }
}
</style>
