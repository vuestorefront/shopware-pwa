<template>
  <div class="addresses-add">
    <SwAddressForm
      v-if="address"
      :key="address.id"
      :address="address"
      @success="returnToAddresses"
      @cancel="returnToAddresses"
    />
  </div>
</template>

<script>
import { onMounted, ref } from "@vue/composition-api"
import SwAddressForm from "@/components/forms/SwAddressForm.vue"
import {
  useCustomerAddresses,
  useUser,
  getApplicationContext,
} from "@shopware-pwa/composables"

export default {
  components: { SwAddressForm },
  setup() {
    const contextName = "EditAddress"
    const { route, router, routing } = getApplicationContext({ contextName })
    const { addresses, loadAddresses } = useCustomerAddresses()
    const { country, loadCountry, salutation, loadSalutation } = useUser()
    const address = ref()

    const returnToAddresses = () => {
      router.push(routing.getUrl("/account/addresses"))
    }

    onMounted(async () => {
      const paramsId = route?.params?.id
      if (!paramsId) {
        return
      }

      await loadAddresses({
        filter: [
          {
            type: "equals",
            field: "id",
            value: paramsId,
          },
        ],
      })
      address.value = addresses.value.find((addr) => addr.id === paramsId) || {}
    })

    return {
      address,
      returnToAddresses,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.addresses-add {
  box-sizing: border-box;
  width: 100%;

  @include for-mobile {
    padding: var(--spacer-sm);
  }
}
</style>
