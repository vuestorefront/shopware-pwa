<template>
  <div class="addresses-add">
    <SwAddressForm @success="returnToAddresses" @cancel="returnToAddresses" />
  </div>
</template>

<script>
import SwAddressForm from "@/components/forms/SwAddressForm.vue"

export default {
  components: { SwAddressForm },
  data() {
    return {}
  },
  methods: {
    returnToAddresses() {
      this.$router.push(this.$routing.getUrl("/account/addresses"))
    },
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
