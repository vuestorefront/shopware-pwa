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
    <SwCart v-if="isSidebarOpen" />
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
import SwFooter from '@shopware-pwa/default-theme/components/SwFooter'
import SwPluginSlot from 'sw-plugins/SwPluginSlot'
import { useCms, useCartSidebar } from '@shopware-pwa/composables'
import {
  computed,
  getCurrentInstance,
  ref,
  watchEffect,
} from '@vue/composition-api'
const SwCart = () =>
  import('@shopware-pwa/default-theme/components/SwCart')

export default {
  components: {
    SfBreadcrumbs,
    SwTopNavigation,
    SwCart,
    SwFooter,
    SwBottomNavigation,
    SwPluginSlot,
  },
  setup() {
    const vm = getCurrentInstance()
    const { breadcrumbsObject } = useCms()
    const { isSidebarOpen } = useCartSidebar()

    // Load cart component only when needed
    const loadSidebarComponent = ref(isSidebarOpen.value)
    const stopWatcher = watchEffect(() => {
      if (isSidebarOpen.value) {
        loadSidebarComponent.value = isSidebarOpen.value
        stopWatcher()
      }
    })

    const getBreadcrumbs = computed(() =>
      Object.values(breadcrumbsObject.value).map((breadcrumb) => ({
        text: breadcrumb.name,
        route: {
          link: vm.$i18n.path(breadcrumb.path),
        },
      }))
    )
    return {
      getBreadcrumbs,
      isSidebarOpen: loadSidebarComponent,
    }
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
