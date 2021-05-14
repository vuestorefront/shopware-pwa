<template>
  <div class="shipping-address-user-form">
    <SfList class="shipping-address-user-form__list">
      <SfListItem
        v-for="address in addresses"
        :key="address._uniqueIdentifier"
        class="shipping-address-user-form__list-item"
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
      v-model="useAsDefaultAddress"
      label="Use this address as my default one"
      class="shipping-address-user-form__default"
    /> -->
    <SwButton
      class="sf-button color-secondary shipping-address-user-form__add-new"
      @click="isModalOpen = true"
    >
      {{ $t("Add new") }}
    </SwButton>
    <SfModal
      class="sw-modal"
      :title="$t('Add address')"
      :visible="isModalOpen"
      @close="isModalOpen = false"
    >
      <SwAddressForm
        @success="onAddressSuccessSave"
        @cancel="isModalOpen = false"
      />
    </SfModal>
  </div>
</template>
<script>
import {
  SfList,
  SfRadio,
  SfCheckbox,
  SfModal,
  SfAddressPicker,
} from "@storefront-ui/vue"
import { useSessionContext, useUser } from "@shopware-pwa/composables"
import SwButton from "@/components/atoms/SwButton.vue"
import { ref, watch } from "@vue/composition-api"
import SwAddressForm from "@/components/forms/SwAddressForm.vue"

export default {
  name: "ShippingAddressUserForm",
  components: {
    SfList,
    SfRadio,
    SfCheckbox,
    SwButton,
    SfModal,
    SfAddressPicker,
    SwAddressForm,
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
    }
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";
.shipping-address-user-form {
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
