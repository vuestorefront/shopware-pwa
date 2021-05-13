<template>
  <SfCollectedProduct
    v-model="quantity"
    :image="productImage"
    :title="product.label"
    :regular-price="regularPrice | price"
    :special-price="specialPrice | price"
    :link="productUrl"
    :stock="stock"
    class="collected-product"
    :class="{ promotion: isPromotion }"
    @click:remove="removeProduct(product)"
  >
    <template #configuration>
      <div class="collected-product__configuration" v-if="options">
        <SfProperty
          v-for="option in options"
          :key="`${option.group}-${option.option}`"
          :name="option.group"
          :value="option.option"
        />
      </div>
    </template>
    <template #image>
      <SwImage
        v-if="!isPromotion"
        :src="productImage"
        :alt="product.label"
        style="--image-width: 140px; --image-height: 200px"
      />
      <div v-else>
        <svg
          viewBox="0 0 24 24"
          preserveAspectRatio="none"
          class="sf-icon-path"
        >
          <path
            d="M18.6 8.40005H15.8734C16.0794 8.04639 16.1997 7.63715 16.1997 7.19981C16.1997 5.88005 15.1204 4.80005 13.7999 4.80005C13.0841 4.80005 12.4407 5.11926 11.9999 5.6206C11.559 5.11926 10.9157 4.80005 10.1999 4.80005C8.87942 4.80005 7.80012 5.88005 7.80012 7.19981C7.80012 7.63645 7.92036 8.04567 8.12637 8.40005H5.40027C5.03956 8.40005 4.7998 8.63981 4.7998 8.99981V11.4003C4.7998 11.7603 5.03956 12 5.39957 12V18.6003C5.39957 18.9596 5.63933 19.2 5.99933 19.2H17.9996C18.3596 19.2 18.6 18.9596 18.6 18.6003V12C18.9593 12 19.1998 11.7603 19.1998 11.4003V8.99981C19.1998 8.63981 18.9593 8.40005 18.6 8.40005ZM17.9996 10.7998H12.5996V9.60028H17.9996V10.7998ZM13.7999 6.0003C14.4594 6.0003 15.0001 6.5403 15.0001 7.20054C15.0001 7.86008 14.4594 8.40007 13.7999 8.40007H12.5996V7.19984C12.5996 6.5403 13.1403 6.0003 13.7999 6.0003ZM8.99961 7.19983C8.99961 6.53959 9.53961 5.99959 10.1999 5.99959C10.8601 5.99959 11.4001 6.53959 11.4001 7.19983V8.40007H10.1999C9.53961 8.40007 8.99961 7.86007 8.99961 7.19983ZM6.00001 9.60031H11.4V10.7999H6.00001V9.60031ZM6.59981 12.0001H11.4001V17.9998H6.59981V12.0001ZM17.3999 17.9998H12.5996V12.0001H17.3999V17.9998Z"
            fill="var(--icon-color)"
            style="height: 100%"
          ></path>
        </svg>
        <div class="collected-product__caption">{{ $t("Promotion code") }}</div>
      </div>
    </template>
  </SfCollectedProduct>
</template>
<script>
import { getProductMainImageUrl, getProductUrl } from "@shopware-pwa/helpers"
import { useCart, getApplicationContext } from "@shopware-pwa/composables"
import { ref, watch, computed, onMounted } from "@vue/composition-api"
import { SfCollectedProduct, SfProperty, SfImage } from "@storefront-ui/vue"
import SwImage from "@/components/atoms/SwImage.vue"

export default {
  components: {
    SfCollectedProduct,
    SfProperty,
    SwImage,
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

    const stock = computed(() => product?.deliveryInformation?.stock)

    const isPromotion = computed(() => product?.type === "promotion")

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
      stock,
      isPromotion,
    }
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";

.collected-product {
  min-height: 12.5rem;
  --collected-product-actions-display: none;
  --collected-product-configuration-display: flex;
  ::v-deep .sf-price {
    margin-bottom: var(--spacer-base);
  }
  @include for-mobile {
    --property-name-font-size: var(--font-size--base);
    --property-value-font-size: var(--font-size--base);
  }

  &__caption {
    text-align: center;
  }

  &.promotion::v-deep {
    .sf-collected-product__quantity-wrapper {
      display: none;
    }
  }
}
</style>
