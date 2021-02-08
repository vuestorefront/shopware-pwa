<template>
  <div
    ref="navigation"
    class="sw-top-navigation"
    data-cy="top-navigation"
    v-if="visibleCategories.length"
  >
    <SwPluginSlot name="sw-top-navigation-before" />
    <div
      v-for="category in visibleCategories"
      :key="category.translated.name"
      class="sf-header-navigation-item sf-header__link"
      data-cy="top-navigation-item"
      @mouseover="changeCurrentCategory(category.translated.name)"
      @mouseleave="changeCurrentCategory(null)"
      @keyup.tab="changeCurrentCategory(category.translated.name)"
      @click="changeCurrentCategory(null)"
    >
      <nuxt-link
        class="sf-header__link"
        :to="$routing.getUrl(getCategoryUrl(category))"
        >{{ category.translated.name }}</nuxt-link
      >
      <SwMegaMenu
        v-if="category.children && category.children.length"
        :category="category"
        :visible="
          currentCategoryName &&
          category.translated &&
          category.translated.name === currentCategoryName
        "
      />
    </div>

    <div
      v-if="unvisibleCategories"
      class="sf-header-navigation-item sf-header__link"
      @mouseover="changeCurrentCategory('categories')"
      @mouseleave="changeCurrentCategory(null)"
      @keyup.tab="changeCurrentCategory('categories')"
      @click="changeCurrentCategory(null)"
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

import SwMegaMenu from "@/components/SwMegaMenu"
import { ref, onMounted, watch } from "@vue/composition-api"
import { getCategoryUrl } from "@shopware-pwa/helpers"
import SwPluginSlot from "sw-plugins/SwPluginSlot"
import { useDomains } from "@/logic"
import SwTopNavigationShowMore from "@/components/SwTopNavigationShowMore"

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
    const { currentDomainId } = useDomains(root)

    const currentCategoryName = ref(null)

    const changeCurrentCategory = (categoryName) => {
      currentCategoryName.value = categoryName
      switchOverlay(!!currentCategoryName.value)
    }

    onMounted(async () => {
      await watch(currentDomainId, async () => {
        try {
          await fetchNavigationElements(3)
        } catch (e) {
          console.error("[SwTopNavigation]", e)
        }
      })
    })

    return {
      fetchNavigationElements,
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
        translated: {
          name: "categories",
        },
      }
    },
  },

  watch: {
    navigationElements() {
      this.countVisibleCategories()
    },
  },

  async mounted() {
    window.addEventListener("resize", this.countVisibleCategories)
    // fixes a watch issue - fetch the elements if watch wasn't fired
    if (
      Array.isArray(this.navigationElements) &&
      !this.navigationElements.length
    ) {
      try {
        await this.fetchNavigationElements(3)
      } catch (e) {
        console.error("[SwTopNavigation]", e)
      }
    }
    this.countVisibleCategories()
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

  ::v-deep .sf-menu-item__label {
    text-align: left;
    width: 100%;
  }

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
</style>
