<template>
  <div class="sw-search-bar">
    <SfSearchBar
      v-model="typingQuery"
      :placeholder="$t('Search for products')"
      :aria-label="$t('Search for products')"
      class="sf-header__search"
      data-cy="search-bar"
      @keydown.enter="performSearch"
    />

    <SwSuggestSearch
      v-if="!isMobile"
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
import { ref, reactive, onMounted, computed } from "@vue/composition-api"
import { getSearchPageUrl } from "@/helpers"
import { SfSearchBar } from "@storefront-ui/vue"
import { useProductQuickSearch } from "@shopware-pwa/composables"
import {
  mapMobileObserver,
  unMapMobileObserver,
} from "@storefront-ui/vue/src/utilities/mobile-observer"
import { debounce } from "@shopware-pwa/helpers"
const SwSuggestSearch = () => import("@/components/SwSuggestSearch.vue")

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

    return {
      getProducts,
      getTotal,
      isSuggestBoxOpen,
      typingQuery,
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
    typingQuery(value) {
      if (!this.isMobile) {
        this.performSuggestSearch(value)
      }
    },
  },
  beforeDestroy() {
    unMapMobileObserver()
  },
  methods: {
    performSearch() {
      if (this.typingQuery.length > 0) {
        this.$router.push(
          this.$routing.getUrl(getSearchPageUrl(this.typingQuery))
        )
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

::v-deep .sf-search-bar {
  --search-bar-width: 100%;
  --search-bar-font-size: var(--font-size--sm);
}

.sw-search-bar {
  width: 100%;
}
</style>
