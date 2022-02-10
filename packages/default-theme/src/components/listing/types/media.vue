<template>
  <div v-if="getOptions.length">
    <SfHeading
      class="filters__title"
      :level="4"
      :title="$t(getTranslatedProperty(filter, 'name'))"
    />
    <div class="filters__filter--color">
      <SfFilter
        v-for="option in getOptions"
        :key="option.id"
        :label="``"
        :count="option.count"
        :selected="selectedValues && selectedValues.includes(option.id)"
        class="filters__item media"
        @change="
          $emit('toggle-filter-value', {
            ...filter,
            value: option.id,
          })
        "
      >
        <template #label>
          <SwImage
            :alt="getTranslatedProperty(option, 'name')"
            width="50px"
            height="50px"
            :src="getProductThumbnailUrl({ cover: option })"
          />
        </template>
      </SfFilter>
    </div>
  </div>
</template>
<script>
import { SfFilter, SfHeading } from "@storefront-ui/vue"
import {
  getTranslatedProperty,
  getProductThumbnailUrl,
} from "@shopware-pwa/helpers"
import SwImage from "@/components/atoms/SwImage.vue"

export default {
  components: {
    SfFilter,
    SfHeading,
    SwImage,
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
  setup() {
    return {
      getTranslatedProperty,
      getProductThumbnailUrl,
    }
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

    ::v-deep.sf-checkbox__checkmark {
      display: none;
    }

    &.is-active {
      ::v-deep img {
        outline: 1px var(--c-primary) solid;
      }
    }
  }
}
</style>
