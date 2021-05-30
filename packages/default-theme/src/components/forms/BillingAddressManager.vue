<template>
  <div class="billing-address-manager">
    <SfHeading
      :title="$t('Billing address')"
      :description="$t('Choose your billing address')"
      class="
        sf-heading--left sf-heading--no-underline
        billing-address-manager__title
      "
    />
    <AddressManager
      v-model="selectedAddressId"
      :addresses="addresses"
      :active-address="activeBillingAddress"
    />
  </div>
</template>
<script>
import { SfHeading } from "@storefront-ui/vue"
import { useSessionContext, useUser } from "@shopware-pwa/composables"
import { ref, watch } from "@vue/composition-api"
import AddressManager from "@/components/forms/AddressManager.vue"

export default {
  name: "BillingAddressManager",
  components: {
    AddressManager,
    SfHeading,
  },
  setup(props, { root }) {
    const { addresses, loadAddresses } = useUser(root)
    loadAddresses()

    const { activeBillingAddress, setActiveBillingAddress } =
      useSessionContext(root)

    const selectedAddressId = ref(activeBillingAddress.value?.id)
    watch(selectedAddressId, (value) => {
      const selectedAddress = addresses.value.find(
        (address) => address.id === value
      )
      setActiveBillingAddress(selectedAddress)
    })

    const onAddressSuccessSave = async (addressId) => {
      await setActiveBillingAddress({ id: addressId })
      await loadAddresses()
      selectedAddressId.value = addressId
    }

    return {
      addresses,
      loadAddresses,
      selectedAddressId,
      onAddressSuccessSave,
      activeBillingAddress,
    }
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";
.billing-address-manager {
  // margin: 0 0 var(--spacer-xl) 0;
  &__title {
    --heading-padding: 0 0 var(--spacer-base) 0;
    --heading-description-margin: 0;

    @include for-desktop {
      --heading-title-font-size: var(--h3-font-size);
    }
  }
}
</style>
