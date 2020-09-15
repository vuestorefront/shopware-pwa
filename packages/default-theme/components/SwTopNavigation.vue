<template>
  <div ref="navigation" class="sw-top-navigation" data-cy="top-navigation">
    <SwPluginSlot name="sw-top-navigation-before" />
    <div
      v-for="category in visibleCategories"
      :key="category.name"
      class="sf-header-navigation-item sf-header__link"
      data-cy="top-navigation-item"
      @mouseover="changeCurrentCategory(category.name)"
      @mouseleave="changeCurrentCategory(null)"
      @keyup.tab="changeCurrentCategory(category.name)"
    >
      <nuxt-link
        class="sf-header__link"
        :to="$i18n.path(getCategoryUrl(category))"
        >{{ category.name }}</nuxt-link
      >
      <SwMegaMenu
        :category="category"
        :visible="currentCategoryName && category.name === currentCategoryName"
      />
    </div>

    <div
      v-if="unvisibleCategories"
      class="sf-header-navigation-item sf-header__link"
      @mouseover="changeCurrentCategory('categories')"
      @mouseleave="changeCurrentCategory(null)"
      @keyup.tab="changeCurrentCategory('categories')"
    >
      <SwTopNavigationShowMore />

      <SwMegaMenu
        :category="unvisibleCategories"
        :visible="currentCategoryName && 'categories' === currentCategoryName"
      />
    </div>
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
import SwTopNavigationShowMore from "@shopware-pwa/default-theme/components/SwTopNavigationShowMore"

export default {
  components: {
    SwMegaMenu,
    SwPluginSlot,
    SwTopNavigationShowMore,
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
        try {
          fetchNavigationElements(3)
        } catch (e) {
          console.error("[SwTopNavigation]", e)
        }
      }
    })

    return {
      navigationElements,
      getCategoryUrl,
      currentCategoryName,
      changeCurrentCategory,
    }
  },

  data() {
    return { unwrappedElements: 0 }
  },

  computed: {
    visibleCategories() {
      return this.navigationElements.slice(0, this.unwrappedElements)
    },

    unvisibleCategories() {
      if (this.navigationElements.slice(this.unwrappedElements).length === 0) {
        return undefined
      }

      return {
        children: this.navigationElements.slice(this.unwrappedElements),
        name: "categories",
      }
    },
  },

  watch: {
    navigationElements() {
      this.countVisibleCategories()
    },
  },

  mounted() {
    window.addEventListener("resize", this.countVisibleCategories)
  },

  unmounted() {
    window.removeEventListener("resize", this.countVisibleCategories)
  },

  methods: {
    countVisibleCategories() {
      this.unwrappedElements = this.navigationElements.length

      this.$nextTick(() => {
        const nav = this.$refs.navigation
        const navElements = nav.querySelectorAll(".sf-header-navigation-item")
        let visibleItemsCount = 0
        let unvisibleItemsCount = 0

        navElements.forEach((element) => {
          if (element.offsetTop === 0) {
            visibleItemsCount += 1
          }
          if (element.offsetTop > 0) {
            unvisibleItemsCount += 1
          }
        })
        if (unvisibleItemsCount >= 1) {
          // This subtraction makes more space in nav and prevent to move "more category " to the next line.
          this.unwrappedElements = Math.max(0, visibleItemsCount - 2)
        } else {
          this.unwrappedElements = visibleItemsCount
        }
      })
    },
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
  --heading-title-font-size: 16px;
  --heading-title-font-weight: 500;
  --c-link-hover: var(--_c-green-primary);
  --heading-title-font-line-height: 24px;

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
