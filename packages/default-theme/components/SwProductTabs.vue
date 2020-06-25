<template>
  <div class="sw-product-tabs">
    <SfTabs class="product-details__tabs" :open-tab="openTab">
      <slot>
        <SfTab title="Properties">
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
        <SfTab v-if="manufacturer" title="Manufacturer">
          <SfHeading
            :title="manufacturer.name"
            :level="3"
            class="sf-heading--no-underline sf-heading--left"
          />
          <p v-if="manufacturer.description">
            {{ manufacturer.description }}
          </p>
        </SfTab>
        <SwPluginSlot name="product-page-tab" />
      </slot>
    </SfTabs>
  </div>
</template>

<script>
import { SfTabs, SfHeading, SfReview, SfProperty } from "@storefront-ui/vue"
import SwPluginSlot from "sw-plugins/SwPluginSlot"

export default {
  name: "SwProductTabs",
  components: { SfTabs, SfHeading, SfReview, SfProperty, SwPluginSlot },
  props: {
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
      default: () => ({}),
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.product-details {
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
</style>
