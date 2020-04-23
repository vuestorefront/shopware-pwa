<template>
  <div class="accordion__item">
    <div class="accordion__content">
      <p class="content">{{ paymentMethod.name }}</p>
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
import { useSessionContext } from '@shopware-pwa/composables'
import { computed } from '@vue/composition-api'
export default {
  name: 'PaymentMethodSummary',
  components: {
    SfButton,
  },
  setup() {
    const { sessionContext } = useSessionContext()
    const paymentMethod = computed(() => sessionContext.value.paymentMethod)
    return {
      paymentMethod,
      sessionContext,
    }
  },
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';
</style>
