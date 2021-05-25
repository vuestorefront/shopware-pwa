<template>
  <div class="sw-product-tabs">
    <SfTabs class="product-details__tabs" :open-tab="openTab">
      <slot>
        <SfTab v-if="properties && properties.length" :title="$t('Properties')">
          <div class="product-details__properties">
            <SfProperty
              v-for="property in properties"
              :key="property.id"
              :name="property.name"
              :value="property.value"
              class="product-details__product-property"
            />
          </div>
        </SfTab>

        <SfTab v-if="manufacturer" :title="$t('Manufacturer')">
          <SfHeading
            :title="manufacturer.translated.name"
            :level="3"
            class="sf-heading--no-underline sf-heading--left"
          />
          <p v-if="manufacturer.translated.description">
            {{ manufacturer.translated.description }}
          </p>
        </SfTab>
        <SfTab :title="$t('Read reviews')">
          <div v-if="reviews.length" class="reviews-list">
            <SfReview
              v-for="review in reviews"
              :key="review.id"
              class="product-details__review"
              :author="dateFormat(review.date)"
              :message="review.message"
              :rating="review.rating"
              :max-rating="5"
            />
          </div>
          <div v-else>
            <SfHeading
              :title="$t('No comments yet')"
              :level="4"
              class="sw-reviews-empty"
            />
            <SfDivider />
          </div>
          <SwAddProductReview :product-id="productId" class="add-review" />
        </SfTab>
        <SwPluginSlot name="product-page-tab" />
      </slot>
    </SfTabs>
  </div>
</template>

<script>
import {
  SfTabs,
  SfHeading,
  SfReview,
  SfProperty,
  SfDivider,
} from "@storefront-ui/vue"
import { formatDate } from "@/helpers"
import SwPluginSlot from "sw-plugins/SwPluginSlot.vue"
import SwAddProductReview from "@/components/forms/SwAddProductReview.vue"
export default {
  name: "SwProductTabs",
  components: {
    SfTabs,
    SfHeading,
    SfReview,
    SfProperty,
    SwPluginSlot,
    SwAddProductReview,
    SfDivider,
  },
  props: {
    productId: {
      type: String,
      required: true,
    },
    openTab: {
      type: Number,
      default: 1,
    },
    properties: {
      type: Array,
      default: () => [],
    },
    reviews: {
      type: Array,
      default: () => [],
    },
    manufacturer: {
      type: Object,
      default: null,
    },
  },
  methods: {
    dateFormat(date) {
      return formatDate(date)
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.sw-product-tabs {
  word-break: break-all;
}

.product-details {
  &__properties {
    .sf-property {
      margin-top: var(--spacer-xs);
    }
  }

  &__review {
    word-break: break-all;
  }

  &__tabs {
    p {
      margin: 0;
    }
    @include for-desktop {
      margin-top: var(--spacer-xl);
      --tabs-content-tab-padding: 3.5rem 0 0 0;
    }
    @include for-mobile {
      position: relative;
      left: 50%;
      right: 50%;
      margin-left: -50vw;
      margin-right: -50vw;
      width: 100vw;
    }
  }
}

.add-review {
  margin-top: var(--spacer-base);
}

.reviews-list {
  margin-bottom: var(--spacer-xl);
  max-height: 330px;
  overflow-y: auto;
}

.sw-reviews-empty {
  text-align: center;
  margin-bottom: var(--spacer-xl);
}
</style>
