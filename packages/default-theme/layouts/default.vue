<template>
  <div class="layout">
    <TopNavigation />
    <SfBreadcrumbs
      v-show="getBreadcrumbs.length > 0"
      :breadcrumbs="getBreadcrumbs"
      class="sw-breadcrumbs"
      @click="redirectTo"
    />
    <nuxt />
    <SwCart />
    <SwBottomNavigation class="layout__bottom-navigation" />
    <SwFooter />
  </div>
</template>

<script>
import { SfBreadcrumbs } from '@storefront-ui/vue'
import TopNavigation from '../components/TopNavigation'
import SwBottomNavigation from '../components/SwBottomNavigation'
import SwCart from '../components/SwCart'
import SwFooter from '../components/cms/elements/SwFooter'

export default {
  components: {
    SfBreadcrumbs,
    TopNavigation,
    SwCart,
    SwFooter,
    SwBottomNavigation
  },
  computed: {
    componentBreadcrumbs() {
      // TODO probably move to vuex now as it's not rendered on server side
      return (
        this.$route.matched.map(r => {
          return r.components.default.options.data().breadcrumbs
        })[0] || {}
      )
    },
    getBreadcrumbs() {
      return Object.keys(this.componentBreadcrumbs)
        .map(key => this.componentBreadcrumbs[key])
        .map(breadcrumb => ({
          text: breadcrumb.name,
          route: {
            link: breadcrumb.path
          }
        }))
    }
  },
  methods: {
    redirectTo(route) {
      return this.$router.push(route.link)
    }
  }
}
</script>

<style lang="scss">
@import '~@storefront-ui/vue/styles';

html {
  height: 100vh;
  font-family: var(--body-font-family-primary);
  font-weight: var(--body-font-weight-primary);
  line-height: 1.6;
  font-size: var(--font-size-regular);
}

a {
  text-decoration: none;
  color: var(--c-link);
  &:hover {
    color: var(--c-link-hover);
  }
}

body {
  padding: 0;
  margin: 0;
  min-height: 100vh;
}

#__nuxt {
  height: 100vh;
}

#__layout {
  height: 100%;
}

.layout {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1320px;
    margin: auto;
  }
  height: 100%;
  display: flex;
  flex-direction: column;

  &__bottom-navigation {
    @include for-desktop() {
      display: none;
    }
  }
}

.sw-breadcrumbs {
  padding: var(--spacer-big) var(--spacer-extra-big) var(--spacer-extra-big);
}

/* Delete firefox outline */
:focus {
  outline: none;
}
::-moz-focus-inner {
  border: 0;
}
</style>
