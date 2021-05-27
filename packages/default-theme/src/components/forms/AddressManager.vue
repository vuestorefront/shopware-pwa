<template>
  <div class="shipping-address-user-form">
    <SfAddressPicker>
      <SfAddress>
        <span>{{ activeAddress.firstName }} {{ activeAddress.lastName }}</span>
        <span>{{ activeAddress.street }}</span>
        <span>{{ activeAddress.zipcode }}</span>
        <span>{{ activeAddress.city }}</span>
        <span>{{ activeAddress.country.name }}</span>
        <span>{{ activeAddress.phoneNumber }}</span>
      </SfAddress>
    </SfAddressPicker>
    <SwButton
      class="sf-button color-secondary shipping-address-user-form__add-new"
      @click="
        isModalOpen = true
        isEditModeOpen = true
      "
    >
      {{ $t("Edit") }}
    </SwButton>
    <!-- <SwCheckbox
      v-model="useAsDefaultAddress"
      label="Use this address as my default one"
      class="shipping-address-user-form__default"
    /> -->
    <SfModal
      class="sw-modal"
      :title="$t('Edit address address')"
      :visible="isModalOpen"
      @close="isModalOpen = false"
    >
      <div v-if="isEditModeOpen">
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
        <SwButton
          class="sf-button color-secondary shipping-address-user-form__add-new"
          @click="
            isModalOpen = true
            isEditModeOpen = false
          "
        >
          {{ $t("Add new") }}
        </SwButton>
      </div>
      <SwAddressForm
        v-else
        @success="onAddressSave"
        @cancel="isModalOpen = false"
      />
    </SfModal>
  </div>
</template>

<script>
import { SfList, SfRadio, SfModal, SfAddressPicker } from "@storefront-ui/vue"
import { useSessionContext, useUser } from "@shopware-pwa/composables"
import SwButton from "@/components/atoms/SwButton.vue"
import { ref, watch } from "@vue/composition-api"
import SwAddressForm from "@/components/forms/SwAddressForm.vue"
// import SwCheckbox from '@/components/atoms/SwCheckbox.vue'

export default {
  name: "ShippingAddressUserForm",
  components: {
    SfList,
    SfRadio,
    // SwCheckbox,
    SwButton,
    SfModal,
    SfAddressPicker,
    SwAddressForm,
  },
  props: {
    addresses: {
      type: Array,
      default: [],
    },
    activeAddress: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { root, emit }) {
    const isModalOpen = ref(false)
    const isEditModeOpen = ref(false)

    const onAddressSave = (addressId) => {
      isModalOpen.value = false
      emit("onAddressSave", addressId)
    }

    return {
      isModalOpen,
      onAddressSave,
      isEditModeOpen,
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
