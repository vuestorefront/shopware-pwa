<template>
  <div>
    <TopNavigation/>
    <nuxt />
  </div>
</template>
<script>
import TopNavigation from "../components/TopNavigation"
export default {
  components: {
    TopNavigation
  }
}
</script>
<style lang="scss">
@import '~@storefront-ui/vue/styles.scss';
@import '~@storefront-ui/shared/styles/helpers/visibility';
@import '~@storefront-ui/vue/src/utilities/transitions/transitions';
body {
  padding: 0;
  margin: 0;
}
</style>
