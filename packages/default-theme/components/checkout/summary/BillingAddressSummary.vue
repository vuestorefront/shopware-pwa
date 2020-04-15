<template>
  <div class="accordion__item">
    <div class="accordion__content">
      <p v-if="billingAddress.sameAsShipping" class="content">
        Same as shipping address
      </p>
      <template v-else>
        <p class="content">
          <span class="content__label">{{ billingAddress.shippingMethod }}</span
          ><br />
          {{ billingAddress.streetName }} {{ billingAddress.apartment }}, {{ billingAddress.zipCode
          }}<br />
          {{ billingAddress.city }}, {{ billingAddress.country }}
        </p>
        <p class="content">{{ billingAddress.phoneNumber }}</p>
      </template>
    </div>
    <SfButton
      class="sf-button--text accordion__edit"
      @click="$emit('click:edit', 2)"
      >Edit</SfButton
    >
  </div>
</template>
<script>
import {
  SfButton
} from '@storefront-ui/vue'
export default {
  name: 'BillingAddressSummary',
  components: {
    SfButton,
  },
  setup () {
    // TODO: get from context or guest order step if guest order
    const billingAddress = {
      sameAsShipping: true
    }
    return {
      billingAddress
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';
</style>
