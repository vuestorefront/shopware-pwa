<template>
  <SfCollectedProduct
    v-model="quantity"
    :image="productImage"
    :title="product.label"
    :regular-price="product.price.unitPrice | price"
    :stock="product.deliveryInformation.stock"
    class="collected-product"
    @click:remove="removeProduct(product)"
  >
  </SfCollectedProduct>
</template>
<script>
import { SfCollectedProduct } from "@storefront-ui/vue"
import { getProductMainImageUrl } from "@shopware-pwa/helpers"
import { useCart } from "@shopware-pwa/composables"
import { ref, watch, computed } from "@vue/composition-api"

export default {
  components: {
    SfCollectedProduct,
  },
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { root }) {
    const { removeProduct, changeProductQuantity } = useCart(root)

    const quantity = ref(props.product.quantity)
    const productImage = computed(() => getProductMainImageUrl(props.product))

    watch(quantity, async (qty) => {
      // in future we may want to have debounce here
      if (qty === props.product.quantity) return
      await changeProductQuantity({ id: props.product.id, quantity: qty })
    })
    watch(
      () => props.product.quantity,
      (qty) => {
        quantity.value = qty
      }
    )
    return {
      productImage,
      removeProduct,
      quantity,
    }
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";

.collected-product {
  --collected-product-actions-align-items: flex-end;
  --collected-product-title-font-size: var(--font-base);
  margin: var(--spacer-base) 0;

  &__properties {
    margin-top: var(--spacer-base);
  }

  &__actions {
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    opacity: var(--cp-actions-opacity, 0);
    transition: opacity 150ms ease-in-out;
  }

  &__actions-element {
    margin-top: var(--spacer-xs);
  }

  @include for-desktop {
    &:hover {
      --cp-actions-opacity: 1;
    }
  }
}
</style>
