<template>
  <div class="accordion__item">
    <div class="accordion__content">
      <p class="content" v-if="billingAddress">
        {{ billingAddress.street }} {{ billingAddress.apartment }},
        {{ billingAddress.zipcode }}<br />
        {{ billingAddress.city }}
      </p>
      <p class="content" v-if="billingAddress && billingAddress.phoneNumber">
        {{ billingAddress.phoneNumber }}
      </p>
    </div>
    <SfButton
      class="sf-button--text accordion__edit"
      @click="$emit('click:edit', 2)"
      >Edit</SfButton
    >
  </div>
</template>
<script>
import { SfButton } from '@storefront-ui/vue'
import { useCheckout } from '@shopware-pwa/composables'

export default {
  name: 'BillingAddressSummary',
  components: {
    SfButton,
  },
  setup() {
    const { billingAddress } = useCheckout()
    return {
      billingAddress,
    }
  },
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';
</style>
