<template>
  <div class="review__item">
    <div class="review__content">
      <h4 class="review__title desktop-only">Personal details</h4>
      <p class="content">{{ firstName }} {{ lastName }}<br /></p>
      <p class="content">
        {{ email }}
      </p>
    </div>
    <SwButton
      class="sf-button--text review__edit"
      @click="$emit('click:edit', CHECKOUT_STEPS.PERSONAL_DETAILS)"
      >Edit</SwButton
    >
  </div>
</template>
<script>
import SwButton from '@shopware-pwa/default-theme/components/atoms/SwButton'
import { usePersonalDetailsStep } from '@shopware-pwa/default-theme/logic/checkout/usePersonalDetailsStep'
import { CHECKOUT_STEPS } from '@shopware-pwa/default-theme/logic/checkout'
import { useCheckout, useUser } from '@shopware-pwa/composables'
import { computed } from '@vue/composition-api'

export default {
  name: 'PersonalDetailsSummary',
  components: {
    SwButton,
  },
  setup() {
    const { firstName, lastName, email } = usePersonalDetailsStep()
    const { isGuestOrder } = useCheckout()
    const { user } = useUser()

    return {
      firstName: computed(() =>
        isGuestOrder.value ? firstName.value : user.value.firstName
      ),
      lastName: computed(() =>
        isGuestOrder.value ? lastName.value : user.value.lastName
      ),
      email: computed(() =>
        isGuestOrder.value ? email.value : user.value.email
      ),
      CHECKOUT_STEPS,
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
