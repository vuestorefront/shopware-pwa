<template>
  <div class="sw-top-navigation" data-cy="top-navigation">
    <SwPluginSlot name="sw-top-navigation-before" />
    <SfHeaderNavigationItem
      v-for="category in navigationElements"
      :key="category.name"
      class="sf-header__link"
      @mouseover="changeCurrentCategory(category.name)"
      @mouseleave="changeCurrentCategory(null)"
      @keyup.tab="changeCurrentCategory(category.name)"
      data-cy="top-navigation-item"
    >
      <nuxt-link
        class="sf-header__link"
        :to="$i18n.path(getCategoryUrl(category))"
      >
        {{ category.name }}
      </nuxt-link>
      <SwMegaMenu
        :category="category"
        :visible="currentCategoryName && category.name === currentCategoryName"
      />
    </SfHeaderNavigationItem>
    <SwPluginSlot name="sw-top-navigation-after" />
  </div>
</template>

<script>
import { useNavigation, useUIState } from "@shopware-pwa/composables"

import SwMegaMenu from "@shopware-pwa/default-theme/components/SwMegaMenu"
import { ref, onMounted, watch } from "@vue/composition-api"
import { getCategoryUrl } from "@shopware-pwa/helpers"
import SwPluginSlot from "sw-plugins/SwPluginSlot"
import { useLocales } from "@shopware-pwa/default-theme/logic"

export default {
  components: {
    SwMegaMenu,
    SwPluginSlot,
  },
  setup(props, { root }) {
    const { switchState: switchOverlay } = useUIState(
      root,
      "MEGA_MENU_OVERLAY_STATE"
    )
    const { fetchNavigationElements, navigationElements } = useNavigation(root)
    const { currentLocale } = useLocales(root)

    const currentCategoryName = ref(null)

    const changeCurrentCategory = (categoryName) => {
      currentCategoryName.value = categoryName
      switchOverlay(!!currentCategoryName.value)
    }

    onMounted(async () => {
      await watch(currentLocale, async () => {
        try {
          await fetchNavigationElements(3)
        } catch (e) {
          console.error("[SwTopNavigation]", e)
        }
      })

      // fixes a watch issue - fetch the elements if watch wasn't fired
      if (Array.isArray(navigationElements) && !navigationElements.length) {
        fetchNavigationElements(3)
      }
    })

    return {
      navigationElements,
      getCategoryUrl,
      currentCategoryName,
      changeCurrentCategory,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.sw-top-navigation {
  display: flex;
  flex-wrap: wrap;
  --search-bar-width: 100%;
  --header-container-padding: 0 var(--spacer-base);
  --header-navigation-item-margin: 0 1rem 0 0;
  margin-bottom: var(--spacer-sm);
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
</style>
