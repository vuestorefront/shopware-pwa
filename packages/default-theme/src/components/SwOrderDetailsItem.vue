<template>
  <SfTableRow :key="product.id" class="table__row">
    <SfTableData class="table__description">
      <div class="product-title">{{ getName }}</div>
      <div class="product-sku">{{ product.productNumber }}</div>
    </SfTableData>
    <SfTableData class="table__data table__price">
      <SfPrice :regular="filterPrice(getUnitPrice)" class="product-price" />
    </SfTableData>
    <SfTableData class="table__data table__quantity">
      {{ getQuantity }}
    </SfTableData>
    <SfTableData class="table__data table__amount">
      <SfPrice :regular="filterPrice(getTotalPrice)" class="product-price" />
    </SfTableData>
  </SfTableRow>
</template>
<script>
import {
  SfTable,
  SfIcon,
  SfPrice,
  SfQuantitySelector,
} from "@storefront-ui/vue"
import { usePriceFilter } from "@/logic/usePriceFilter.js"
import { computed } from "@vue/composition-api"

export default {
  name: "OrderItem",
  components: {
    SfTable,
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
  setup(props) {
    const getUnitPrice = computed(() => props.product.unitPrice)
    const getTotalPrice = computed(() => props.product.totalPrice)

    return {
      getUnitPrice,
      getTotalPrice,
      filterPrice: usePriceFilter(),
    }
  },
  computed: {
    getName() {
      return this.product.label
    },
    getQuantity() {
      return this.product.quantity
    },
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";

.product-price {
  white-space: nowrap;
}

.table {
  & > td {
    flex: 1;
    order: unset;
  }

  &__data {
    order: unset;
    flex: 1;
    --price-regular-font-weight: var(--font-weight--normal);
  }
  &__description {
    padding-right: var(--spacer-sm);
    order: unset;
    flex: 2;
  }

  &__row:hover {
    --table-row-box-shadow: none;
  }
  &__quantity {
    text-align: center;
    font-size: var(--font-size--lg);
  }
  &__amount {
    text-align: right;
  }
}
::v-deep .product-price {
  --price-regular-font-size: var(--font-size--base);
  & > * {
    flex: 1;
  }
}
</style>
