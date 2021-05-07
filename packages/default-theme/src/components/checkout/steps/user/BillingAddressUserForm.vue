<template>
  <div class="billing-address-user-form">
    <SfList class="billing-address-user-form__list">
      <SfListItem
        v-for="address in addresses"
        :key="address._uniqueIdentifier"
        class="billing-address-user-form__list-item"
      >
        <SfAddressPicker v-model="selectedAddressId">
          <SfAddress :name="address._uniqueIdentifier">
            <span>{{ address.firstName }} {{ address.lastName }}</span>
            <span>{{ address.street }}</span>
            <span>{{ address.zipcode }}</span>
            <span>{{ address.city }}</span>
            <span>{{ address.country.name }}</span>
            <span>{{ address.phoneNumber }}</span>
          </SfAddress>
        </SfAddressPicker>
      </SfListItem>
    </SfList>
    <!-- <SfCheckbox
      v-model="generateInvoice"
      label="I want to generate invoice for the company"
      class="billing-address-user-form__invoice"
    />
    <SfCheckbox
      v-model="useAsDefaultAddress"
      label="Use this address as my default one"
      class="billing-address-user-form__default"
    /> -->
    <!-- <SwButton
      class="sf-button color-secondary billing-address-user-form__add-new"
      >Add new</SwButton
    > -->
  </div>
</template>
<script>
import {
  SfList,
  SfRadio,
  SfCheckbox,
  SfAddressPicker,
} from "@storefront-ui/vue"
import { useSessionContext, useUser } from "@shopware-pwa/composables"
import SwButton from "@/components/atoms/SwButton.vue"
import { ref, watch } from "@vue/composition-api"

export default {
  name: "ShippingAddressUserForm",
  components: { SfList, SfRadio, SfCheckbox, SwButton, SfAddressPicker },
  setup(props, { root }) {
    const { addresses, loadAddresses } = useUser(root)
    loadAddresses()

    const { activeBillingAddress, setActiveBillingAddress } = useSessionContext(
      root
    )

    const selectedAddressId = ref(activeBillingAddress.value?.id)
    watch(selectedAddressId, (value) => {
      const selectedAddress = addresses.value.find(
        (address) => address.id === value
      )
      setActiveBillingAddress(selectedAddress)
    })

    return {
      addresses,
      loadAddresses,
      selectedAddressId,
    }
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";
.billing-address-user-form {
  margin: 0 0 var(--spacer-xl) 0;
  &__list {
    margin: 0 0 var(--spacer-xl) 0;
    @include for-desktop {
      display: flex;
      flex-wrap: wrap;
    }
  }
  &__list-item {
    margin: 0 0 var(--spacer-base) 0;
    &:last-child {
      margin: 0;
    }
    @include for-desktop {
      flex: 0 1;
      margin: 0 var(--spacer-base) var(--spacer-base) 0;
      &:last-child {
        margin: 0;
      }
    }
  }
  &__invoice {
    margin: 0 0 var(--spacer-base) 0;
  }
  &__default {
    margin: 0 0 var(--spacer-xl) 0;
  }
  &__add-new {
    @include for-mobile {
      --button-width: 100%;
    }
  }
}
.address {
  --radio-container-padding: var(--spacer-sm) var(--spacer-base);
  --radio-background: transparent;
  --radio-checkmark-border-color: transparent;
  --radio-content-margin: 0;
  position: relative;
  border: 1px solid var(--c-dark-variant);
  transition: border-color 150ms ease-in-out;
  @include for-desktop {
    border-color: transparent;
  }
  &:hover {
    border-color: var(--c-primary);
  }
  &__checkmark {
    position: absolute;
    top: var(--spacer-xs);
    right: var(--spacer-xs);
  }
  &__details {
    padding: 0;
    margin: 0;
  }
  &.sf-radio .is-active {
    border-color: var(--c-primary);
  }
}
</style>
