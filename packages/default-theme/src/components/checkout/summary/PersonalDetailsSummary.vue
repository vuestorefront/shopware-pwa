<template>
  <SwPersonalDetails :personal-details="personalDetails">
    <template #after-content>
      <SwButton
        class="sf-button--text review__edit"
        @click="$emit('click:edit', CHECKOUT_STEPS.PERSONAL_DETAILS)"
      >
        {{ $t("Edit") }}
      </SwButton>
    </template>
  </SwPersonalDetails>
</template>
<script>
import SwButton from "@/components/atoms/SwButton.vue"
import { usePersonalDetailsStep } from "@/logic/checkout/usePersonalDetailsStep"
import { CHECKOUT_STEPS } from "@/logic/checkout"
import { useCheckout, useUser } from "@shopware-pwa/composables"
import { computed } from "@vue/composition-api"
import SwPersonalDetails from "@/components/SwPersonalDetails.vue"

export default {
  name: "PersonalDetailsSummary",
  components: {
    SwPersonalDetails,
    SwButton,
  },
  setup(props, { root }) {
    const { firstName, lastName, email } = usePersonalDetailsStep(root)
    const { isGuestOrder } = useCheckout(root)
    const { user } = useUser(root)

    return {
      personalDetails: computed(() => ({
        firstName: isGuestOrder.value ? firstName.value : user.value.firstName,
        lastName: isGuestOrder.value ? lastName.value : user.value.lastName,
        email: isGuestOrder.value ? email.value : user.value.email,
      })),
      CHECKOUT_STEPS,
    }
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";
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
