<template>
  <div class="accordion__item">
    <div class="accordion__content">
      <p class="content">
        <span class="content__label">{{ shippingMethodLabel }}</span
        ><br />
        {{ shipping.streetName }} {{ shipping.apartment }}, {{ shipping.zipCode
        }}<br />
        {{ shipping.city }}, {{ shipping.country }}
      </p>
      <p class="content">{{ shipping.phoneNumber }}</p>
    </div>
    <SfButton
      class="sf-button--text accordion__edit"
      @click="$emit('click:edit', 1)"
      >Edit</SfButton
    >
  </div>
</template>
<script>
import {
  SfButton,
} from '@storefront-ui/vue'
export default {
  name: 'ShippingAddress',
  components: {
    SfButton,
  },
  props: {
    shippingMethodLabel: {
      type: String,
      default: ''
    },
    shipping: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';
</style>
