<template>
  <div class="shipping-list">
    <SfTabs :open-tab="1" v-if="listAddresses">
      <SfTab title="Shipping details">
        <p class="message">
          Manage all the shipping addresses you want (work place, home address
          ...) This way you won't have to enter the shipping address manually
          with each order.
        </p>
        <Address
          v-for="address in addresses"
          :address="address"
          :key="address.id"
          :isDefaultShipping="address.id === selectedShipping"
          :isDefaultBilling="address.id === selectedBilling"
          @selectDefaultAddress="selectDefaultAddress"
          @deleteAddress="deleteAddress"
          class="shipping-list__address"
        />
        <SfButton @click="listAddresses = false">
          Add new address
        </SfButton>
      </SfTab>
    </SfTabs>
    <SfTabs v-else class="change-address">
      <SfTab title="Add new address">
        <SwAddress />
      </SfTab>
    </SfTabs>
  </div>
</template>
<script>
import {
  SfProperty,
  SfTabs,
  SfList,
  SfButton,
  SfIcon,
  SfBadge,
  SfCheckbox
} from '@storefront-ui/vue'
import { useUser } from '@shopware-pwa/composables'
import Address from './MyAddresses/Address'
import SwAddress from '../forms/SwAddress'

export default {
  name: 'MyAddresses',
  components: {
    SfProperty,
    SfTabs,
    SfList,
    SfButton,
    SfIcon,
    SfBadge,
    SfCheckbox,
    Address,
    SwAddress
  },
  data() {
    return {
      listAddresses: true,
      selectedBilling: this.defaultBillingAddressId,
      selectedShipping: this.defaultShippingAddressId
    }
  },
  setup() {
    const {
      user,
      addresses,
      loadAddresses,
      markAddressAsDefault,
      refreshUser,
      deleteAddress
    } = useUser()

    loadAddresses()

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
    await this.loadAddresses()
  },
  computed: {},
  methods: {
    async selectDefaultAddress(addressId, type) {
      await this.markAddressAsDefault({ addressId, type })
      switch (type) {
        case 'shipping':
          this.selectedShipping = addressId
          break
        case 'billing':
          this.selectedBilling = addressId
      }
      await this.loadAddresses()
    },
    async deleteAddress(addressId) {
      await this.deleteCustomerAddress(addressId)
      await this.loadAddresses()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';
@import '~@storefront-ui/shared/styles/helpers/visibility';

@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}

.shipping-list {
  margin-bottom: $spacer-extra-big;
  width: 100%;
  &__address {
    display: flex;
    padding: $spacer-big 0;
    border-top: 1px solid $c-light;
  }
}
.change-address {
  &__button {
    width: 100%;
    @include for-desktop {
      width: auto;
    }

    &--return {
      @include for-desktop {
        float: left;
      }
      margin: $spacer-big 0;
    }
  }
}

.shipping {
  display: flex;
  padding: $spacer-big 0;
  border-top: 1px solid $c-light;
}
</style>
