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
import { useCart, useUser } from '@shopware-pwa/composables'
import helpers from '../../../helpers'

import {
  SfHeading,
  SfTable,
  SfInput,
  SfCheckbox,
  SfButton,
  SfModal,
  SfCharacteristic,
  SfImage,
  SfIcon,
  SfPrice,
} from '@storefront-ui/vue'
export default {
  name: 'BillingAddress',
  components: {
    SfHeading,
    SfTable,
    SfInput,
    SfCheckbox,
    SfButton,
    SfModal,
    SfCharacteristic,
    SfImage,
    SfIcon,
    SfPrice,
  },
  data() {
    return {
      tableHeaders: ['Description', 'Quantity', 'Amount']
    }
  },
  setup() {
    const { cartItems, subtotal, totalPrice, placeOrder: placeApiOrder, refreshCart, removeProduct } = useCart()
    const { isLoggedIn } = useUser()
    return {
      refreshCart,
      cartItems,
      subtotal,
      total: totalPrice,
      placeApiOrder,
      isUserLoggedIn: isLoggedIn,
      removeProduct
    }
  },
  methods: {
    formatFrontPrice(price) {
      return helpers.formatPrice(price);
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';

</style>
