<template>
  <div
    class="sw-rating"
    :class="{ 'sw-rating-hover-off': !hoverEffect }"
    @mouseleave="isHoverActive = false"
  >
    <SfIcon
      class="sw-rating__star"
      v-for="i in max"
      :key="i"
      icon="star"
      :size="size"
      :color="i <= displayedScore ? 'green-primary' : 'grey-primary'"
      @click="$emit('click', i)"
      @mouseover="hoverRating(i)"
    />
  </div>
</template>

<script>
import { SfIcon } from "@storefront-ui/vue"

export default {
  name: "SwLink",

  components: {
    SfIcon,
  },
  data() {
    return {
      hoveredIndex: 0,
      isHoverActive: false,
    }
  },

  props: {
    max: {
      required: true,
      type: Number,
    },
    size: {
      required: false,
      type: String,
      default: "xs",
    },
    score: {
      required: true,
      type: Number,
    },
    hoverEffect: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    displayedScore() {
      return this.isHoverActive ? this.hoveredIndex : this.score
    },
  },
  methods: {
    hoverRating(key) {
      if (!this.hoverEffect) {
        return
      }

      this.hoveredIndex = key
      this.isHoverActive = true
    },
  },
}
</script>
<style lang="scss" scoped>
.sw-rating {
  display: block;
  &__star {
    display: inline-block;
    cursor: pointer;
  }
}

.sw-rating-hover-off {
  .sw-rating__star {
    cursor: auto;
  }
}
</style>
