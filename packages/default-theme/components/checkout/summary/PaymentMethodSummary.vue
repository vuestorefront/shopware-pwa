<template>
  <div class="review__item">
    <div class="review__content">
      <h4 class="review__title">Payment method</h4>
      <p class="content">{{ paymentMethod.name }}</p>
    </div>
    <SwButton
      class="sf-button--text review__edit"
      @click="$emit('click:edit', 2)"
      >Edit</SwButton
    >
  </div>
</template>
<script>
import SwButton from '@shopware-pwa/default-theme/components/atoms/SwButton'
import { useSessionContext } from '@shopware-pwa/composables'
import { computed } from '@vue/composition-api'
export default {
  name: 'PaymentMethodSummary',
  components: {
    SwButton,
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
