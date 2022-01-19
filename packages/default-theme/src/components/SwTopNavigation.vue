<template>
  <div
    ref="navigation"
    class="sw-top-navigation"
    data-testid="top-navigation"
    v-if="visibleCategories && visibleCategories.length"
  >
    <SwPluginSlot name="sw-top-navigation-before" />
    <div
      v-for="category in visibleCategories"
      :key="getTranslatedProperty(category, 'name')"
      class="sf-header-navigation-item sf-header__link"
      data-testid="top-navigation-item"
      @mouseover="
        changeCurrentCategory(getTranslatedProperty(category, 'name'))
      "
      @mouseleave="changeCurrentCategory(null)"
      @keyup.tab="
        changeCurrentCategory(getTranslatedProperty(category, 'name'))
      "
      @click="changeCurrentCategory(null)"
    >
      <a
        v-if="isLinkCategory(category)"
        class="sf-header__link"
        :href="getCategoryUrl(category)"
        target="_blank"
      >
        {{ getTranslatedProperty(category, "name") }}
      </a>
      <nuxt-link
        v-else
        class="sf-header__link"
        :to="$routing.getUrl(getCategoryUrl(category))"
        >{{ getTranslatedProperty(category, "name") }}</nuxt-link
      >
      <SwMegaMenu
        v-if="category.children && category.children.length"
        :category="category"
        :visible="
          currentCategoryName &&
          getTranslatedProperty(category, 'name') === currentCategoryName
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
import {
  useNavigation,
  useSharedState,
  useUIState,
} from "@shopware-pwa/composables"

import SwMegaMenu from "@/components/SwMegaMenu.vue"
import { ref, watch, computed } from "@vue/composition-api"
import { getCategoryUrl, isLinkCategory } from "@shopware-pwa/helpers"
import SwPluginSlot from "sw-plugins/SwPluginSlot.vue"
import { useDomains } from "@/logic"
import SwTopNavigationShowMore from "@/components/SwTopNavigationShowMore.vue"
import { getTranslatedProperty } from "@shopware-pwa/helpers"

export default {
  components: {
    SwMegaMenu,
    SwPluginSlot,
    SwTopNavigationShowMore,
  },
  setup() {
    const { switchState: switchOverlay } = useUIState({
      stateName: "MEGA_MENU_OVERLAY_STATE",
    })
    const unwrappedElements = ref(5)
    const { loadNavigationElements, navigationElements } = useNavigation()
    const { currentDomainId } = useDomains()
    const currentCategoryName = ref(null)

    const changeCurrentCategory = (categoryName) => {
      currentCategoryName.value = categoryName
      switchOverlay(!!currentCategoryName.value)
    }

    const { preloadRef } = useSharedState()
    preloadRef(navigationElements, async () => {
      await loadNavigationElements({ depth: 3 })
    })

    const unvisibleCategories = computed(() => {
      if (
        navigationElements.value?.slice(unwrappedElements.value).length === 0
      ) {
        return
      }

      return {
        children: navigationElements.value.slice(unwrappedElements.value),
        name: "categories",
        translated: {
          name: "categories",
        },
      }
    })

    watch(currentDomainId, async () => {
      await loadNavigationElements({ depth: 3 })
    })

    return {
      navigationElements: computed(() => navigationElements.value || []),
      visibleCategories: computed(() =>
        navigationElements.value?.slice(0, unwrappedElements.value)
      ),
      unvisibleCategories,
      getCategoryUrl,
      isLinkCategory,
      currentCategoryName,
      changeCurrentCategory,
      getTranslatedProperty,
    }
  },

  watch: {
    navigationElements() {
      this.countVisibleCategories()
    },
  },

  async mounted() {
    window.addEventListener("resize", this.countVisibleCategories)
    this.countVisibleCategories()
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.countVisibleCategories)
  },

  methods: {
    countVisibleCategories() {
      this.unwrappedElements = this.navigationElements.length

      this.$nextTick(() => {
        const nav = this.$refs.navigation
        const navElements =
          nav?.querySelectorAll(".sf-header-navigation-item") || []
        let visibleItemsCount = 0
        let unvisibleItemsCount = 0

        navElements.forEach((element) => {
          if (element.offsetTop <= 27) {
            visibleItemsCount += 1
          }
          if (element.offsetTop > 27) {
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
  --c-link-hover: var(--c-primary);
  --heading-title-font-line-height: 24px;
  max-height: 100px;

  ::v-deep .sf-menu-item__label {
    text-align: left;
    width: 100%;
  }

  .sw-overlay {
    --overlay-z-index: 1;
  }

  @include for-desktop {
    ::v-deep .sf-header-navigation-item {
      margin: 0 1rem 0 0;
      font-size: var(--font-size--base);
      font-weight: var(--font-weight--medium);
    }
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
