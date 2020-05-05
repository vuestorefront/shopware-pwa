<template>
  <div class="sw-product-details">
    <div class="product-details__mobile-top">
      <SwProductHeading
        class="product-details__heading"
        :name="name"
        :reviews="reviews"
        :rating-average="ratingAverage"
        :special="getSpecialPrice | price"
        :price="getPrice | price"
      />
    </div>
    <p class="product-details__description desktop-only">
      {{ description }}
    </p>
    <!-- <div class="product-details__action">
      <button v-if="sizes.length > 0" class="sf-action">Size guide</button>
    </div> -->
    <div v-if="hasChildren" class="product-details__section">
      <div v-for="productType in getAllProductOptionsTypes" :key="productType">
        <SwProductColors
          v-if="productType === 'color'"
          :colors="getAllProductOptions[productType]"
          :value="selected[productType]"
          @input="handleChange(productType, $event)"
          label="Color:"
        />
        <SwProductSelect
          v-else
          :value="selected[productType]"
          :options="getAllProductOptions[productType]"
          @change="handleChange(productType, $event)"
          :label="productType"
        />
      </div>
    </div>
    <div class="product-details__section">
      <SfAlert
        message="Low in stock"
        type="warning"
        class="product-details__alert mobile-only"
      />
      <SfAddToCart
        v-model="quantity"
        :stock="stock"
        class="product-details__add-to-cart"
        @click="addToCart"
      />
      <div class="product-details__action desktop-only">
        <SfButton class="sf-button--text product-details__action-button">Save for later</SfButton>
        <SfButton class="sf-button--text product-details__action-button">Add to compare</SfButton>
      </div>
    </div>
    <SwProductTabs
      :description="description"
      :properties="properties"
      :reviews="reviews"
      :manufacturer="product.manufacturer"
    />
  </div>
</template>
<script>
import {
  SfAlert,
  SfButton,
  SfProductOption,
  SfAddToCart,
} from '@storefront-ui/vue'
import {
  getProductProperties,
  getProductOption,
  getProductReviews,
  getProductRegularPrice,
  getProductSpecialPrice,
  isProductSimple,
  getProductOptionsUrl,
  getProductOptions,
} from '@shopware-pwa/helpers'
import { useProduct, useAddToCart } from '@shopware-pwa/composables'
import SwProductHeading from '@shopware-pwa/default-theme/components/SwProductHeading'
import SwProductSelect from '@shopware-pwa/default-theme/components/SwProductSelect'
import SwProductColors from '@shopware-pwa/default-theme/components/SwProductColors'

import SwProductTabs from '@shopware-pwa/default-theme/components/SwProductTabs'
export default {
  name: 'SwProductDetails',
  components: {
    SfAlert,
    SfButton,
    SfProductOption,
    SfAddToCart,
    SwProductHeading,
    SwProductSelect,
    SwProductTabs,
    SwProductColors,
  },
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
    page: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      selected: {},
    }
  },
  setup({ page }) {
    const { addToCart, quantity } = useAddToCart(page && page.product)

    return {
      quantity,
      addToCart,
    }
  },
  computed: {
    getPrice() {
      // remove that logic once the SW6 API returns right data
      // related: https://github.com/DivanteLtd/shopware-pwa/issues/263
      const regularPrice = getProductRegularPrice({ product: this.product })
      const specialPrice = getProductSpecialPrice(this.product)
      return regularPrice > specialPrice ? regularPrice : specialPrice
    },
    getSpecialPrice() {
      // remove that logic once the SW6 API returns right data
      // related: https://github.com/DivanteLtd/shopware-pwa/issues/263
      const regularPrice = getProductRegularPrice({ product: this.product })
      const specialPrice = getProductSpecialPrice(this.product)
      return regularPrice > specialPrice ? specialPrice : regularPrice
    },
    name() {
      return (
        this.product &&
        (this.product.name ||
          (this.product.translated && this.product.translated.name))
      )
    },
    description() {
      return (
        this.product &&
        (this.product.description ||
          (this.product.translated && this.product.translated.description))
      )
    },
    ratingAverage() {
      return this.product && this.product.ratingAverage
    },
    hasChildren() {
      return (
        this.product && this.product.children && this.product.children.length
      )
    },
    properties() {
      return getProductProperties({ product: this.product })
    },
    // TODO: move to helpers
    getAllProductOptions() {
      const options = getProductOptions({
        product: this.product,
      })
      return options
    },
    getAllProductOptionsTypes() {
      return this.getAllProductOptions && Object.keys(this.getAllProductOptions)
    },
    reviews() {
      return getProductReviews({ product: this.product })
    },
    stock() {
      return this.product && this.product.stock
    },
    selectedOptions() {
      return this.selected
    },
  },
  watch: {
    selectedOptions(selected, selectedOld) {
      if (
        Object.keys(this.getAllProductOptions).length !==
        Object.keys(selected).length
      ) {
        return
      }

      const options = []
      for (const attribute of Object.keys(selected)) {
        options.push(selected[attribute])
      }
      const url = getProductOptionsUrl({
        product: this.product,
        options,
      })

      this.$router.push(url)
    },
  },

  mounted() {
    this.product.options.forEach((option) => {
      this.selected = Object.assign({}, this.selected, {
        [option.group.name]: option.id,
      })
    })
  },

  methods: {
    toggleWishlist(index) {
      this.products[index].isOnWishlist = !this.products[index].isOnWishlist
    },
    handleChange(attribute, option) {
      this.selected = Object.assign({}, this.selected, { [attribute]: option })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';

@mixin for-iOS {
  @supports (-webkit-overflow-scrolling: touch) {
    @content;
  }
}

.product-details {
  &__action {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: var(--spacer-base) 0 calc(var(--spacer-base) / 2);
  }
  &__action-button {
    padding: var(--spacer-xs) 0;
  }
  &__add-to-cart {
    margin: 1.5rem 0;
    @include for-desktop {
      margin: var(--spacer-xl) 0;
    }
  }
  &__alert {
    margin-top: 1.5rem;
  }
  &__attribute {
    margin-bottom: var(--spacer-base);
  }
  &__description {
    margin: var(--spacer-xl) 0 calc(var(--spacer-base) * 3) 0;
    font-family: var(--font-family-secondary);
    font-size: var(--font-sm);
  }
  &__heading {
    margin: var(--spacer-base) 0 0 0;
    @include for-desktop {
      margin: var(--spacer-lg) 0 0 0;
    }
  }
  &__mobile-bar {
    display: none;
    padding: var(--spacer-sm) 0;
    box-sizing: border-box;
    .product--is-active & {
      display: block;
      @include for-desktop {
        display: none;
      }
    }
    @include for-desktop {
      display: none;
    }
  }
  &__mobile-top {
    display: flex;
    align-items: center;
    @include for-desktop {
      display: block;
    }
  }
  &__section {
    padding-bottom: 10px;
    padding-top: 20px;
    @include for-desktop {
      padding-bottom: 0;
    }
  }
  &__review {
    padding-bottom: var(--spacer-base);
    border-bottom: var(--c-light) solid 1px;
    margin-bottom: var(--spacer-base);
    &:last-of-type {
      border: none;
      padding-bottom: 0;
      margin-bottom: 0;
    }
    @include for-desktop {
      padding-bottom: var(--spacer-xl);
    }
  }
  &__product-property {
    padding: var(--spacer-2xs) 0;
  }
}
</style>
