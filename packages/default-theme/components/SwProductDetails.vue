<template>
  <div class="sw-product-details">
    <div class="product-details__mobile-top">
      <SwProductHeading
        class="product-details__heading"
        :name="name"
        :reviews="reviews"
        :rating-average="ratingAverage"
        :special="price > getSpecialPrice ? getSpecialPrice : price"
        :price="price > getSpecialPrice ? price : getSpecialPrice"
      />
    </div>
    <p class="product-details__description desktop-only">
      {{ description }}
    </p>
    <!-- <div class="product-details__action">
      <button v-if="sizes.length > 0" class="sf-action">Size guide</button>
    </div> -->
    <div v-if="hasChildren" class="product-details__section">

      <SwProductSelect
        v-for="(options, code) in getAllProductOptions"
        :key="code"
        v-model="selected[code]"
        :options="options"
        :change-handler="handleChange"
        :label="code"
      />
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
      <div class="product-details__action">
        <SfButton class="sf-action sf-button--text">Save for later</SfButton>
      </div>
      <div class="product-details__action">
        <SfButton class="sf-action sf-button--text">Add to compare</SfButton>
      </div>
    </div>
    <SwProductTabs>
      <SfTab title="Description">
        <div>
          <p>
            {{ description }}
          </p>
        </div>
      </SfTab>
      <SfTab title="Properties">
        <div class="product-details__properties">
          <SfProperty
            v-for="(property, i) in properties"
            :key="i"
            :name="property.name"
            :value="property.value"
            class="product-details__product-property"
          />
        </div>
      </SfTab>
      <SfTab v-if="reviews.length" title="Read reviews">
        <SfReview
          v-for="review in reviews"
          :key="review.id"
          class="product-details__review"
          :author="review.author"
          :date="review.date"
          :message="review.message"
          :rating="review.rating"
          :max-rating="5"
        />
      </SfTab>
      <SfTab v-if="product.manufacturer" title="Manufacturer">
        <SfHeading
          :title="product.manufacturer.name"
          :level="3"
          class="sf-heading--no-underline sf-heading--left"
        />
        <p v-if="product.manufacturer.description">
          {{ product.manufacturer.description }}
        </p>
      </SfTab>
    </SwProductTabs>
  </div>
</template>

<script>
import {
  SfAlert,
  SfButton,
  SfProperty,
  SfHeading,
  SfProductOption,
  SfAddToCart,
  SfReview,
  SfDivider
} from '@storefront-ui/vue'
import {
  getProductProperties,
  getProductOption,
  getProductReviews,
  getProductRegularPrice,
  getProductSpecialPrice,
  isProductSimple,
  getProductOptionsUrl,
  getProductOptions
} from '@shopware-pwa/helpers'
import { useProduct, useAddToCart } from '@shopware-pwa/composables'
import SwProductHeading from './SwProductHeading'
import SwProductSelect from './SwProductSelect'
import SwProductTabs from './SwProductTabs'

export default {
  name: 'SwProductDetails',
  components: {
    SfAlert,
    SfButton,
    SfProperty,
    SfHeading,
    SfProductOption,
    SfAddToCart,
    SfReview,
    SwProductHeading,
    SwProductSelect,
    SwProductTabs,
    SfDivider
  },
  props: {
    product: {
      type: Object,
      default: () => ({})
    },
    page: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      selected: {}
    }
  },
  setup({ page }) {
    const { addToCart, quantity } = useAddToCart(page && page.product)

    return {
      quantity,
      addToCart
    }
  },
  computed: {
    price() {
      return getProductRegularPrice({ product: this.product })
    },
    getSpecialPrice() {
      const price = getProductSpecialPrice(this.product)
      return price && '$' + price
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
    getAllProductOptions() {
      const options = getProductOptions({
        product: this.product
      })

      return options
    },
    getAllProductOption() {
      return getProductOptions({
        product: this.product
      })
    },
    reviews() {
      return getProductReviews({ product: this.product })
    },
    stock() {
      return this.product && this.product.stock
    },
    selectedOptions() {
      return this.selected
    }
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
        options
      })

      this.$router.push(url)
    }
  },

  mounted() {
    this.product.options.forEach(option => {
      this.selected = Object.assign({}, this.selected, {
        [option.group.name]: option.id
      })
    })
  },

  methods: {
    toggleWishlist(index) {
      this.products[index].isOnWishlist = !this.products[index].isOnWishlist
    },
    handleChange(attribute, option) {
      this.selected = Object.assign({}, this.selected, { [attribute]: option })
    }
  }
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
    margin: var(--spacer-big) 0 calc(var(--spacer-big) / 2);
    @include for-desktop {
      justify-content: flex-end;
    }
  }
  &__add-to-cart {
    margin-top: 1.5rem;
    @include for-desktop {
      margin-top: var(--spacer-extra-big);
    }
  }
  &__alert {
    margin-top: 1.5rem;
  }
  &__attribute {
    margin-bottom: var(--spacer-big);
  }
  &__description {
    margin: var(--spacer-extra-big) 0 calc(var(--spacer-big) * 3) 0;
    font-family: var(--body-font-family-secondary);
    font-size: var(--font-size-regular-mobile);
    line-height: 1.6;
  }
  &__divider {
    margin-top: 30px;
  }
  &__heading {
    --heading-title-font-weight: var(--body-font-weight-primary);
    margin: var(--spacer-big) 0 0 0;
    @include for-desktop {
      --heading-title-font-weight: var(--body-font-weight-secondary);
      margin: 0;
    }
  }
  &__mobile-bar {
    display: none;
    padding: var(--spacer-medium) 0;
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
  &__properties {
    margin-top: var(--spacer-big);
  }
  &__section {
    border-bottom: 1px solid #f1f2f3;
    padding-bottom: 10px;
    padding-top: 20px;
    @include for-desktop {
      border: 0;
      padding-bottom: 0;
    }
  }
  &__tabs {
    margin-top: var(--spacer-big);
    @include for-desktop {
      margin-top: calc(5 * var(--spacer-big));
    }
    p {
      margin: 0;
    }
  }
  &__review {
    padding-bottom: var(--spacer-big);
    @include for-desktop {
      padding-bottom: var(--spacer-extra-big);
      border-bottom: 1px solid var(--c-primary);
    }
    & + & {
      padding-top: var(--spacer-extra-big);
      border-top: 1px solid var(--c-primary);
      @include for-desktop {
        border-top: 0;
        padding-top: var(--spacer-extra-big);
      }
    }
  }
  &__product-property {
    padding: var(--spacer-small) 0;
  }
}

.sf-action {
  --button-font-size: var(--font-size-small);
  padding: 0;
  border: 0;
  outline: none;
  background-color: transparent;
  color: var(--c-text);
  font-family: var(--body-font-family-secondary);
  font-size: var(--font-size-regular-mobile);
  font-weight: var(--body-font-weight-secondary);
  line-height: 1.6;
  text-decoration: underline;
  cursor: pointer;
  @include for-desktop {
    --button-font-size: var(--font-size-regular-desktop);
  }
}
</style>
