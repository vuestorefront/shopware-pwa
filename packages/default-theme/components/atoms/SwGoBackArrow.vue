<template>
  <SfArrow aria-label="Go back arrow" @click="goBack" class="go-back" />
</template>
<script>
import { SfArrow } from "@storefront-ui/vue"

export default {
  name: "SwGoBackArrow",

  components: {
    SfArrow,
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
