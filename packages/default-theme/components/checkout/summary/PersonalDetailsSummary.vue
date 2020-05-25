<template>
  <SwPersonalDetails :personal-details="personalDetails">
    <template #after-content>
      <SfButton
        class="sf-button--text review__edit"
        @click="$emit('click:edit', CHECKOUT_STEPS.PERSONAL_DETAILS)"
        >Edit</SfButton
      >
    </template>
  </SwPersonalDetails>
</template>
<script>
import { SfButton } from '@storefront-ui/vue'
import { usePersonalDetailsStep } from '@shopware-pwa/default-theme/logic/checkout/usePersonalDetailsStep'
import { CHECKOUT_STEPS } from '@shopware-pwa/default-theme/logic/checkout'
import { useCheckout, useUser } from '@shopware-pwa/composables'
import { computed } from '@vue/composition-api'
import SwPersonalDetails from '@shopware-pwa/default-theme/components/SwPersonalDetails'


export default {
  name: 'PersonalDetailsSummary',
  components: {
    SfButton,
    SwPersonalDetails
  },
  setup() {
    const { firstName, lastName, email } = usePersonalDetailsStep()
    const { isGuestOrder } = useCheckout()
    const { user } = useUser()

    return {
      personalDetails: computed(()=> ({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value
      })),
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
