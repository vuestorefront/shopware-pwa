<template>
  <div class="address-manager-user-form">
    <SfHeading
      :title="titleText || $t('Shipping address')"
      :description="subtitleText || $t('Choose address')"
      class="
        sf-heading--left sf-heading--no-underline
        address-manager-user-form__title
      "
    />
    <div class="address-manager-user-form__address" v-if="activeAddress">
      <div>
        <span>{{ activeAddress.firstName }} {{ activeAddress.lastName }}</span>
        <span>{{ activeAddress.street }}</span>
        <p>{{ activeAddress.zipcode }}</p>
        <p>{{ activeAddress.city }}</p>
        <p>{{ activeAddress.country.name }}</p>
        <p>{{ activeAddress.phoneNumber }}</p>
      </div>
      <SwButton
        class="sf-button sf-button--small address-manager-user-form__add-new"
        @click="
          isModalOpen = true
          isEditModeOpen = true
        "
      >
        {{ $t("Edit") }}
      </SwButton>
    </div>
    <!-- <SwCheckbox
      v-model="useAsDefaultAddress"
      label="Use this address as my default one"
      class="address-manager-user-form__default"
    /> -->
    <SfModal
      class="sw-modal"
      :title="$t('Edit address')"
      :visible="isModalOpen"
      @close="isModalOpen = false"
    >
      <SfHeading
        :title="$t('Edit address')"
        class="title desktop-only"
        :level="4"
      />
      <div v-if="isEditModeOpen">
        <SfList class="address-manager-user-form__list">
          <SfListItem
            v-for="address in addresses"
            :key="address._uniqueIdentifier"
            class="address-manager-user-form__list-item"
          >
            <SfAddressPicker
              :selected="activeAddress.id"
              @change="onAddressChange"
            >
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
          class="sf-button color-secondary address-manager-user-form__add-new"
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
import {
  SfList,
  SfHeading,
  SfRadio,
  SfModal,
  SfAddressPicker,
} from "@storefront-ui/vue"
import { useSessionContext, useUser } from "@shopware-pwa/composables"
import SwButton from "@/components/atoms/SwButton.vue"
import { ref, watch } from "@vue/composition-api"
import SwAddressForm from "@/components/forms/SwAddressForm.vue"
// import SwCheckbox from '@/components/atoms/SwCheckbox.vue'

export default {
  name: "SwAddressManager",
  components: {
    SfList,
    SfRadio,
    // SwCheckbox,
    SwButton,
    SfModal,
    SfAddressPicker,
    SwAddressForm,
    SfHeading,
  },
  props: {
    addresses: {
      type: Array,
      default: [],
    },
    activeAddress: {
      type: Object,
      default: null,
    },
    titleText: {
      type: String,
      default: null,
    },
    subtitleText: {
      type: String,
      default: null,
    },
  },
  setup(props, { root, emit }) {
    const isModalOpen = ref(false)
    const isEditModeOpen = ref(false)

    const onAddressSave = (addressId) => {
      isModalOpen.value = false
      emit("added", addressId)
    }

    function onAddressChange(value) {
      emit("change", value)
    }

    return {
      isModalOpen,
      onAddressSave,
      isEditModeOpen,
      onAddressChange,
    }
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";
.address-manager-user-form {
  &__list {
    margin: 0 0 var(--spacer-xl) 0;
    @include for-desktop {
      display: flex;
      flex-wrap: wrap;
    }
  }
  &__address {
    display: flex;
    border: 1px solid var(--c-primary);
    padding: var(--spacer-sm);
    justify-content: space-between;
    align-items: center;
    p {
      margin: 0;
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
  &__title {
    --heading-padding: 0 0 var(--spacer-base) 0;
    --heading-description-margin: 0;

    @include for-desktop {
      --heading-title-font-size: var(--h3-font-size);
    }
  }
}
.title {
  --heading-description-margin: 0;

  @include for-desktop {
    --heading-padding: var(--spacer-sm) 0;
    --heading-title-font-size: var(--h3-font-size);
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
