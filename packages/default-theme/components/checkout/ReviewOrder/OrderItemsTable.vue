<template>
  <SfTable class="sf-table--bordered table desktop-only">
    <SfTableHeading class="table__row">
      <SfTableHeader class="table__header table__image">Item</SfTableHeader>
      <SfTableHeader
        v-for="tableHeader in tableHeaders"
        :key="tableHeader"
        class="table__header"
        >{{ tableHeader }}</SfTableHeader
      >
      <SfTableHeader class="table__action"></SfTableHeader>
    </SfTableHeading>
    <SfTableRow
      v-for="(product, index) in cartItems"
      :key="index"
      class="table__row"
    >
      <SfTableData class="table__image">
        <SfImage :src="product.cover.url" />
      </SfTableData>
      <SfTableData class="table__data table__data--left">
        <div class="product-title">{{ product.label }}</div>
        <div class="product-sku">{{ product.productNumber }}</div>
      </SfTableData>
      <SfTableData class="table__data">{{ product.quantity }}</SfTableData>
      <SfTableData class="table__data">
        <SfPrice
          :regular="formatFrontPrice(product.price.totalPrice)"
          class="product-price"
        />
      </SfTableData>
      <SfTableData class="table__action">
        <SfIcon
          icon="cross"
          size="xxs"
          color="#BEBFC4"
          role="button"
          class="button"
          @click="removeProduct(product)"
        />
      </SfTableData>
    </SfTableRow>
  </SfTable>
</template>
<script>
import { useCart } from '@shopware-pwa/composables'
import helpers from '../../../helpers'

import {
  SfTable,
  SfCheckbox,
  SfImage,
  SfIcon,
  SfPrice
} from '@storefront-ui/vue'
export default {
  name: 'BillingAddress',
  components: {
    SfTable,
    SfCheckbox,
    SfImage,
    SfIcon,
    SfPrice
  },
  data() {
    return {
      tableHeaders: ['Description', 'Quantity', 'Amount']
    }
  },
  setup() {
    const {
      cartItems,
      removeProduct
    } = useCart()
    return {
      cartItems,
      removeProduct
    }
  },
  methods: {
    formatFrontPrice(price) {
      return helpers.formatPrice(price)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';
@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}
.table {
  margin-bottom: $spacer-big;
  &__header {
    font-size: $font-size-regular-desktop;
    font-weight: $body-font-weight-primary;
    @include for-desktop {
      text-align: center;
    }
  }
  &__data {
    font-size: $font-size-small-desktop;
    text-align: center;
  }
  &__image {
    @include for-desktop {
      flex: 0 0 5.125rem;
    }
  }
  &__action {
    @include for-desktop {
      flex: 0 0 2.5rem;
    }
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
