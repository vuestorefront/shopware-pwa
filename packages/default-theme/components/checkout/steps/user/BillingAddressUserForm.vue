<template>
  <div class="billing-address-user-form">
    <SfList class="billing-address-user-form__list">
      <SfListItem
        v-for="address in addresses"
        :key="address.id"
        class="billing-address-user-form__list-item"
      >
        <SfRadio
          v-model="selectedAddress"
          :value="address.id"
          class="billing-address-user-form__address address"
        >
          <template #checkmark>
            <div class="sf-radio__checkmark address__checkmark" />
          </template>
          <template #label>
            <p class="address__details">
              {{ address.name }}<br />
              {{ address.street }}<br />
              {{ address.code }}<br />
              {{ address.city }}, {{ address.district }}<br />
              {{ address.country }}<br />
              {{ address.phone }}<br />
            </p>
          </template>
        </SfRadio>
      </SfListItem>
    </SfList>
    <SfCheckbox
      v-model="generateInvoice"
      label="I want to generate invoice for the company"
      class="billing-address-user-form__invoice"
    />
    <SfCheckbox
      v-model="useAsDefaultAddress"
      label="Use this address as my default one"
      class="billing-address-user-form__default"
    />
    <SfButton
      class="sf-button color-secondary billing-address-user-form__add-new"
      >Add new</SfButton
    >
  </div>
</template>
<script>
import { SfList, SfRadio, SfCheckbox, SfButton } from '@storefront-ui/vue'
export default {
  name: 'BillingAddressUserForm',
  components: { SfList, SfRadio, SfCheckbox, SfButton },
  data() {
    return {
      addresses: [
        {
          id: '01',
          name: 'Jerzy Urban',
          street: 'Mazowiecka 34',
          code: '02-020',
          city: 'Warszawa',
          district: 'Mazowieckie',
          country: 'Poland',
          phone: '+48 777 777 777',
        },
        {
          id: '02',
          name: 'Jerzy Urban',
          street: 'Mazowiecka 34',
          code: '02-020',
          city: 'Warszawa',
          district: 'Mazowieckie',
          country: 'Poland',
          phone: '+48 777 777 777',
        },
      ],
      selectedAddress: '01',
      generateInvoice: false,
      useAsDefaultAddress: false,
    }
  },
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';
.billing-address-user-form {
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
