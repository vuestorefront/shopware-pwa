<template>
  <div ref="navigation" class="sw-top-navigation">
    <SwPluginSlot name="sw-top-navigation-before" />
    <SfHeaderNavigationItem
      v-for="category in visibleCategories"
      :key="category.name"
      class="sf-header__link"
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
    </SfHeaderNavigationItem>

    <SfHeaderNavigationItem
      class="sf-header__link"
      v-if="unvisibleCategories"
      @mouseover="changeCurrentCategory('categories')"
      @mouseleave="changeCurrentCategory(null)"
      @keyup.tab="changeCurrentCategory('categories')"
    >
      <span class="sf-header__link">More</span>
      <SwMegaMenu
        :category="unvisibleCategories"
        :visible="currentCategoryName && 'categories' === currentCategoryName"
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
import { setTimeout } from "timers"

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

    onMounted(() => {
      watch(currentLocale, async () => {
        try {
          await fetchNavigationElements(3)
        } catch (e) {
          console.error("[SwTopNavigation]", e)
        }
      })
    })

    return {
      navigationElements,
      getCategoryUrl,
      currentCategoryName,
      changeCurrentCategory,
    }
  },

  mounted() {
    window.addEventListener("resize", this.countVisibleCategories)
  },

  unmounted() {
    window.removeEventListener("resize", this.countVisibleCategories)
  },

  watch: {
    navigationElements() {
      this.countVisibleCategories()
    },
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

  methods: {
    countVisibleCategories() {
      this.unwrappedElements = this.navigationElements.length

      this.$nextTick(() => {
        const nav = this.$refs.navigation
        const navElements = nav.querySelectorAll(".sf-header-navigation-item")
        let visibleItemsCount = 0

        navElements.forEach((element) => {
          if (element.offsetTop === 0) {
            visibleItemsCount += 1
          }
        })
        //This subtraction makes more space in nav and prevent to move "more category " to the next line and make some space.
        this.unwrappedElements = Math.max(0, visibleItemsCount - 2)
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
