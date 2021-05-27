<template>
  <div class="shipping-address-user-form">
    <SfHeading
      :title="$t('Shipping address')"
      :description="$t('Choose your shipping address')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <AddressManager
      v-model="selectedAddressId"
      :addresses="addresses"
      :active-address="activeShippingAddress"
    />
  </div>
</template>
<script>
import { SfHeading } from "@storefront-ui/vue"
import { useSessionContext, useUser } from "@shopware-pwa/composables"
import { ref, watch } from "@vue/composition-api"
// import SwAddressForm from "@/components/forms/SwAddressForm.vue"
import AddressManager from "@/components/forms/AddressManager.vue"

export default {
  name: "ShippingAddressUserForm",
  components: {
    AddressManager,
    SfHeading,
  },
  setup(props, { root }) {
    const { addresses, loadAddresses, user } = useUser(root)
    loadAddresses()

    const {
      refreshSessionContext,
      activeShippingAddress,
      setActiveShippingAddress,
    } = useSessionContext(root)

    const selectedAddressId = ref(activeShippingAddress.value?.id)
    watch(selectedAddressId, (value) => {
      const selectedAddress = addresses.value.find(
        (address) => address.id === value
      )
      setActiveShippingAddress(selectedAddress)
    })

    const isModalOpen = ref(false)
    const isEditModeOpen = ref(false)

    const onAddressSuccessSave = async (addressId) => {
      isModalOpen.value = false
      await setActiveShippingAddress({ id: addressId })
      await loadAddresses()
      selectedAddressId.value = addressId
    }

    return {
      addresses,
      loadAddresses,
      user,
      selectedAddressId,
      isModalOpen,
      onAddressSuccessSave,
      activeShippingAddress,
      isEditModeOpen,
    }
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";
.shipping-address-user-form {
  margin: 0 0 var(--spacer-xl) 0;

  .title {
    --heading-padding: var(--spacer-base) 0;
    --heading-description-margin: 0;

    @include for-desktop {
      --heading-title-font-size: var(--h3-font-size);
      --heading-padding: var(--spacer-lg) 0 var(--spacer-base) 0;
      &:last-of-type {
        --heading-padding: var(--spacer-xs) 0 var(--spacer-base) 0;
      }
    }
  }
}
</style>
