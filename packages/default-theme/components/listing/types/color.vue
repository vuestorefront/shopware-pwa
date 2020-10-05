<template>
  <div class="filters__filter--color">
    <SfFilter
      v-for="option in filter.entities"
      :key="option.id"
      :label="option.name"
      :count="option.count"
      :color="option.name"
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
