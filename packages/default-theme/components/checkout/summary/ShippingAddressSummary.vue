<template>
  <div class="review__item">
    <div class="review__content" v-if="shippingMethod">
      <h4 class="review__title">Shipping details</h4>
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
      class="sf-button--text review__edit"
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
.review {
  &__item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: var(--spacer-base);
    padding: var(--spacer-sm);
    @include for-desktop {
      padding: 0;
    }
  }
  &__title {
    font-size: var(--font-sm);
    margin-bottom: var(--spacer-sm);
    color: var(--c-text);
  }
  &__content {
    font-size: var(--font-xs);
  }
}
.content {
  margin: 0;
  color: var(--c-text-muted);
}
</style>
