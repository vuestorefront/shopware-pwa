<template>
  <div class="search-page" :key="$route.fullPath">
    <h3 class="search-page__warning" v-if="!searchQuery && startedSearching">
      You didn't provide any term to be found
    </h3>
    <SfLoader :loading="loadingSearch || !startedSearching" v-else>
      <div class="search-page__main" v-if="searchResult">
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
import { SfButton, SfHeading, SfIcon, SfLoader } from "@storefront-ui/vue"
import { useProductSearch, useUIState } from "@shopware-pwa/composables"

import {
  ref,
  getCurrentInstance,
  computed,
  watchEffect,
} from "@vue/composition-api"
import SwProductListing from "@shopware-pwa/default-theme/components/SwProductListing"

export default {
  name: "SearchResultsPage",
  watchQuery: true,
  components: {
    SfHeading,
    SfButton,
    SfIcon,
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
