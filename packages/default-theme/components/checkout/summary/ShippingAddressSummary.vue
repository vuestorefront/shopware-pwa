<template>
  <div class="accordion__item">
    <div class="accordion__content">
      <p class="content">
        <span class="content__label">{{ shippingMethod.name }}</span
        ><br />
        {{ shippingMethod.streetName }} {{ shippingMethod.apartment }},
        {{ shippingMethod.zipCode }}<br />
        {{ shippingMethod.city }}, {{ shippingMethod.country }}
      </p>
      <p class="content">{{ shippingMethod.phoneNumber }}</p>
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
export default {
  name: 'ShippingAddressSummary',
  components: {
    SfButton,
  },
  setup() {
    // TODO: get shipping method from useContext
    const shippingMethod = {
      name: 'TODO: MockedShippingMethod',
    }
    return {
      shippingMethod,
    }
  },
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';
</style>
