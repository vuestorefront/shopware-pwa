<template>
  <div class="shipping-address-user-form">
    <SfList class="shipping-address-user-form__list">
      <SfListItem
        v-for="address in addresses"
        :key="address._uniqueIdentifier"
        class="shipping-address-user-form__list-item"
      >
        <SfRadio
          v-model="selectedAddressId"
          :value="address._uniqueIdentifier"
          class="shipping-address-user-form__address address"
        >
          <template #checkmark>
            <div class="sf-radio__checkmark address__checkmark" />
          </template>
          <template #label>
            <p class="address__details">
              {{ address.firstName }} {{ address.lastName }}<br />
              {{ address.street }}<br />
              {{ address.zipcode }}<br />
              {{ address.city }}<br />
              {{ address.country.name }}<br />
              {{ address.phoneNumber }}
            </p>
          </template>
        </SfRadio>
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
      title="Add address"
      :visible="isModalOpen"
      @close="isModalOpen = false"
    >
      <SwAddressForm />
    </SfModal>
  </div>
</template>
<script>
import { SfList, SfRadio, SfCheckbox, SfModal } from "@storefront-ui/vue"
import { useSessionContext, useUser } from "@shopware-pwa/composables"
import SwButton from "@/components/atoms/SwButton.vue"
import { ref, watch } from "@vue/composition-api"
import SwAddressForm from "@/components/forms/SwAddressForm.vue"

export default {
  name: "ShippingAddressUserForm",
  components: { SfList, SfRadio, SfCheckbox, SwButton, SfModal, SwAddressForm },
  setup(props, { root }) {
    const { addresses, loadAddresses, user } = useUser(root)
    loadAddresses()

    const {
      activeShippingAddress,
      setActiveShippingAddress,
    } = useSessionContext(root)

    const selectedAddressId = ref(activeShippingAddress.value.id)
    watch(selectedAddressId, (value) => {
      const selectedAddress = addresses.value.find(
        (address) => address.id === value
      )
      setActiveShippingAddress(selectedAddress)
    })

    const isModalOpen = ref(false)

    return {
      addresses,
      loadAddresses,
      user,
      selectedAddressId,
      isModalOpen,
    }
  },
  async mounted() {},
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
    }
  }
  &__list-item {
    margin: 0 0 var(--spacer-base) 0;
    &:last-child {
      margin: 0;
    }
    @include for-desktop {
      flex: 0 1 50%;
      margin: 0 var(--spacer-base) 0 0;
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
  &.sf-radio--is-active {
    border-color: var(--c-primary);
  }
}
</style>
