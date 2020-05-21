<template>
  <SfTableRow class="table__row" :key="product.id">
    <SfTableData class="table__description">
      <div class="product-title">{{ getName }}</div>
      <div class="product-sku">{{ product.productNumber }}</div>
    </SfTableData>
    <SfTableData class="table__data">
      <SfPrice :regular="getUnitPrice | price" class="product-price" />
    </SfTableData>
    <SfTableData class="table__data table__quantity">
      {{ getQuantity }}
    </SfTableData>
    <SfTableData class="table__data">
      <SfPrice :regular="getTotalPrice | price" class="product-price" />
    </SfTableData>
  </SfTableRow>
</template>
<script>
import {
  SfTable,
  SfCheckbox,
  SfImage,
  SfIcon,
  SfPrice,
  SfQuantitySelector,
} from '@storefront-ui/vue'

export default {
  name: 'OrderItem',
  components: {
    SfTable,
    SfCheckbox,
    SfImage,
    SfIcon,
    SfPrice,
    SfQuantitySelector,
  },
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    getName() {
      return this.product.label
    },
    getUnitPrice() {
      return this.product.unitPrice
    },
    getTotalPrice() {
      return this.product.totalPrice
    },
    getQuantity() {
      return this.product.quantity
    },
  },
}
</script>
<style lang="scss" scoped>
.table {
  &__description {
    flex: 3;
  }

  &__row:hover {
    --table-row-box-shadow: none;
  }
}
</style>
