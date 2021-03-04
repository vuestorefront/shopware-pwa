<template>
  <div class="filter__max sf-review_">
    <SfHeading class="filters__title" :level="4" :title="$t(filter.label)" />
    <div class="sf-review__rating">
      <SwRating
        :score="Number.parseInt(max)"
        :max="5"
        :hover-effect="true"
        @click="emitClick"
      />
    </div>
  </div>
</template>
<script>
import { computed, ref } from "@vue/composition-api"
import { SfRating, SfIcon, SfHeading } from "@storefront-ui/vue"
import SwRating from "@/components/atoms/SwRating.vue"

export default {
  components: {
    SfRating,
    SfIcon,
    SwRating,
    SfHeading,
  },
  props: {
    filter: {
      type: Object,
      default: () => ({}),
    },
    max: {
      type: Number | Boolean,
      default: () => ({}),
    },
  },
  methods: {
    emitClick(item) {
      this.$emit("toggle-select", {
        type: "max",
        max: item,
        field: this.filter.name,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
::v-deep.sf-heading {
  --heading-text-align: left;
}

.filter {
  &__range {
    display: flex;
    flex: 1 1;
  }
}

.rating {
  &__positive {
    --icon-color: var(--c-primary);
  }
  &__negative {
    --icon-color: var(--c-gray-variant);
  }
}
</style>
