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
    <template #actions>
      <div class="collected-product__configuration" v-if="options">
        <SfProperty
          v-for="option in options"
          :key="`${option.group}-${option.option}`"
          :name="option.group"
          :value="option.option"
        />
      </div>
    </template>
  </SfCollectedProduct>
</template>
<script>
import { SfCollectedProduct, SfProperty } from "@storefront-ui/vue"
import { getProductMainImageUrl } from "@shopware-pwa/helpers"
import { useCart } from "@shopware-pwa/composables"
import { ref, watch, computed } from "@vue/composition-api"

export default {
  components: {
    SfCollectedProduct,
    SfProperty,
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
    const options = computed(
      () => (props.product.payload && props.product.payload.options) || []
    )

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
      options,
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

  &__configuration {
    margin-top: var(--spacer-sm);
    align-items: end;
    align-self: baseline;
    @include for-desktop {
      flex-direction: row-reverse;
    }
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
