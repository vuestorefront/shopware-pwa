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
    <div class="product-details__action">
      <button v-if="sizes.length > 0" class="sf-action">Size guide</button>
    </div>
    <div v-if="hasChildren" class="product-details__section">
      <SwProductSelect
        :options="sizes"
        v-model="selectedSize" 
        label="Sizes" />
      <SwProductSelect
        #default="option"
        v-model="selectedColor"
        :options="colors"
        label="Colors"
      >
        <SfProductOption :label="option.label" :color="option.label" />
      </SwProductSelect>
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
        <button class="sf-action">Save for later</button>
      </div>
      <div class="product-details__action">
        <button class="sf-action">Add to compare</button>
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
  SfProperty,
  SfHeading,
  SfProductOption,
  SfAddToCart,
  SfReview,
  SfDivider
} from '@storefront-ui/vue'
import {
  getProductOptions,
  getProductProperties,
  getProductOption,
  getProductReviews,
  getProductRegularPrice,
  getProductSpecialPrice,
  isProductSimple,
  getProductOptionsUrl
} from '@shopware-pwa/helpers'
import { useProduct, useAddToCart } from '@shopware-pwa/composables'
import SwProductHeading from './SwProductHeading'
import SwProductSelect from './SwProductSelect'
import SwProductTabs from './SwProductTabs'

export default {
  name: 'SwProductDetails',
  components: {
    SfAlert,
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
      selectedColor: null,
      selectedSize: null
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
      return this.product && (this.product.name || this.product.translated && this.product.translated.name)
    },
    description() {
      return this.product && (this.product.description || this.product.translated && this.product.translated.description)
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
    color() {
      const color = getProductOption({
        product: this.product,
        attribute: 'color'
      })

      if (!color) {
        return null
      }

      return {
        label: color.name,
        code: color.id,
        value: color.id
      }
    },
    size() {
      const size = getProductOption({
        product: this.product,
        attribute: 'size'
      })

      if (!size) {
        return null
      }

      return {
        label: size.name,
        code: size.id,
        value: size.id
      }
    },
    colors() {
      return getProductOptions({
        product: this.product,
        attribute: 'color'
      })
    },
    sizes() {
      return getProductOptions({
        product: this.product,
        attribute: 'size'
      })
    },
    getAllProductOption(){
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
      return [this.selectedColor, this.selectedSize]
    }
  },

  watch: {
    selectedOptions(selected) {
      const url = getProductOptionsUrl({
        product: this.product,
        options: selected.filter(String)
      })
      this.$router.push(url)
    }
  },

  mounted() {
    this.selectedColor = this.color && this.color.code || null
    this.selectedSize =  this.size && this.size.code || null
  },

  methods: {
    toggleWishlist(index) {
      this.products[index].isOnWishlist = !this.products[index].isOnWishlist
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/shared/styles/variables';
@import '~@storefront-ui/shared/styles/helpers/visibility';
@import '~@storefront-ui/vue/src/utilities/transitions/transitions.scss';

@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}
@mixin for-iOS {
  @supports (-webkit-overflow-scrolling: touch) {
    @content;
  }
}

.product-details {
  &__action {
    display: flex;
    margin: $spacer-big 0 ($spacer-big / 2);
    @include for-desktop {
      justify-content: flex-end;
    }
  }
  &__add-to-cart {
    margin-top: 1.5rem;
    @include for-desktop {
      margin-top: $spacer-extra-big;
    }
  }
  &__alert {
    margin-top: 1.5rem;
  }
  &__attribute {
    margin-bottom: $spacer-big;
  }
  &__description {
    margin: $spacer-extra-big 0 ($spacer-big * 3) 0;
    font-family: $body-font-family-secondary;
    font-size: $font-size-regular-mobile;
    line-height: 1.6;
    @include for-desktop {
      font-size: $font-size-regular-desktop;
    }
  }
  &__divider {
    margin-top: 30px;
  }
  &__heading {
    margin-top: $spacer-big;
    ::v-deep .sf-heading__title {
      font-size: $font-size-big-mobile;
      font-weight: $body-font-weight-primary;
      @include for-desktop {
        font-size: $h1-font-size-desktop;
        font-weight: $body-font-weight-secondary;
      }
    }
    @include for-desktop {
      margin-top: 0;
    }
  }
  &__mobile-bar {
    display: none;
    padding: $spacer-medium 0;
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
    margin-top: $spacer-big;
  }
  &__sub {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  &__sub-price {
    flex-basis: 100%;
    margin-top: $spacer-big / 4;
    @include for-desktop {
      flex-basis: auto;
      margin-top: $spacer-big / 2;
    }
  }
  &__sub-rating {
    display: flex;
    margin-top: $spacer-big / 2;
    @include for-desktop {
      margin-left: auto;
    }
  }
  &__sub-reviews {
    margin-left: 10px;
    font-size: 0.75rem;
  }
  &__section {
    border-bottom: 1px solid #f1f2f3;
    padding-bottom: 10px;
    padding-top: 20px;
    @include for-desktop {
      border: 0;
      padding-bottom: 0;
    }
    @media (max-width: $desktop-min) {
      padding-left: $spacer-big;
      padding-right: $spacer-big;
    }
  }
  &__tabs {
    margin-top: $spacer-big;
    @include for-desktop {
      margin-top: 5 * $spacer-big;
    }
    p {
      margin: 0;
    }
  }
  &__review {
    padding-bottom: $spacer-big;
    @include for-desktop {
      padding-bottom: $spacer-extra-big;
      border-bottom: 1px solid $c-primary;
    }
    & + & {
      padding-top: $spacer-extra-big;
      border-top: 1px solid $c-primary;
      @include for-desktop {
        border-top: 0;
        padding-top: $spacer-extra-big;
      }
    }
  }
  &__product-property {
    padding: $spacer-small 0;
  }
}

.sf-action {
  padding: 0;
  border: 0;
  outline: none;
  background-color: transparent;
  color: $c-text;
  font-family: $body-font-family-secondary;
  font-size: $font-size-regular-mobile;
  font-weight: $body-font-weight-secondary;
  line-height: 1.6;
  text-decoration: underline;
  cursor: pointer;
  @include for-desktop {
    font-size: $font-size-regular-desktop;
  }
}
</style>
