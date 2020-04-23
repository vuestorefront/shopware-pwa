<template>
  <SfTable class="sf-table--bordered table">
    <h4 class="table__heading mobile-only">Order items</h4>
    <SfTableHeading class="table__row">
      <SfTableHeader class="table__header table__image">Item</SfTableHeader>
      <SfTableHeader
        v-for="tableHeader in tableHeaders"
        :key="tableHeader"
        class="table__header"
      >
        {{ tableHeader }}
      </SfTableHeader>
      <SfTableHeader class="table__action"></SfTableHeader>
    </SfTableHeading>
    <OrderItem v-for="item in cartItems" :product="item" :key="item.id" />
  </SfTable>
</template>
<script>
import { useCart } from '@shopware-pwa/composables'
import OrderItem from './OrderItem'

import {
  SfTable,
  SfCheckbox,
  SfImage,
  SfIcon,
  SfPrice,
  SfQuantitySelector
} from '@storefront-ui/vue'
export default {
  name: 'OrderItemsTable',
  components: {
    SfTable,
    SfCheckbox,
    OrderItem
  },
  data() {
    return {
      tableHeaders: ['Description', 'Quantity', 'Amount']
    }
  },
  setup() {
    const { cartItems, removeProduct } = useCart()
    return {
      cartItems,
      removeProduct
    }
  }
}
</script>
<style lang="scss">
@import '~@storefront-ui/vue/styles';

.table {
  margin-bottom: var(--spacer-base);
  &__row {
    @include for-mobile {
      flex: 1;
      margin: unset;
    }
  }

  &__heading {
    margin-bottom: 20px;
  }

  &__header:nth-child(even) {
    order: unset;
  }

  &__header {
    font-size: var(--font-base);
    font-weight: var(--font-light);
    @include for-desktop {
      text-align: center;
    }
    @include for-mobile {
      flex: 1;
      margin: unset;
    }
  }

  &__data:nth-child(even) {
    order: unset;
  }

  &__data {
    font-size: var(--font-sm);
    text-align: center;

    @include for-mobile {
      flex: 1;
      align-items: center;
      text-align: unset;
    }
  }
  &__quantity {
    .sf-input {
      margin: auto;
      @include for-mobile {
        margin: unset;
        text-align: unset;
      }
    }
  }
  &__image {
    flex: 0 0 5.125rem;
  }
  &__action {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    @include for-mobile {
      flex: 0 0 0.5rem;
    }

    @include for-desktop {
      flex: 0 0 2.5rem;
    }
  }
}
</style>
