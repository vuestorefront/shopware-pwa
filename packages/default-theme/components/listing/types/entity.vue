<template>
  <div
    v-if="filter.options && filter.options.length"
    :class="{
      'filters__filter--color': filter.name && filter.name === 'color',
    }"
  >
    <SfFilter
      v-for="option in filter.options"
      :key="option.value"
      :label="option.label"
      :count="option.count"
      :color="option.color ? option.color : null"
      :selected="
        selectedValues &&
        !!selectedValues.find((propertyId) => propertyId === option.value)
      "
      class="filters__item"
      :class="{ 'filters__item--color': option.color }"
      @change="
        $emit('toggle-filter-value', {
          type: 'equals',
          value: option.value,
          field: filter.name,
        })
      "
    />
  </div>
</template>
<script>
import { SfFilter } from "@storefront-ui/vue"

export default {
  components: {
    SfFilter,
  },
  props: {
    filter: {
      type: Object,
      default: () => ({}),
    },
    selectedValues: {
      type: Array | Object,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.filters {
  &__filter {
    &--color {
      display: flex;
      flex-wrap: wrap;
    }
  }

  .sf-filter {
    width: auto;
    margin: 5px;
  }
}
</style>
