<template>
  <div class="sw-checkout__personal_info">
    <PersonalDetailsGuestForm v-if="isGuestOrder" @proceed="$emit('proceed')" />
    <PersonalDetailsUserForm v-else @proceed="$emit('proceed')" />
  </div>
</template>
<script>
import { useCheckout } from '@shopware-pwa/composables'

import PersonalDetailsGuestForm from '@shopware-pwa/default-theme/components/checkout/steps/guest/PersonalDetailsGuestForm'
import PersonalDetailsUserForm from '@shopware-pwa/default-theme/components/checkout/steps/user/PersonalDetailsUserForm'

export default {
  name: 'PersonalDetailsStep',
  components: {
    PersonalDetailsGuestForm,
    PersonalDetailsUserForm,
  },
  setup() {
    const { isGuestOrder } = useCheckout()

    return {
      isGuestOrder,
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variables';
</style>
