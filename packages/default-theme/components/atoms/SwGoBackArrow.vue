<template>
  <SfArrow
    aria-label="Go back arrow"
    @click="goBack"
    class="go-back"
    data-cy="go-back"
  >
    <SfIcon
      icon="chevron_left"
      class="sf-arrow__icon"
      size="16px"
      view-box="0 0 24 12"
    />
  </SfArrow>
</template>
<script>
import { SfArrow, SfIcon } from "@storefront-ui/vue"

export default {
  name: "SwGoBackArrow",

  components: {
    SfArrow,
    SfIcon,
  },

  setup(props, { root }) {
    return {}
  },

  methods: {
    goBack() {
      this.$router.back()
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.go-back {
  @include for-desktop {
    display: none;
  }
}
</style>
