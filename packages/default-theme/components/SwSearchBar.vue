<template>
  <div class="sw-search-bar">
    <SfSearchBar
      :placeholder="$t('Search for products')"
      :aria-label="$t('Search for products')"
      class="sf-header__search desktop-only"
      v-model="typingQuery"
      @enter="performSearch"
      @focus="isSuggestBoxOpen = true"
      data-cy="search-bar"
    />
    <SwSuggestSearch
      :products="getProducts"
      :total-found="getTotal"
      :search-phrase="typingQuery"
      :is-open="isSuggestBoxOpen"
      @close="isSuggestBoxOpen = false"
      @search="performSearch"
    />
  </div>
</template>

<script>
import { ref, reactive, onMounted, watch, computed } from "@vue/composition-api"
import { getSearchPageUrl } from "@/helpers"
import { SfSearchBar } from "@storefront-ui/vue"
import { useProductQuickSearch } from "@shopware-pwa/composables"
import { debounce } from "@shopware-pwa/helpers"
import SwSuggestSearch from "@/components/SwSuggestSearch"

export default {
  components: {
    SfSearchBar,
    SwSuggestSearch,
  },
  setup(props, { root }) {
    const { searchTerm, search, getProducts, getTotal } = useProductQuickSearch(
      root
    )

    const typingQuery = ref("")
    const isSuggestBoxOpen = ref(false)

    const performSuggestSearch = debounce((value) => {
      searchTerm.value = value
      if (searchTerm.value.length > 0) {
        search()
        isSuggestBoxOpen.value = true
      } else {
        isSuggestBoxOpen.value = false
      }
    }, 300)

    watch(typingQuery, () => {
      performSuggestSearch(typingQuery.value)
    })

    return {
      getProducts,
      getTotal,
      isSuggestBoxOpen,
      typingQuery,
    }
  },
  methods: {
    performSearch() {
      if (this.typingQuery.length > 0) {
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
