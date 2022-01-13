<template>
  <div class="sw-top-navigation" data-testid="main-header">
    <SfOverlay :visible="isOpen" class="sw-overlay" />

    <SwCookieBar />

    <SwTopBar />

    <SfHeader
      :title="$t('page.title')"
      class="sw-header sf-header--has-mobile-search"
      :has-mobile-search="false"
      :is-sticky="false"
    >
      <template #logo>
        <SwLogo />
      </template>
      <template #navigation>
        <SwTopNavigation />
      </template>
      <template #search>
        <SwSearchBar />
      </template>
      <template #header-icons>
        <SwHeaderIcons />
      </template>
    </SfHeader>
  </div>
</template>

<script>
import { SfHeader, SfOverlay } from "@storefront-ui/vue"
import { useUIState } from "@shopware-pwa/composables"

import SwTopBar from "@/components/SwTopBar.vue"
import SwLogo from "@/components/SwLogo.vue"
import SwHeaderIcons from "@/components/SwHeaderIcons.vue"
import SwTopNavigation from "@/components/SwTopNavigation.vue"
import SwSearchBar from "@/components/SwSearchBar.vue"

import SwCookieBar from "@/components/gdpr/SwCookieBar.vue"

export default {
  components: {
    SfHeader,
    SfOverlay,
    SwTopBar,
    SwLogo,
    SwHeaderIcons,
    SwTopNavigation,
    SwSearchBar,
    SwCookieBar,
  },
  setup() {
    const { isOpen } = useUIState({ stateName: "MEGA_MENU_OVERLAY_STATE" })

    return {
      isOpen,
    }
  },
}
</script>

<style lang="scss">
.sf-header__wrapper {
  header {
    box-sizing: border-box;
    max-width: 1320px;
  }
}
</style>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.sw-top-navigation {
  --header-container-padding: 0 var(--spacer-base);
  --header-navigation-item-margin: 0 1rem 0 0;

  .sw-overlay {
    --overlay-z-index: 1;
  }

  @include for-desktop {
    ::v-deep .sf-header {
      display: flex;
      justify-content: space-between;
      &__sticky-container {
        width: 100%;
      }
      &__navigation {
        flex: 0 0 calc(100% - 22rem);
      }
    }
  }
}

.sw-header {
  position: relative;
  background-color: var(--c-white);

  &__icons {
    display: flex;
  }

  &__icon {
    cursor: pointer;
  }
}
</style>
