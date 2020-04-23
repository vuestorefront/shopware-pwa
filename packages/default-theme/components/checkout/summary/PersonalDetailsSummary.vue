<template>
  <div class="accordion__item">
    <div class="accordion__content">
      <p class="content">{{ firstName }} {{ lastName }}<br /></p>
      <p class="content">
        {{ email }}
      </p>
    </div>
    <SfButton
      class="sf-button--text accordion__edit"
      @click="$emit('click:edit', CHECKOUT_STEPS.PERSONAL_DETAILS)"
      >Edit</SfButton
    >
  </div>
</template>
<script>
import { SfButton } from '@storefront-ui/vue'
import { usePersonalDetailsStep } from '@shopware-pwa/default-theme/logic/checkout/usePersonalDetailsStep'
import { CHECKOUT_STEPS } from '@shopware-pwa/default-theme/logic/checkout'
import { useCheckout, useUser } from '@shopware-pwa/composables'
import { computed } from '@vue/composition-api'

export default {
  name: 'PersonalDetailsSummary',
  components: {
    SfButton,
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
@import '~@storefront-ui/vue/styles';
</style>
