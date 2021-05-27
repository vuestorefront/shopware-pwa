<template>
  <SfTableRow :key="product.id" class="table__row">
    <SfTableData class="table__image">
      <SwImage
        :src="getImageUrl(product)"
        :alt="product.label"
        data-cy="product-image"
        v-if="product.cover && product.type === 'product' && !isPromotion"
      />
      <div v-if="isPromotion" class="table__image--caption">
        {{ $t("Promotion code") }}
      </div>
    </SfTableData>
    <SfTableData class="table__description">
      <div class="product-title">{{ product.label }}</div>
      <div class="product-sku">{{ product.productNumber }}</div>
    </SfTableData>
    <SfTableData class="table__data table__quantity" data-cy="table-quantity">
      <SfQuantitySelector
        v-if="product.type === 'product'"
        v-model="quantity"
        class="sf-quantity-selector--secondary"
        data-cy="quantity"
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
import { useCart } from "@shopware-pwa/composables"
import { ref, watch, computed, toRefs } from "@vue/composition-api"
import {
  SfTable,
  SfIcon,
  SfPrice,
  SfQuantitySelector,
} from "@storefront-ui/vue"
import SwImage from "@/components/atoms/SwImage.vue"
import getResizedImage from "@/helpers/images/getResizedImage.js"

export default {
  name: "OrderItem",
  components: {
    SfTable,
    SwImage,
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
  setup(props, { root }) {
    const { product } = toRefs(props)
    const { removeProduct, changeProductQuantity } = useCart(root)

    const quantity = ref(product.value.quantity)
    const isPromotion = computed(() => product?.type === "promotion")

    watch(quantity, async (qty) => {
      if (qty === product.value.quantity) return
      await changeProductQuantity({ id: product.value.id, quantity: qty })
    })

    function getImageUrl(product) {
      return getResizedImage(product?.cover?.url, { width: 140, height: 200 })
    }

    return {
      removeProduct,
      quantity,
      getImageUrl,
      isPromotion,
    }
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";

.sf-image {
  max-width: 80%;
}

.table {
  &__description {
    text-align: left;
  }
  &__data {
    text-align: center;
    &:last-of-type {
      text-align: right;
    }
  }
  &__quantity {
    display: flex;
    justify-content: flex-end;
    padding-left: 20px;
    --quantity-selector-height: 2rem;
    font-size: var(--font-size--lg);
    & > * {
      --quantity-selector-width: 6rem;
      --quantity-selector-border-width: 0;
    }
  }
  &__amount {
    text-align: right;
  }

  &__image {
    max-width: 100px;
    &--caption {
      font-size: 0.75em;
    }
  }
}
::v-deep .product-price {
  & > * {
    flex: 1;
  }
}
</style>
