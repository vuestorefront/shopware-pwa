<template>
  <div class="layout">
    <SwNotifications />
    <SwOfflineMode />
    <SwPluginSlot name="page-top" />
    <SwHeader />

    <SwPluginSlot name="top-header-after" />
    <SwPluginSlot name="breadcrumbs" :slot-context="getBreadcrumbs">
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
    <SwLoginModal
      :is-open="isLoginModalOpen"
      @close="switchLoginModalState(false)"
    />
    <div class="layout__bottom-navigation-placeholder" />
    <SwBottomNavigation class="layout__bottom-navigation" />
  </div>
</template>

<script>
import { SfBreadcrumbs } from "@storefront-ui/vue"
import SwHeader from "@/components/SwHeader.vue"
import SwBottomNavigation from "@/components/SwBottomNavigation.vue"
import SwFooter from "@/components/SwFooter.vue"
import SwPluginSlot from "sw-plugins/SwPluginSlot.vue"
import { useBreadcrumbs, useUIState } from "@shopware-pwa/composables"
import { computed, ref, watchEffect } from "@vue/composition-api"
import SwLoginModal from "@/components/modals/SwLoginModal.vue"
import SwNotifications from "@/components/SwNotifications.vue"
import SwOfflineMode from "@/components/SwOfflineMode.vue"
const SwCart = () => import("@/components/SwCart.vue")

export default {
  components: {
    SfBreadcrumbs,
    SwHeader,
    SwCart,
    SwFooter,
    SwBottomNavigation,
    SwPluginSlot,
    SwLoginModal,
    SwNotifications,
    SwOfflineMode,
  },

  setup(props, { root }) {
    const { breadcrumbs } = useBreadcrumbs(root)
    const { isOpen: isSidebarOpen } = useUIState(root, "CART_SIDEBAR_STATE")
    const { isOpen: isLoginModalOpen, switchState: switchLoginModalState } =
      useUIState(root, "LOGIN_MODAL_STATE")

    // Load cart component only when needed
    const loadSidebarComponent = ref(isSidebarOpen.value)
    const stopWatcher = watchEffect(() => {
      if (isSidebarOpen.value) {
        loadSidebarComponent.value = isSidebarOpen.value
        stopWatcher()
      }
    })

    const getBreadcrumbs = computed(() => {
      return breadcrumbs.value.map((breadcrumb) => {
        return {
          // map to SFUI type
          text: breadcrumb.name,
          link: root.$routing.getUrl(breadcrumb.path),
        }
      })
    })

    return {
      getBreadcrumbs,
      isSidebarOpen: loadSidebarComponent,
      isLoginModalOpen,
      switchLoginModalState,
    }
  },
  middleware: ["pages"],
  methods: {
    redirectTo(route) {
      return this.$router.push(this.$routing.getUrl(route.link))
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

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
  box-sizing: border-box;
  padding: 1rem;
}
</style>
