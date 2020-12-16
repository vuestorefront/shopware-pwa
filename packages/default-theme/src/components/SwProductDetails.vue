<template>
  <div class="sw-product-details">
    <div class="product-details__mobile-top">
      <SwProductHeading class="product-details__heading" :product="product" />
    </div>

    <SwPluginSlot name="product-page-description" :slot-context="product">
      <p class="product-details__description" v-html="description" />
    </SwPluginSlot>
    <div class="product-details__section">
      <div v-for="config in getAllProductOptionsTypes" :key="config.id">
        <SwProductSelect
          v-if="selected[config.translated.name]"
          :value="selected[config.translated.name]"
          :options="
            config.options.map((option) => ({
              label: option.translated.name || option.name,
              code: option.id,
              value: option.translated.name || option.name,
              color: option.colorHexCode,
            }))
          "
          :label="config.translated.name"
          @change="handleChange(config.translated.name, $event)"
        />
      </div>
    </div>

    <div class="product-details__section">
      <SfAlert
        :message="$t('Low in stock')"
        type="warning"
        class="product-details__alert mobile-only"
      />
      <SfAddToCart
        v-model="quantity"
        :stock="stock"
        class="product-details__add-to-cart"
        @click="addToCart"
      >
        <template #add-to-cart-btn>
          <SwButton class="sf-button--full-width" @click="addToCart">
            {{ $t("Add To Cart") }}
          </SwButton>
        </template>
      </SfAddToCart>
      <SwPluginSlot
        name="product-page-add-to-cart-button-after"
        :slot-context="product"
      />
      <div
        v-if="getProductNumber(product)"
        class="product-details__product-number"
      >
        <p>
          Product number: <span>{{ getProductNumber(product) }}</span>
        </p>
      </div>
    </div>
    <SwProductTabs
      :product-id="product.id"
      :properties="properties"
      :reviews="reviews"
      :manufacturer="manufacturer"
    />
  </div>
</template>
<script>
import { SfAlert, SfAddToCart } from "@storefront-ui/vue"
import {
  getProductUrl,
  getProductNumber,
  getProductOptions,
  getProductOptionsUrl,
  getProductProperties,
  getProductReviews,
} from "@shopware-pwa/helpers"
import { useAddToCart, getApplicationContext } from "@shopware-pwa/composables"
import { invokePost, getProductEndpoint } from "@shopware-pwa/shopware-6-client"

import SwProductHeading from "@/components/SwProductHeading"
import SwProductSelect from "@/components/SwProductSelect"
import SwProductColors from "@/components/SwProductColors"
import SwPluginSlot from "sw-plugins/SwPluginSlot"

import SwProductTabs from "@/components/SwProductTabs"
import { computed, onMounted, ref } from "@vue/composition-api"
export default {
  name: "SwProductDetails",

  components: {
    SfAlert,
    SfAddToCart,
    SwProductHeading,
    SwProductSelect,
    SwProductTabs,
    SwProductColors,
    SwPluginSlot,
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
    return {}
  },
  setup({ page, product }, { root }) {
    const { addToCart, quantity } = useAddToCart(root, page && page.product)
    const description = computed(
      () =>
        (product.translated && product.translated.description) ||
        product.description
    )
    const selected = ref({})
    const properties = computed(() => getProductProperties({ product }))
    const manufacturer = computed(() => product.manufacturer)
    const stock = computed(() => product.stock)
    const reviews = computed(() => getProductReviews({ product }))
    const parentProductId = computed(() => product.parentId)
    const getAllProductOptionsTypes = computed(() => page.configurator || [])
    const getAllProductOptions = computed(() =>
      product.options.map((option) => ({
        label: option.translated.name || option.name,
        code: option.id,
        value: option.translated.name || option.name,
        color: option.colorHexCode,
      }))
    )

    onMounted(() => {
      product.options?.forEach((option) => {
        selected.value[option?.group?.translated?.name] = option.id
      })
    })
    const handleChange = async (attribute, option) => {
      selected.value = Object.assign({}, selected.value, {
        [attribute]: option,
      })
      // look for variant with the selected options
      const variantFound = await findVariantForSelectedOptions()
      if (variantFound) {
        return root.$router.push(getProductUrl(variantFound))
      } else {
        // if no product was found - reset other options and try to find a first matching product
        const simpleOptionVariant = await findVariantForSelectedOptions({
          option: option,
        })
        if (simpleOptionVariant) {
          return root.$router.push(getProductUrl(simpleOptionVariant))
        }
      }
    }
    const findVariantForSelectedOptions = async (options) => {
      const { apiInstance } = getApplicationContext(root, "SwProductDetails")
      const filter = [
        {
          type: "equals",
          field: "parentId",
          value: parentProductId.value,
        },
        ...Object.values(options || selected.value).map((id) => ({
          type: "equals",
          field: "optionIds",
          value: id,
        })),
      ]
      try {
        apiInstance.defaults.headers["sw-include-seo-urls"] = true
        const response = await invokePost(
          {
            address: getProductEndpoint(),
            payload: {
              limit: 10,
              filter,
              includes: {
                product: ["id", "translated", "productNumber", "seoUrls"],
                seo_url: ["seoPathInfo"],
              },
              associations: {
                seoUrls: {},
              },
            },
          },
          apiInstance
        )
        return response.data.data[0]
      } catch (e) {
        console.error("SwProductDetails:findVariantForSelectedOptions", e)
      }
    }

    return {
      stock,
      reviews,
      manufacturer,
      properties,
      description,
      quantity,
      addToCart,
      getProductNumber,
      getAllProductOptions,
      getAllProductOptionsTypes,
      selected,
      handleChange,
    }
  },
  methods: {
    toggleWishlist(index) {
      this.products[index].isOnWishlist = !this.products[index].isOnWishlist
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

@mixin for-iOS {
  @supports (-webkit-overflow-scrolling: touch) {
    @content;
  }
}
.product-details-wrapper {
  @include for-desktop {
    height: 0;
    transition: height 0.66s ease-out;
  }

  &__loaded {
    @include for-desktop {
      height: auto;
    }
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
    margin: var(--spacer-xl) 0;
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
  &__product-number {
    p {
      font-size: var(--font-sm);
      font-weight: bold;

      span {
        font-weight: var(--font-light);
      }
    }
  }
  &__section {
    padding-bottom: 10px;
    padding-top: 20px;
    @include for-desktop {
      padding-bottom: 0;
    }
    // &-attributes {
    //   height: 50px;
    // }
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
