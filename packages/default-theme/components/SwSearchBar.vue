<template>
  <div class="sw-search-bar">
    <SfSearchBar
      v-model="typingQuery"
      :placeholder="$t('Search for products')"
      :aria-label="$t('Search for products')"
      class="sf-header__search"
      data-cy="search-bar"
      @keyup.native="searchbarQuery"
      @enter="performSearch"
      @focus="isSuggestBoxOpen = true"
    />

    <SwSuggestSearch
      v-if="!isMobile"
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
import { ref, computed } from "@vue/composition-api"
import { getSearchPageUrl } from "@shopware-pwa/default-theme/helpers"
import { SfSearchBar } from "@storefront-ui/vue"
import {
  mapMobileObserver,
  unMapMobileObserver,
} from "@storefront-ui/vue/src/utilities/mobile-observer"
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
  computed: {
    ...mapMobileObserver(),
  },
  watch: {
    $route(to, from) {
      this.isSuggestBoxOpen = false
    },
  },
  beforeDestroy() {
    unMapMobileObserver()
  },
  methods: {
    performSearch() {
      if (this.typingQuery.length > 0) {
        this.resetFilters()
        this.$router.push(this.$i18n.path(getSearchPageUrl(this.typingQuery)))
      }
    },

    searchbarQuery() {
      if (!this.isMobile) {
        this.performSuggestSearch()
      }
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
