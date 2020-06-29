<template>
  <div :key="$route.fullPath" class="search-page">
    <h3 v-if="!searchQuery && startedSearching" class="search-page__warning">
      You didn't provide any term to be found
    </h3>
    <SfLoader v-else :loading="loadingSearch || !startedSearching">
      <div v-if="searchResult" class="search-page__main">
        <h3>
          search results for <strong>{{ searchQuery }}</strong> :
        </h3>
        <SwProductListing
          :listing="searchResult"
          :loading="loadingSearch"
          :is-list-view="isListView"
          @change-page="changePage"
        />
      </div>
    </SfLoader>
  </div>
</template>
<script>
import { SfLoader } from "@storefront-ui/vue"
import { useProductSearch, useUIState } from "@shopware-pwa/composables"

import { ref, watchEffect } from "@vue/composition-api"
import SwProductListing from "@shopware-pwa/default-theme/components/SwProductListing"

export default {
  name: "SearchResultsPage",
  watchQuery: true,
  components: {
    SfLoader,
    SwProductListing,
  },
  setup(props, { root }) {
    const {
      search,
      currentSearchTerm,
      searchResult,
      loadingSearch,
      changePage,
    } = useProductSearch(root)

    const searchQuery = ref(currentSearchTerm.value)
    const startedSearching = ref(false)
    const { isOpen: isListView } = useUIState(root, "PRODUCT_LISTING_STATE")

    watchEffect(async () => {
      searchQuery.value = root.$route.query.query
      startedSearching.value = true
      if (
        searchQuery.value &&
        searchQuery.value !== currentSearchTerm.value &&
        !loadingSearch.value &&
        process.client
      ) {
        try {
          await search(searchQuery.value)
        } catch (e) {
          console.error("search: " + e)
        }
      }
    })

    return {
      searchResult,
      searchQuery,
      loadingSearch,
      startedSearching,
      changePage,
      isListView,
    }
  },
}
</script>
<style lang="scss">
@import "~@storefront-ui/vue/styles.scss";

.search-page {
  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
    padding: 0 var(--spacer-base);
  }

  .sf-loader {
    min-height: 50vh;
  }

  &__warning {
    padding-top: 20vh;
    min-height: 30vh;
  }

  &__main {
    @include for-desktop {
      flex: 1;
      padding: var(--spacer-lg) 0 0 0;
    }
  }

  h3 {
    text-align: center;
    margin-bottom: var(--spacer-base);
  }
}
</style>
