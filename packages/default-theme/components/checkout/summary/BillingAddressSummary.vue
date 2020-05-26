<template>
  <div class="review__item">
    <div class="review__content">
      <h4 class="review__title">Billing address</h4>
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
      class="sf-button--text review__edit"
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
@import '@/assets/scss/variables';
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
