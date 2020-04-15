<template>
  <div class="accordion__item">
    <div class="accordion__content">
      <p class="content">{{ paymentMethod.label }}</p>
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
export default {
  name: 'PaymentMethodSummary',
  components: {
    SfButton,
  },
  setup() {
    // TODO get payment method from useSessionContext
    const paymentMethod = {
      label: 'TODO: payment method',
    }
    return {
      paymentMethod,
    }
  },
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';
</style>
