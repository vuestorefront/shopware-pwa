<template>
  <div class="shipping-list" v-if="addresses">
    <Address
      v-for="address in addresses"
      :key="address.id"
      :address="address"
      :is-default-shipping="address.id === selectedShipping"
      :is-default-billing="address.id === selectedBilling"
      class="shipping-list__address"
      @selectDefaultAddress="selectDefaultAddress"
      @deleteAddress="deleteAddress"
      @editAddress="$emit('editAddress', address.id)"
    />
  </div>
</template>
<script>
import { onMounted, computed, ref } from "@vue/composition-api"
import { useUser } from "@shopware-pwa/composables"
import Address from "@/components/account/MyAddresses/Address.vue"

export default {
  name: "MyAddresses",
  components: {
    Address,
  },
  setup(props, { root }) {
    const {
      user,
      addresses,
      loadAddresses,
      markAddressAsDefault,
      refreshUser,
      deleteAddress: deleteCustomerAddress,
    } = useUser(root)

    loadAddresses()
    const selectedBilling = computed(() => user.value?.defaultBillingAddressId)
    const selectedShipping = computed(
      () => user.value?.defaultShippingAddressId
    )

    const selectDefaultAddress = async (addressId, type) => {
      await markAddressAsDefault({ addressId, type })
      await refreshUser()
      await loadAddresses()
    }

    const deleteAddress = async (addressId) => {
      await deleteCustomerAddress(addressId)
      await loadAddresses()
    }

    onMounted(() => {
      loadAddresses()
    })

    return {
      selectDefaultAddress,
      selectedBilling,
      selectedShipping,
      addresses,
      deleteAddress,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";
.shipping-list {
  margin-bottom: var(--spacer-xl);
  width: 100%;
  &__address {
    display: flex;
    padding: var(--spacer-base) 0;
    border-top: 1px solid var(--c-light);
  }
}
.shipping {
  display: flex;
  padding: var(--spacer-base) 0;
  border-top: 1px solid var(--c-light);
}
</style>
