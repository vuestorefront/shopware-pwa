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
  </SfCollectedProduct>
</template>
<script>
import { SfCollectedProduct } from "@storefront-ui/vue"
import { getProductMainImageUrl, getProductUrl } from "@shopware-pwa/helpers"
import { getProduct } from "@shopware-pwa/shopware-6-client"
import { useCart, getApplicationContext } from "@shopware-pwa/composables"
import { ref, watch, computed, onMounted } from "@vue/composition-api"

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
    const { apiInstance } = getApplicationContext(root, "SwCartProduct")
    const { removeProduct, changeProductQuantity } = useCart(root)
    const productUrl = ref("")
    const quantity = ref(props.product.quantity)
    const productImage = computed(() => getProductMainImageUrl(props.product))
    // it's not 1:1 to Product entity interface
    const regularPrice = computed(
      () =>
        (props.product.price.listPrice &&
          props.product.price.listPrice.price) ||
        props.product.price.unitPrice
    )
    const specialPrice = computed(
      () => props.product.price.listPrice && props.product.price.unitPrice
    )

    onMounted(async () => {
      // async load of seoUrls only
      const response = await getProduct(
        `${props.product.id}?includes[product][]=seoUrls&includes[product][]=id&includes[seo_url][]=seoPathInfo&associations[seoUrls][]`,
        null,
        apiInstance
      )
      productUrl.value = getProductUrl(response)
    })

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
      regularPrice,
      specialPrice,
      productUrl,
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
