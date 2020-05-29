<template>
  <SfTableRow :key="product.id" class="table__row">
    <SfTableData class="table__image">
      <SfImage :src="product.cover.url" />
    </SfTableData>
    <SfTableData class="table__description">
      <div class="product-title">{{ product.label }}</div>
      <div class="product-sku">{{ product.productNumber }}</div>
    </SfTableData>
    <SfTableData class="table__data table__quantity">
      <SfQuantitySelector
        v-model="quantity"
        class="sf-quantity-selector--secondary"
        >{{ product.quantity }}</SfQuantitySelector
      >
    </SfTableData>
    <SfTableData class="table__data table__amount">
      <SfPrice
        :regular="product.price.totalPrice | price"
        class="product-price"
      />
    </SfTableData>
  </SfTableRow>
</template>
<script>
import { useCart } from '@shopware-pwa/composables'
import { ref, watch, computed } from '@vue/composition-api'
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
  setup(props) {
    const { removeProduct, changeProductQuantity } = useCart()

    const quantity = ref(props.product.quantity)
    watch(quantity, async (qty) => {
      if (qty === props.product.quantity) return
      await changeProductQuantity({ id: props.product.id, quantity: qty })
    })
    return {
      removeProduct,
      quantity,
    }
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variables';

.sf-image {
  max-width: 80%;
}

.table {
  &__description {
    text-align: left;
    flex: 0 0 20rem;
  }
  &__data {
    text-align: center;
    &:last-of-type {
      text-align: right;
    }
  }
  &__quantity {
    text-align: center;
    font-size: var(--font-lg);
    & > * {
      --quantity-selector-width: 6rem;
      --quantity-selector-border-width: 0;
    }
  }
  &__amount {
    text-align: right;
  }
}
::v-deep .product-price {
  & > * {
    flex: 1;
  }
}
</style>
