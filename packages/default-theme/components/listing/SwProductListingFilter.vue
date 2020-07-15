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
