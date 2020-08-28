<template>
  <div
    class="search-suggestions"
    v-if="isOpen && products"
    v-click-outside="close"
  >
    <div class="search-suggestions__results">
      <div class="search-suggestions__results-heading">
        <SfHeading :title="title" :level="5" class="sf-heading--left" />
      </div>
      <SfDivider />
      <div class="search-suggestions__results-products">
        <SfLink
          class="search-suggestions__product"
          v-for="product in products.slice(0, 5)"
          :key="product.id"
          :link="$i18n.path(getProductRouterLink(product))"
        >
          <SfImage
            :src="getProducImageUrl(product)"
            :alt="product.label"
            class="search-suggestions__product-image"
            width="90"
            height="90"
          />
          <span>
            <span class="search-suggestions__product-title">
              {{ product.name }}
            </span>
            <span class="search-suggestions__product-price">{{
              getProductPrice(product) | price
            }}</span>
          </span>
        </SfLink>
      </div>
    </div>
    <Button
      v-if="isShowMoreAvailable"
      class="sf-button--secondary sf-button--full-width"
      @click="$emit('search')"
      >See more</Button
    >
  </div>
</template>

<script>
import {
  SfDivider,
  SfHeading,
  SfLink,
  SfImage,
  SfIcon,
} from "@storefront-ui/vue"
import { clickOutside } from "@storefront-ui/vue/src/utilities/directives"
import Button from "@shopware-pwa/default-theme/components/atoms/SwButton"
import {
  getProductMainImageUrl,
  getProductRegularPrice,
  getProductUrl,
} from "@shopware-pwa/helpers"

export default {
  components: { SfDivider, SfHeading, SfLink, SfImage, SfIcon, Button },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    searchPhrase: {
      type: String,
      default: "",
    },
    products: {
      type: Array,
      default: () => [],
    },
    totalFound: {
      type: Number,
      default: 0,
    },
  },
  directives: { clickOutside },
  computed: {
    title() {
      return `${this.searchPhrase} (${this.totalFound} found)`
    },
    isShowMoreAvailable() {
      return this.totalFound > 5
    },
  },
  methods: {
    getProductRouterLink(product) {
      return this.$i18n.path(getProductUrl(product))
    },
    close() {
      this.$emit("close")
    },
    getProductPrice(product) {
      return getProductRegularPrice(product)
    },
    getProducImageUrl(product) {
      return getProductMainImageUrl(product)
    },
  },
}
</script>

<style lang="scss" scoped>
.search-suggestions {
  background-color: var(--c-white);
  border: 1px solid var(--c-gray);
  padding: 0.625rem;
  position: absolute;
  width: 18.75rem;
  &__results {
    padding: var(--spacer-xs) 0;
    &-heading {
      align-items: center;
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--space-xs);
      .search-suggestions__see-more {
        background: transparent;
        border: none;
        color: var(--c-info);
        font-size: var(--font-xs);
        padding: 0;
        text-decoration: underline;
      }
    }

    &-products {
      padding-top: var(--spacer-xs);
    }

    .sf-heading {
      letter-spacing: 0.06rem;
      margin: 0;
      margin-bottom: var(--spacer-xs);
      padding: 0;
      ::v-deep .sf-heading__title {
        --heading-title-font-size: var(--font-sm);
      }
    }
  }
  &__product {
    border-bottom: 1px solid var(--c-light);
    display: flex;
    font-family: var(--font-family-primary);
    margin-top: var(--spacer-xs);
    padding-bottom: var(--spacer-xs);
    text-decoration: none;
    &-image {
      min-width: 5.625rem;
      margin-right: var(--spacer-xs);
      width: 5.625rem;
      object-fit: cover;
    }
    &-title {
      display: block;
      font-size: var(--font-sm);
      padding-bottom: var(--spacer-xs);
      text-decoration: none;
    }
    &-price {
      color: var(--c-primary);
      font-size: var(--font-base);
    }
  }
}
</style>
