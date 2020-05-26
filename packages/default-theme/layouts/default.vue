<template>
  <div class="layout">
    <SwPluginSlot name="page-top" />
    <SwTopNavigation />
    <SwPluginSlot name="top-header-after" />
    <SwPluginSlot name="breadcrumbs">
      <SfBreadcrumbs
        v-show="getBreadcrumbs.length > 0"
        :breadcrumbs="getBreadcrumbs"
        class="sw-breadcrumbs layout__sized"
        @click="redirectTo"
      />
    </SwPluginSlot>
    <nuxt />
    <SwCart />
    <SwPluginSlot name="footer-before" />
    <SwFooter />
    <SwPluginSlot name="footer-after" />
    <div class="layout__bottom-navigation-placeholder" />
    <SwBottomNavigation class="layout__bottom-navigation" />
  </div>
</template>

<script>
import { SfBreadcrumbs } from '@storefront-ui/vue'
import SwTopNavigation from '@shopware-pwa/default-theme/components/SwTopNavigation'
import SwBottomNavigation from '@shopware-pwa/default-theme/components/SwBottomNavigation'
import SwCart from '@shopware-pwa/default-theme/components/SwCart'
import SwFooter from '@shopware-pwa/default-theme/components/SwFooter'
import SwPluginSlot from 'sw-plugins/SwPluginSlot'

export default {
  components: {
    SfBreadcrumbs,
    SwTopNavigation,
    SwCart,
    SwFooter,
    SwBottomNavigation,
    SwPluginSlot,
  },
  computed: {
    componentBreadcrumbs() {
      // TODO probably move to vuex now as it's not rendered on server side
      return (
        this.$route.matched
          .map((r) => {
            return (
              r.components.default.options.data &&
              r.components.default.options.data().breadcrumbs
            )
          })
          .shift() || {}
      )
    },
    getBreadcrumbs() {
      return Object.keys(this.componentBreadcrumbs)
        .map((key) => this.componentBreadcrumbs[key])
        .map((breadcrumb) => ({
          text: breadcrumb.name,
          route: {
            link: breadcrumb.path,
          },
        }))
    },
  },
  methods: {
    redirectTo(route) {
      return this.$router.push(this.$i18n.path(route.link))
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.layout {
  box-sizing: border-box;
  height: 100%;

  &__bottom-navigation-placeholder {
    height: 6em;
    @include for-desktop() {
      display: none;
    }
  }
  &__bottom-navigation {
    @include for-desktop() {
      display: none;
    }
  }

  &__sized {
    @include for-desktop {
      max-width: 1320px;
      width: 100%;
      margin: auto;
    }
  }
}

.sw-breadcrumbs {
  padding: 0 var(--spacer-xl) var(--spacer-base) var(--spacer-xl);
}
</style>
