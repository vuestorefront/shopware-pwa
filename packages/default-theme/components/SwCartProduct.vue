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
      <div class="collected-product__actions">
        <SwButton class="sf-button--text collected-product__actions-element">
          Save for later
        </SwButton>
        <SwButton class="sf-button--text collected-product__actions-element">
          Add to compare
        </SwButton>
      </div>
    </template>
  </SfCollectedProduct>
</template>
<script>
import {
  SfProperty,
  SfCollectedProduct,
  SfCircleIcon,
} from "@storefront-ui/vue"
import { getProductMainImageUrl } from "@shopware-pwa/helpers"
import { useCart } from "@shopware-pwa/composables"
import { ref, watch, computed } from "@vue/composition-api"
import SwButton from "@shopware-pwa/default-theme/components/atoms/SwButton"

export default {
  components: {
    SwButton,
    SfCircleIcon,
    SfProperty,
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
  computed: {
    getName() {
      return getProductName({ product: this.product })
    },
    getProductRating() {
      return this.product && this.product.ratingAverage
    },
    // should be replaced with prettyUrl attribute when pretty urls are included in product entity
    getRouterLink() {
      return getProductUrl(this.product)
    },
    getRegularPrice() {
      const regular = getProductRegularPrice(this.product)
      const special = getProductSpecialPrice(this.product)
      // temporary fix to show proper regular price
      return "$" + (regular > special ? regular : special)
    },
    getSpecialPrice() {
      const special = getProductSpecialPrice(this.product)
      const regular = getProductRegularPrice(this.product)
      // temporary fix to show proper special price
      return special && "$" + (special < regular ? special : regular)
    },
    getImageUrl() {
      return getProductMainImageUrl(this.product)
    },
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";

.collected-product {
  --collected-product-actions-align-items: flex-end;
  margin: var(--spacer-base) 0;
  &__properties {
    margin-top: var(--spacer-base);
  }
  &__actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    transition: opacity 150ms ease-in-out;
    opacity: var(--cp-actions-opacity, 0);
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
