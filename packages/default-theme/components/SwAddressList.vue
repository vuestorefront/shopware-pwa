<template>
  <div class="shipping-list">
    <Address
      v-for="address in addresses"
      :address="address"
      :key="address.id"
      :isDefaultShipping="address.id === selectedShipping"
      :isDefaultBilling="address.id === selectedBilling"
      @selectDefaultAddress="selectDefaultAddress"
      @deleteAddress="deleteAddress"
      @editAddress="editAddress"
      class="shipping-list__address"
    />
  </div>
</template>
<script>
import {
  SfProperty,
  SfTabs,
  SfList,
  SfIcon,
  SfBadge,
  SfCheckbox,
} from "@storefront-ui/vue"
import { useUser } from "@shopware-pwa/composables"
import Address from "@shopware-pwa/default-theme/components/account/MyAddresses/Address.vue"

export default {
  name: "MyAddresses",
  components: {
    SfProperty,
    SfTabs,
    SfList,
    SfIcon,
    SfBadge,
    SfCheckbox,
    Address,
  },
  props: {},
  data() {
    return {
      selectedBilling: this.defaultBillingAddressId,
      selectedShipping: this.defaultShippingAddressId,
    }
  },
  setup(props, { root }) {
    const {
      user,
      addresses,
      loadAddresses,
      markAddressAsDefault,
      refreshUser,
      deleteAddress,
    } = useUser(root)
    loadAddresses()
    return {
      defaultBillingAddressId: user.value.defaultBillingAddressId,
      defaultShippingAddressId: user.value.defaultShippingAddressId,
      deleteCustomerAddress: deleteAddress,
      addresses,
      loadAddresses,
      markAddressAsDefault,
      refreshUser,
    }
  },
  async mounted() {
    await this.loadAddresses()
  },
  computed: {},
  methods: {
    async selectDefaultAddress(addressId, type) {
      await this.markAddressAsDefault({ addressId, type })
      switch (type) {
        case "shipping":
          this.selectedShipping = addressId
          break
        case "billing":
          this.selectedBilling = addressId
      }
      await this.loadAddresses()
    },
    async deleteAddress(addressId) {
      await this.deleteCustomerAddress(addressId)
      await this.loadAddresses()
    },
    editAddress(addressId) {
      this.$emit("editAddress", addressId)
    },
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
