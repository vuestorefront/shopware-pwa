<template>
  <div class="accordion__item">
    <div class="accordion__content">
      <p v-if="payment.sameAsShipping" class="content">
        Same as shipping address
      </p>
      <template v-else>
        <p class="content">
          <span class="content__label">{{ payment.shippingMethod }}</span
          ><br />
          {{ payment.streetName }} {{ payment.apartment }}, {{ payment.zipCode
          }}<br />
          {{ payment.city }}, {{ payment.country }}
        </p>
        <p class="content">{{ payment.phoneNumber }}</p>
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
  name: 'BillingAddress',
  components: {
    SfButton,
  },
  props: {
    payment: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';
</style>
