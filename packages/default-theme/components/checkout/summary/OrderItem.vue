<template>
  <SfTableRow class="table__row" :key="product.id">
    <SfTableData class="table__image">
      <SfImage :src="product.cover.url" />
    </SfTableData>
    <SfTableData class="table__data table__data--left">
      <div class="product-title">{{ product.label }}</div>
      <div class="product-sku">{{ product.productNumber }}</div>
    </SfTableData>
    <SfTableData class="table__data table__quantity">
      <SfQuantitySelector v-model="quantity">{{
        product.quantity
      }}</SfQuantitySelector>
    </SfTableData>
    <SfTableData class="table__data">
      <SfPrice
        :regular="product.price.totalPrice | price"
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
  SfQuantitySelector
} from '@storefront-ui/vue'

export default {
  name: 'OrderItem',
  components: {
    SfTable,
    SfCheckbox,
    SfImage,
    SfIcon,
    SfPrice,
    SfQuantitySelector
  },
  props: {
    product: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const { removeProduct, changeProductQuantity } = useCart()

    const quantity = ref(props.product.quantity)
    watch(quantity, async qty => {
      if (qty === props.product.quantity) return
      await changeProductQuantity({ id: props.product.id, quantity: qty })
    })
    return {
      removeProduct,
      quantity
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';

.sf-image {
  max-width: 80%;
}
</style>
