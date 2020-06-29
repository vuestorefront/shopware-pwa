<template>
  <SfSearchBar
    :placeholder="$t('Search for products')"
    :aria-label="$t('Search for products')"
    class="sf-header__search desktop-only"
    v-model="typingQuery"
    @keyup.native="performSuggestSearch"
    @enter="performSearch"
    data-cy="search-bar"
  />
</template>

<script>
import { ref, reactive, onMounted, watch, computed } from "@vue/composition-api"
import { getSearchPageUrl } from "@shopware-pwa/default-theme/helpers"
import { SfSearchBar } from "@storefront-ui/vue"
import { useProductSearch } from "@shopware-pwa/composables"

export default {
  components: {
    SfSearchBar,
  },
  setup(props, { root }) {
    const {
      search,
      suggestSearch,
      suggestionsResult,
      resetFilters,
    } = useProductSearch(root)

    const typingQuery = ref("")
    const suggestResultProducts = computed(
      () => suggestionsResult.value && suggestionsResult.value.elements
    )
    const suggestResultTotal = computed(
      () => suggestionsResult.value && suggestionsResult.value.total
    )
    return {
      search,
      suggestSearch,
      getSearchPageUrl,
      typingQuery,
      resetFilters,
    }
  },
  methods: {
    performSuggestSearch(event) {
      // TODO bring back with debounde when there will be UI preview
      // const searchTerm = event.target.value
      // if (typeof searchTerm === 'string' && searchTerm.length > 0) {
      //   try {
      //     this.suggestSearch(searchTerm)
      //   } catch (e) {
      //     console.error('[SwTopNavigation][performSuggestSearch]: ' + e)
      //   }
      // }
    },
    performSearch(searchTerm) {
      if (typeof searchTerm === "string" && searchTerm.length > 0) {
        this.resetFilters()
        this.$router.push(this.$i18n.path(getSearchPageUrl(searchTerm)))
      }
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
