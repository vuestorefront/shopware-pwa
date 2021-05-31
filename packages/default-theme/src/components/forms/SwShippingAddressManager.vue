<template>
  <div class="shipping-address-manager">
    <SfHeading
      :title="$t('Shipping address')"
      :description="$t('Choose your shipping address')"
      class="
        sf-heading--left sf-heading--no-underline
        shipping-address-manager__title
      "
    />
    <SwAddressManager
      :addresses="addresses"
      :active-address="activeShippingAddress"
      @change="changeActiveAddress"
      @added="changeAndLoad"
    />
  </div>
</template>
<script>
import { SfHeading } from "@storefront-ui/vue"
import { useSessionContext, useUser } from "@shopware-pwa/composables"
import { ref, watch } from "@vue/composition-api"
import SwAddressManager from "@/components/forms/SwAddressManager.vue"

export default {
  name: "SwShippingAddressManager",
  components: {
    SwAddressManager,
    SfHeading,
  },
  setup(props, { root }) {
    const { addresses, loadAddresses } = useUser(root)
    loadAddresses()

    const {
      refreshSessionContext,
      activeShippingAddress,
      setActiveShippingAddress,
    } = useSessionContext(root)

    const changeActiveAddress = async (addressId) => {
      await setActiveShippingAddress({ id: addressId })
    }

    const changeAndLoad = async (addressId) => {
      setActiveShippingAddress({ id: addressId })
      loadAddresses()
    }

    return {
      addresses,
      changeAndLoad,
      changeActiveAddress,
      activeShippingAddress,
    }
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";
.shipping-address-manager {
  &__title {
    --heading-padding: 0 0 var(--spacer-base) 0;
    --heading-description-margin: 0;

    @include for-desktop {
      --heading-title-font-size: var(--h3-font-size);
    }
  }
}
</style>
