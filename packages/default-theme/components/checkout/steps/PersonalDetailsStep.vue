<template>
  <div class="sw-checkout__personal_info">
    <SfHeading
      title="1. Personal details"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <PersonalDetailsGuestForm v-if="isGuestOrder" @proceed="$emit('proceed')" />
    <PersonalDetailsUserForm v-else @proceed="$emit('proceed')" />
  </div>
</template>
<script>
import { SfHeading } from '@storefront-ui/vue'

import { useCheckout } from '@shopware-pwa/composables'

import PersonalDetailsGuestForm from '@shopware-pwa/default-theme/components/checkout/steps/guest/PersonalDetailsGuestForm'
import PersonalDetailsUserForm from '@shopware-pwa/default-theme/components/checkout/steps/user/PersonalDetailsUserForm'

export default {
  name: 'PersonalDetailsStep',
  components: {
    SfHeading,
    PersonalDetailsGuestForm,
    PersonalDetailsUserForm,
  },
  setup() {
    const { isGuestOrder } = useCheckout()

    return {
      isGuestOrder,
    }
  },
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';
</style>
