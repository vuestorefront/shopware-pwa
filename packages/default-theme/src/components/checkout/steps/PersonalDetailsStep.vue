<template>
  <div class="sw-checkout__personal_info">
    <PersonalDetailsGuestForm v-if="isGuestOrder" @proceed="$emit('proceed')" />
    <PersonalDetailsUserForm v-else @proceed="$emit('proceed')" />
  </div>
</template>
<script>
import { useCheckout } from "@shopware-pwa/composables"

import PersonalDetailsGuestForm from "@/components/checkout/steps/guest/PersonalDetailsGuestForm"
import PersonalDetailsUserForm from "@/components/checkout/steps/user/PersonalDetailsUserForm"

export default {
  name: "PersonalDetailsStep",
  components: {
    PersonalDetailsGuestForm,
    PersonalDetailsUserForm,
  },
  setup(props, { root }) {
    const { isGuestOrder } = useCheckout(root)

    return {
      isGuestOrder,
    }
  },
}
</script>
