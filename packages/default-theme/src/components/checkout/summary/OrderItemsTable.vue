<template>
  <SfTable class="sf-table--bordered table">
    <SfTableHeading class="table__row">
      <SfTableHeader class="table__header table__image">
        {{ $t("Item") }}
      </SfTableHeader>
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
import OrderItem from "@/components/checkout/summary/OrderItem.vue"

import {
  SfTable,
  SfIcon,
  SfPrice,
  SfQuantitySelector,
} from "@storefront-ui/vue"
export default {
  name: "OrderItemsTable",
  components: {
    SfTable,
    OrderItem,
  },
  data() {
    return {
      tableHeaders: [
        this.$t("Description"),
        this.$t("Quantity"),
        this.$t("Amount"),
      ],
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
  ::v-deep .sf-image {
    --image-width: 5.125rem;
  }
  margin: 0 0 var(--spacer-base) 0;
  &__row {
    justify-content: space-between;
  }
  @include for-desktop {
    &__header {
      text-align: right;
      &:first-child {
        max-width: 100px;
      }
    }
    &__data {
      text-align: center;
    }
    &__description,
    &__image {
      text-align: left;
    }
  }
}
</style>
