<template>
  <div
    v-if="getOptions.length"
    :class="{
      'filters__filter--color': filter.name === 'color',
    }"
  >
    <SfHeading class="filters__title" :level="4" :title="$t(filter.label)" />
    <SfCheckbox
      v-for="option in getOptions"
      :key="option.id"
      class="sf-filter"
      :class="{
        'is-active': selectedValues && selectedValues.includes(option.id),
        'is-color': false,
      }"
      :name="option.translated.name"
      :selected="selectedValues && selectedValues.includes(option.id)"
      @change="
        $emit('toggle-filter-value', {
          ...filter,
          value: option.id,
        })
      "
    >
      <template #label>
        <div class="sf-filter__label">{{ option.translated.name }}</div>
      </template>
    </SfCheckbox>
  </div>
</template>
<script>
import { SfHeading, SfCheckbox } from "@storefront-ui/vue"

export default {
  components: {
    SfHeading,
    SfCheckbox,
  },
  name: "SwEntityFilter",
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

  &__label {
    margin-left: 0.8rem;
  }

  .sf-filter {
    width: auto;
    margin: 5px;
  }
}
</style>
