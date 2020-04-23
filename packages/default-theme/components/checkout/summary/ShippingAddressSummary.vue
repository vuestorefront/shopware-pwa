<template>
  <div class="accordion__item">
    <div class="accordion__content" v-if="shippingMethod">
      <p class="content">
        <span class="content__label">{{ shippingMethod.name }}</span>
        <span class="content__label">{{
          shippingMethod.deliveryTime.name
        }}</span>
      </p>
      <p class="content" v-if="shippingAddress">
        {{ shippingAddress.street }} {{ shippingAddress.apartment }},
        {{ shippingAddress.zipcode }}<br />
        {{ shippingAddress.city }}
      </p>
      <p class="content" v-if="shippingAddress && shippingAddress.phoneNumber">
        {{ shippingAddress.phoneNumber }}
      </p>
    </div>
    <SfButton
      class="sf-button--text accordion__edit"
      @click="$emit('click:edit', 1)"
      >Edit</SfButton
    >
  </div>
</template>
<script>
import { SfButton } from '@storefront-ui/vue'
import { useSessionContext, useCheckout } from '@shopware-pwa/composables'
export default {
  name: 'ShippingAddressSummary',
  components: {
    SfButton,
  },
  setup() {
    const { shippingMethod, sessionContext } = useSessionContext()
    const { shippingAddress } = useCheckout()
    return {
      shippingMethod,
      sessionContext,
      shippingAddress,
    }
  },
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';
</style>
