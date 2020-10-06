<template>
  <div
    v-if="getOptions.length"
    :class="{
      'filters__filter--color': filter.name === 'color',
    }"
  >
    <SfHeading class="filters__title" :level="4" :title="filter.label" />
    <SfFilter
      v-for="option in getOptions"
      :key="option.id"
      :label="option.translated.name"
      :color="filter.code === 'color' ? option.name : null"
      :selected="selectedValues && selectedValues.includes(option.id)"
      class="filters__item"
      :class="{ 'filters__item--color': option.color }"
      @change="
        $emit('toggle-filter-value', {
          ...filter,
          value: option.id,
        })
      "
    />
  </div>
</template>
<script>
import { SfFilter, SfHeading } from "@storefront-ui/vue"

export default {
  components: {
    SfFilter,
    SfHeading,
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
  computed: {
    getOptions() {
      return this.filter.entities || this.filter.options || []
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

::v-deep.sf-heading {
  --heading-text-align: left;
}

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
