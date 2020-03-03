<template>
  <div class="shipping-list">
      <Address v-for="address in addresses"
      :address="address"
      :key="address.id"
      :isDefaultShipping="address.id === selectedShipping"
      :isDefaultBilling="address.id === selectedBilling"
      @selectDefaultAddress="selectDefaultAddress"
      @deleteAddress="deleteAddress"
      @editAddress="editAddress"
      class="shipping-list__address" />
  </div>
</template>
<script>
import { SfProperty, SfTabs, SfList, SfButton, SfIcon, SfBadge, SfCheckbox } from '@storefront-ui/vue'
import { useUser } from '@shopware-pwa/composables'
import Address from './account/MyAddresses/Address'
export default {
  name: "MyAddresses",
  components: {SfProperty, SfTabs, SfList, SfButton, SfIcon, SfBadge, SfCheckbox, Address},
  props: {
  },
  data() {
    return {
      selectedBilling: this.defaultBillingAddressId,
      selectedShipping: this.defaultShippingAddressId
    }
  },
    setup() {
    const { user, addresses, loadAddresses, markAddressAsDefault, refreshUser, deleteAddress } = useUser()
    loadAddresses();
    return {
      defaultBillingAddressId: user.value.defaultBillingAddressId,
      defaultShippingAddressId: user.value.defaultShippingAddressId,
      deleteCustomerAddress: deleteAddress,
      addresses,
      loadAddresses,
      markAddressAsDefault,
      refreshUser
    }
  },
  async mounted() {
     await this.loadAddresses();
  },
  computed: {
  },
  methods: {
    async selectDefaultAddress(addressId, type) {
      await this.markAddressAsDefault({addressId, type})
      switch(type) {
        case 'shipping':
          this.selectedShipping = addressId
          break;
        case 'billing':
          this.selectedBilling = addressId
      }
      await this.loadAddresses();
     
    },
    async deleteAddress(addressId) {
      await this.deleteCustomerAddress(addressId);
      await this.loadAddresses();
    },
    editAddress(addressId) {
      this.$emit('editAddress', addressId)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';
.shipping-list {
  margin-bottom: var(--spacer-extra-big);
  width: 100%;
  &__address {
    display: flex;
    padding: var(--spacer-big) 0;
    border-top: 1px solid var(--c-light);
  }
}
.shipping {
  display: flex;
  padding: var(--spacer-big) 0;
  border-top: 1px solid var(--c-light);
  
}
</style>