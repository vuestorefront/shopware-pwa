<template>
  <div>
    <TopNavigation/>
    <SfBreadcrumbs :breadcrumbs="getBreadcrumbs" class="sw-breadcrumbs"/>
    <nuxt />
  </div>
</template>
<script>
import TopNavigation from "../components/TopNavigation"
import { SfBreadcrumbs } from "@storefront-ui/vue";

export default {
  components: {
    TopNavigation,
    SfBreadcrumbs
  },
  computed: {
    componentBreadcrumbs () { // TODO probably move to vuex now as it's not rendered on server side
      return this.$route.matched.map((r) => {
        return r.components.default.options.data().breadcrumbs
      })[0] || {}
    },
    getBreadcrumbs () {
      return Object.keys(this.componentBreadcrumbs).map(key => this.componentBreadcrumbs[key]).map(breadcrumb => ({
        text: breadcrumb.name,
        route: {
          link: breadcrumb.path
        }
      }))
    }
  },
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

.sw-breadcrumbs {
  padding: 0 1rem;
}
</style>
