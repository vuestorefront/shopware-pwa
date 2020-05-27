<template>
  <div class="search-page">
    <h3 class="search-page__warning" v-if="!searchQuery">
      You didn't provide any term to be found
    </h3>
    <SfLoader :loading="isLoading" v-else>
      <div class="search-page__main" v-if="searchResultListing">
        <h3>search results for <strong>{{ currentQuery }}</strong>:</h3>
        <SwSearchProductListing :product-listing="searchResultListing" :is-search-result-page="true"/>
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
  onBeforeMount,
  computed,
} from '@vue/composition-api'

import SwSearchProductListing from '@shopware-pwa/default-theme/components/SwSearchProductListing';

export default {
  name: 'SearchResultsPage',
  components: {
    SfHeading,
    SfButton,
    SfIcon,
    SfLoader,
    SwSearchProductListing
  },
  setup() {
    const vm = getCurrentInstance()
    const searchQuery = computed(() => vm.$route.query.query)
    const searchResultListing = ref(null);
    const isLoading = ref(true);
    const { search, currentQuery } = useProductSearch()

    onBeforeMount(async () => {
      searchResultListing.value = searchQuery.value && await search(searchQuery.value);
      isLoading.value = false;
    })

    return {
      searchResultListing,
      currentQuery,
      isLoading,
      searchQuery
    }
  }
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
