<template>
  <div>
    <div id="nav">
      <nuxt-link to="/">Home</nuxt-link> |
      <nuxt-link to="/category">Category</nuxt-link>
    </div>
    <SfBreadcrumbs :breadcrumbs="getBreadcrumbs" />
    <nuxt />
  </div>
</template>

<script>
import { SfBreadcrumbs } from "@storefront-ui/vue";

export default {
  components: {
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

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.nuxt-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
