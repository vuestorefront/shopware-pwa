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
    <template #configuration>
      <div class="collected-product__properties">
        <SfProperty
          v-for="(property, key) in product.configuration"
          :key="key"
          :name="property.name"
          :value="property.value"
        />
      </div>
    </template>
    <template #actions>
      <div class="collected-product__actions">
        <SfButton class="sf-button--text product__action">
          Save for later
        </SfButton>
        <SfButton class="sf-button--text product__action">
          Add to compare
        </SfButton>
      </div>
    </template>
  </SfCollectedProduct>
</template>
<script>
import { SfButton, SfProperty, SfCollectedProduct } from '@storefront-ui/vue'
import { getProductMainImageUrl } from '@shopware-pwa/helpers'
import { useCart } from '@shopware-pwa/composables'
import { ref, watch, computed } from '@vue/composition-api'

export default {
  components: {
    SfButton,
    SfProperty,
    SfCollectedProduct
  },
  filters: {
    price(price) {
      if (!price) return
      return `$${price}`
    }
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
    const productImage = computed(() =>
      getProductMainImageUrl({ product: props.product })
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
      quantity
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';
@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}
.collected-product {
  margin: $spacer-big 0;
  &__properties {
    margin-top: $spacer-big;
  }
  &__actions {
    opacity: 0;
    transition: opacity 300ms ease-in-out;
    @at-root.collected-product:hover & {
      @include for-desktop {
        opacity: 1;
      }
    }
  }
}
</style>
