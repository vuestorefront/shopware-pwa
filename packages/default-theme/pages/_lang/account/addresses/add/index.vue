<template>
  <div class="addresses-add">
    <SwAddressForm />
  </div>
</template>

<script>
import SwAddressForm from "@shopware-pwa/default-theme/components/forms/SwAddressForm.vue"

export default {
  components: { SwAddressForm },
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
