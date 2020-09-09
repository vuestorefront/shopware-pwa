<template>
  <div class="sw-rating" :class="{ 'sw-rating-hover-off': !hoverEffect }">
    <SfIcon
      class="sw-rating__star"
      v-for="i in max"
      :key="i"
      icon="star"
      :style="{}"
      :size="size"
      :color="i <= score ? 'green-primary' : 'grey-primary'"
      :ref="`rating-${i}`"
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
    return {}
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
  methods: {
    hoverRating(key) {
      if (!this.hoverEffect) {
        return
      }

      for (let j = key; j <= this.max; j++) {
        if (this.$refs[`rating-${j}`][0]) {
          this.$refs[`rating-${j}`][0].$el.classList.remove(
            "color-green-primary"
          )
          this.$refs[`rating-${j}`][0].$el.classList.add("color-gray-primary")
          this.$refs[`rating-${j}`][0].$el.style = null
        }
      }
      for (let i = 1; i <= key; i++) {
        if (this.$refs[`rating-${i}`][0]) {
          this.$refs[`rating-${i}`][0].$el.classList.remove(
            "color-gray-primary"
          )
          this.$refs[`rating-${i}`][0].$el.classList.add("color-green-primary")
          this.$refs[`rating-${i}`][0].$el.style = null
        }
      }
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
