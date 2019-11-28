<template>
  <SfCollectedProduct
    image="/img/productB.png"
    :title="product.label"
    :regular-price="product.price.unitPrice | price"
    :stock="product.deliveryInformation.stock"
    v-model="product.quantity"
    @click:remove="removeProduct(product)"
    class="collected-product"
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
import {
  SfSidebar,
  SfButton,
  SfProperty,
  SfPrice,
  SfCollectedProduct
} from "@storefront-ui/vue";
import { useCart } from "@shopware-pwa/composables";

export default {
  components: {
    SfSidebar,
    SfButton,
    SfProperty,
    SfPrice,
    SfCollectedProduct
  },
  props: {
    product: {
      type: Object,
      defult: () => ({})
    }
  },
  setup () {
    const { removeProduct } = useCart()
    return {
      removeProduct
    }
  },
  filters: {
    price: function(price) {
      if (!price) return;
      return `$${price}`;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
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
