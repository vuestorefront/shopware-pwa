<template>
  <div class="sw-search-bar">
    <SfSearchBar
      :placeholder="$t('Search for products')"
      :aria-label="$t('Search for products')"
      class="sf-header__search desktop-only"
      v-model="typingQuery"
      @keyup.native="performSuggestSearch"
      @enter="performSearch"
      @focus="isSuggestBoxOpen = true"
      data-cy="search-bar"
    />
    <SwSuggestSearch
      :products="suggestResultProducts"
      :total-found="suggestResultTotal"
      :search-phrase="typingQuery"
      :is-open="isSuggestBoxOpen"
      @close="isSuggestBoxOpen = false"
      @search="performSearch"
    />
  </div>
</template>

<script>
import { ref, reactive, onMounted, watch, computed } from "@vue/composition-api"
import { getSearchPageUrl } from "@shopware-pwa/default-theme/helpers"
import { SfSearchBar } from "@storefront-ui/vue"
import { useProductSearch } from "@shopware-pwa/composables"
import { debounce } from "@shopware-pwa/helpers"
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

    const performSuggestSearch = debounce((event) => {
      if (event && event.key === "Enter") {
        return
      }
      const searchTerm = event.target.value
      if (typeof searchTerm === "string" && searchTerm.length > 0) {
        suggestSearch(searchTerm)
        isSuggestBoxOpen.value = true
      } else {
        isSuggestBoxOpen.value = false
      }
    }, 300)

    return {
      currentSearchTerm,
      search,
      suggestSearch,
      suggestResultTotal,
      suggestResultProducts,
      isSuggestBoxOpen,
      getSearchPageUrl,
      typingQuery,
      resetFilters,
      performSuggestSearch,
    }
  },
  methods: {
    performSearch() {
      if (this.typingQuery.length > 0) {
        this.resetFilters()
        this.$router.push(this.$i18n.path(getSearchPageUrl(this.typingQuery)))
      }
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

::v-deep .sf-search-bar {
  --search-bar-width: 100%;
}

.sw-search-bar {
  width: 100%;
}
</style>
