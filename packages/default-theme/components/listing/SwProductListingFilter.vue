<template>
  <div v-if="getComponent">
    <SfHeading class="filters__title" :level="4" :title="filter.name" />
    <component
      :is="getComponent"
      :filter="filter"
      :selected-values="selectedValues"
      @toggle-filter-value="toggleFilterValue"
      :key="filter.code"
    />
  </div>
</template>

<script>
import { SfFilter, SfHeading } from "@storefront-ui/vue"

const filterMap = {
  entity: () =>
    import(`@shopware-pwa/default-theme/components/listing/types/entity.vue`),
  range: () =>
    import(`@shopware-pwa/default-theme/components/listing/types/range.vue`),
}

export default {
  name: "SwProductListingFilter",
  components: {
    SfFilter,
    SfHeading,
  },
  props: {
    filter: {
      type: Object,
      default: () => ({}),
    },
    selectedEntityFilters: {
      type: Array | Object,
      default: () => [],
    },
    selectedFilters: {
      type: Array | Object,
      default: () => [],
    },
  },
  computed: {
    getComponent() {
      if (!this.filter.type || !filterMap[this.filter.type]) {
        return
      }

      try {
        return filterMap[this.filter.type]
      } catch (e) {
        console.error("SwProductListingFilter:getComponent", e)
      }
    },
    selectedValues() {
      // filters may come with the different format depending on whether useProductListing or useProductSearch is used
      return (
        (this.filter.type === "entity" && this.selectedEntityFilters) ||
        this.selectedFilters[this.filter.name] ||
        []
      )
    },
  },
  methods: {
    toggleFilterValue(value) {
      this.$emit("toggle-filter-value", value)
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.filters {
  &__title {
    text-align: left;
    &:first-child {
      margin: 0 0 var(--spacer-base) 0;
    }
  }
  &__item {
    padding: var(--spacer-2xs) 0;
    &--color {
      width: auto;
      margin: var(--spacer-xs) var(--spacer-xs) var(--spacer-xs) 0;
    }
  }
  &__buttons {
    margin: var(--spacer-base) 0 calc(var(--spacer-base) * 3) 0;
    @include for-desktop {
      margin: var(--spacer-xl) 0 0 0;
    }
  }
  &__button-clear {
    color: #a3a5ad;
    margin-top: 10px;
    background-color: var(--c-light);
  }
}
</style>
