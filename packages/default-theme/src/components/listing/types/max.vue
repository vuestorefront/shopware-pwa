<template>
  <div class="filter__max">
    <component
      :is="getComponent"
      :filter="filter"
      :max="max"
      :key="filter.code"
      @toggle-select="selectMax"
    />
  </div>
</template>
<script>
import { computed, ref } from "@vue/composition-api"

const maxMap = {
  "shipping-free": () => import(`@/components/listing/types/shipping-free.vue`),
  rating: () => import(`@/components/listing/types/rating.vue`),
}

export default {
  props: {
    filter: {
      type: Object,
      default: () => ({}),
    },
    selected: {
      type: Object,
      default: () => ({}),
    },
    selectedValues: {
      type: Array | Object,
      default: () => [],
    },
  },
  computed: {
    getComponent() {
      if (!this.filter.name || !maxMap[this.filter.name]) {
        return
      }

      try {
        return maxMap[this.filter.name]
      } catch (e) {
        console.error("SwProductListingFilter:getComponent", e)
      }
    },
    max() {
      return this.selected.max
    },
  },
  methods: {
    selectMax(value) {
      this.$emit("toggle-filter-value", value)
    },
  },
}
</script>
<style lang="scss" scoped>
.filter {
  &__max {
    display: flex;
    flex: 1 1;
  }
}
</style>
