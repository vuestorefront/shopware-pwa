<template>
  <div v-if="getComponent">
    <SfHeading class="filters__title" :level="4" :title="filter.label" />
    <component
      :is="getComponent"
      :filter="filter"
      :selected-values="selectedValues"
      @toggle-filter-value="toggleFilterValue"
      :selected="selected"
      :key="filter.code"
    />
  </div>
</template>

<script>
import { SfFilter, SfHeading } from "@storefront-ui/vue"
import NoFilterFound from "@/components/listing/NoFilterFound"

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
      try {
        return () => ({
          component: import("@/components/listing/types/" + this.filter.code),
          error: NoFilterFound,
        })
      } catch (e) {
        console.error("SwProductListingFilter:getComponent", e)
      }
    },
    selectedValues() {
      return this.selectedFilters || []
    },
    selected() {
      return this.selectedFilters[this.filter.code]
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
