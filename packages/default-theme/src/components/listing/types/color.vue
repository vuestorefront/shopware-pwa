<template>
  <div v-if="getOptions.length">
    <SfHeading
      class="filters__title"
      :level="4"
      :title="$t(filter.translated.name)"
    />
    <div class="filters__filter--color">
      <SfFilter
        v-for="option in getOptions"
        :key="option.id"
        :label="option.name"
        :count="option.count"
        :color="option.name"
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
  </div>
</template>
<script>
import { SfFilter, SfHeading } from "@storefront-ui/vue"

export default {
  components: {
    SfFilter,
    SfHeading,
  },
  name: "SwColorFilter",
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
      return this.filter.options || []
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
