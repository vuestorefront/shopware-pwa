<template>
  <div>
    <SfSearchBar
      :placeholder="$t('Search for products')"
      :aria-label="$t('Search for products')"
      class="sf-header__search desktop-only"
      v-model="typingQuery"
      @keyup.native="performSuggestSearch"
      @enter="performSearch"
      data-cy="search-bar"
    />
    <SwSuggestSearch
      :products="suggestResultProducts"
      :total-found="suggestResultTotal"
      :search-phrase="typingQuery"
      :is-open="isSuggestSearchVisible"
      @close="isSuggestBoxOpen = false"
      @seeMore="onSeeMore"
    />
  </div>
</template>

<script>
import { ref, reactive, onMounted, watch, computed } from "@vue/composition-api"
import { getSearchPageUrl } from "@shopware-pwa/default-theme/helpers"
import { SfSearchBar } from "@storefront-ui/vue"
import { useProductSearch } from "@shopware-pwa/composables"
import SwSuggestSearch from "@shopware-pwa/default-theme/components/SwSuggestSearch"

export default {
  components: {
    SfSearchBar,
    SwSuggestSearch,
  },
  setup(props, { root }) {
    const {
      currentSearchTerm,
      search,
      suggestSearch,
      suggestionsResult,
      resetFilters,
    } = useProductSearch(root)

    const typingQuery = ref("")
    const isSuggestBoxOpen = ref(false)
    const suggestResultProducts = computed(
      () => suggestionsResult.value && suggestionsResult.value.elements
    )
    const suggestResultTotal = computed(
      () => suggestionsResult.value && suggestionsResult.value.total
    )

    const isSuggestSearchVisible = computed(() => isSuggestBoxOpen.value)

    return {
      currentSearchTerm,
      search,
      suggestSearch,
      suggestResultTotal,
      suggestResultProducts,
      isSuggestSearchVisible,
      isSuggestBoxOpen,
      getSearchPageUrl,
      typingQuery,
      resetFilters,
      debounce,
    }
  },
  data() {
    return {
      debounce: null,
    }
  },
  methods: {
    performSuggestSearch(event) {
      clearTimeout(this.debounce)

      if (event && event.key === "Enter") {
        return
      }

      this.debounce = setTimeout(() => {
        const searchTerm = event.target.value
        if (typeof searchTerm === "string" && searchTerm.length > 0) {
          try {
            this.suggestSearch(searchTerm)
            this.isSuggestBoxOpen = true
          } catch (e) {
            console.error("[SwTopNavigation][performSuggestSearch]: " + e)
          }
        } else {
          this.isSuggestBoxOpen = false
        }
      }, 400)
    },
    performSearch(searchTerm) {
      if (typeof searchTerm === "string" && searchTerm.length > 0) {
        this.resetFilters()
        this.$router.push(this.$i18n.path(getSearchPageUrl(searchTerm)))
      }
    },
    onSeeMore() {
      return this.performSearch(this.typingQuery)
    },
  },
  watch: {
    $route(to, from) {
      this.isSuggestBoxOpen = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.sw-top-navigation {
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
.sw-header {
  z-index: 2;
  background-color: #fff;
  &__icons {
    display: flex;
  }
  &__icon {
    cursor: pointer;
  }
}
</style>
