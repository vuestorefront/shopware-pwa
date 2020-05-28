<template>
  <div class="search-page" :key="$route.fullPath">
    <h3 class="search-page__warning" v-if="!searchQuery && startedSearching">
      You didn't provide any term to be found
    </h3>
    <SfLoader :loading="loadingSearch" v-else>
      <div class="search-page__main" v-if="searchResult">
        <h3>
          search results for <strong>{{ searchQuery }}</strong> :
        </h3>
        <SwSearchProductListing
          :product-listing="searchResult"
          :is-search-result-page="true"
        />
      </div>
    </SfLoader>
  </div>
</template>
<script>
import { SfButton, SfHeading, SfIcon, SfLoader } from '@storefront-ui/vue'
import { useProductSearch } from '@shopware-pwa/composables'
import {
  ref,
  getCurrentInstance,
  computed,
  watchEffect,
} from '@vue/composition-api'
import SwSearchProductListing from '@shopware-pwa/default-theme/components/SwSearchProductListing'

export default {
  name: 'SearchResultsPage',
  watchQuery: true,
  components: {
    SfHeading,
    SfButton,
    SfIcon,
    SfLoader,
    SwSearchProductListing,
  },
  setup() {
    const vm = getCurrentInstance()
    const {
      search,
      currentSearchTerm,
      searchResult,
      loadingSearch,
    } = useProductSearch()

    const searchQuery = ref(currentSearchTerm.value)
    const startedSearching = ref(false)

    watchEffect(async () => {
      searchQuery.value = vm.$route.query.query
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
          console.error('search: ' + e)
        }
      }
    })

    return {
      searchResult,
      searchQuery,
      loadingSearch,
      startedSearching,
    }
  },
}
</script>
<style lang="scss">
@import '~@storefront-ui/vue/styles.scss';

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
