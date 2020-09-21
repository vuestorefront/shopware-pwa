<template>
  <SfTable class="sf-table--bordered table">
    <SfTableHeading class="table__row">
      <SfTableHeader class="table__header table__image">Item</SfTableHeader>
      <SfTableHeader
        v-for="tableHeader in tableHeaders"
        :key="tableHeader"
        class="table__header"
        :class="{ table__description: tableHeader === 'Description' }"
      >
        {{ tableHeader }}
      </SfTableHeader>
      <!-- <SfTableHeader class="table__action"></SfTableHeader> -->
    </SfTableHeading>
    <OrderItem v-for="item in cartItems" :product="item" :key="item.id" />
  </SfTable>
</template>
<script>
import { useCart } from "@shopware-pwa/composables"
import OrderItem from "@/components/checkout/summary/OrderItem"

import {
  SfTable,
  SfCheckbox,
  SfImage,
  SfIcon,
  SfPrice,
  SfQuantitySelector,
} from "@storefront-ui/vue"
export default {
  name: "OrderItemsTable",
  components: {
    SfTable,
    SfCheckbox,
    OrderItem,
  },
  data() {
    return {
      tableHeaders: ["Description", "Quantity", "Amount"],
    }
  },
  setup(props, { root }) {
    const { cartItems, removeProduct } = useCart(root)
    return {
      cartItems,
      removeProduct,
    }
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";
.product-sku {
  color: var(--c-text-muted);
}
.table {
  margin: 0 0 var(--spacer-base) 0;
  &__row {
    justify-content: space-between;
  }
  @include for-desktop {
    &__header {
      text-align: center;
      &:last-child {
        text-align: right;
      }
    }
    &__data {
      text-align: center;
    }
    &__description {
      text-align: left;
      flex: 0 0 20rem;
    }
    &__image {
      --image-width: 5.125rem;
      text-align: left;
      margin: 0 var(--spacer-lg) 0 0;
    }
  }
}
</style>
