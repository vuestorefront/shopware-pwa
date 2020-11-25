<template>
  <SfCollectedProduct
    v-model="quantity"
    :image="productImage"
    :title="product.label"
    :regular-price="regularPrice | price"
    :special-price="specialPrice | price"
    :link="productUrl"
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
import { getProductMainImageUrl, getProductUrl } from "@shopware-pwa/helpers"
import { useCart, getApplicationContext } from "@shopware-pwa/composables"
import { ref, watch, computed, onMounted } from "@vue/composition-api"
import { SfCollectedProduct, SfProperty } from "@storefront-ui/vue"

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
    additionalItemsData: {
      type: Array,
      default: () => [],
    },
  },
  setup({ product, additionalItemsData }, { root }) {
    const { apiInstance } = getApplicationContext(root, "SwCartProduct")
    const { removeProduct, changeProductQuantity } = useCart(root)

    // get the URL from async loaded product data - passed by the parent component
    const productUrl = computed(() => {
      const matchingProductAdditionalData = additionalItemsData.find(
        ({ id }) => id === product.referencedId
      )
      return getProductUrl(matchingProductAdditionalData)
    })
    const quantity = ref(product.quantity)
    const productImage = computed(() => getProductMainImageUrl(product))
    // it's not 1:1 to Product entity interface
    const regularPrice = computed(
      () =>
        (product.price.listPrice && product.price.listPrice.price) ||
        product.price.unitPrice
    )
    const specialPrice = computed(
      () => product.price.listPrice && product.price.unitPrice
    )

    const options = computed(
      () => (product.payload && product.payload.options) || []
    )

    watch(quantity, async (qty) => {
      // in future we may want to have debounce here
      if (qty === product.quantity) return
      await changeProductQuantity({ id: product.id, quantity: qty })
    })
    watch(
      () => product.quantity,
      (qty) => {
        quantity.value = qty
      }
    )
    return {
      productImage,
      removeProduct,
      quantity,
      regularPrice,
      specialPrice,
      productUrl,
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

  &__main {
    .sf-price {
      &__old {
        font-size: var(--size-xs);
      }
    }
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
