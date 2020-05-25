<template>
  <div>
    <div class="address-list">
      <SfRadio
        v-for="address in shippingAddresses"
        :key="address.id"
        v-model="shippingAddress"
        :value="address.id"
        class="address-list__address address"
      >
        <template #checkmark
          ><div class="sf-radio__checkmark address__checkmark"></div
        ></template>
        <template #label>
          {{ address.name }}<br />
          {{ address.street }}<br />
          {{ address.code }}<br />
          {{ address.city }}, {{ address.district }}<br />
          {{ address.country }}<br />
          {{ address.phone }}<br />
        </template>
      </SfRadio>
    </div>
    <SfCheckbox
      v-model="invoice"
      label="I want to generate invoice for the company"
    />
    <SfCheckbox
      v-model="setAsDefault"
      label="Use this address as my default one"
    />
    <SfButton class="sf-button color-secondary">Add new</SfButton>
  </div>
</template>
<script>
import { SfRadio, SfCheckbox, SfButton } from '@storefront-ui/vue'
export default {
  name: 'BillingAddressUserForm',
  components: {
    SfRadio,
    SfCheckbox,
    SfButton,
  },
  setup() {
    return {}
  },
  data() {
    return {
      shippingAddresses: [
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
      shippingAddress: '01',
      invoice: false,
      setAsDefault: false,
    }
  },
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';
.address-list {
  display: flex;
  justify-content: space-between;
}
.address {
  flex: 1;
  position: relative;
  --radio-container-padding: var(--spacer-sm) var(--spacer-base);
  --radio-background: transparent;
  border: 1px solid transparent;
  transition: border-color 150ms ease-in-out;
  &.sf-radio--is-active {
    border-color: var(--c-primary);
  }
  &__checkmark {
    position: absolute;
    top: var(--spacer-xs);
    right: var(--spacer-xs);
  }
}
</style>
