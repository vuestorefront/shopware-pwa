<template>
  <div class="sw-top-navigation" data-cy="main-header">
    <SfOverlay :visible="isOpen" class="sw-overlay" />

    <SwTopBar />

    <SfHeader
      :title="$t('page.title')"
      class="sw-header"
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

import SwTopBar from "@shopware-pwa/default-theme/components/SwTopBar"
import SwLogo from "@shopware-pwa/default-theme/components/SwLogo"
import SwHeaderIcons from "@shopware-pwa/default-theme/components/SwHeaderIcons"
import SwTopNavigation from "@shopware-pwa/default-theme/components/SwTopNavigation"
import SwSearchBar from "@shopware-pwa/default-theme/components/SwSearchBar"

export default {
  components: {
    SfHeader,
    SfOverlay,
    SwTopBar,
    SwLogo,
    SwHeaderIcons,
    SwTopNavigation,
    SwSearchBar,
  },
  setup(props, { root }) {
    const { isOpen } = useUIState(root, "MEGA_MENU_OVERLAY_STATE")

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
        flex: 0 0 calc(100% - 20rem);
      }
    }
  }
}

.sw-header {
  background-color: var(--c-white);

  &__icons {
    display: flex;
  }

  &__icon {
    cursor: pointer;
  }
}
</style>
