<template>
  <div class="search-page">
    <div class="search-page__main">
      <h3>search results for <strong>{{ currentQuery }}</strong>:</h3>

      <CmsElementProductListing v-if="cmsListingContent" :content="cmsListingContent"/>
    </div>
  </div>
</template>
<script>
import { SfButton, SfHeading, SfIcon } from '@storefront-ui/vue'
import { useProductListing, useProductSearch } from '@shopware-pwa/composables'
import {
  ref,
  getCurrentInstance,
  onMounted,
  onBeforeMount,
  computed,
} from '@vue/composition-api'

import CmsElementProductListing from '@shopware-pwa/default-theme/cms/elements/CmsElementProductListing';

export default {
  name: 'SuccessPage',
  components: {
    SfHeading,
    SfButton,
    SfIcon,
    CmsElementProductListing
  },
  setup() {
    const vm = getCurrentInstance()
    const searchQuery = computed(() => vm.$route.query.query)
    const searchResultListing = ref(null);
    const cmsListingContent = computed(() => searchResultListing.value && ({data: { listing: searchResultListing.value} }))
    const { search, currentQuery } = useProductSearch()

    onBeforeMount(async () => {
      searchResultListing.value = await search(searchQuery.value);
    })

    return {
      cmsListingContent,
      searchResultListing,
      currentQuery
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

  &__main {
    @include for-desktop {
      flex: 1;
      padding: var(--spacer-lg) 0 0 0;
    }

    h3 {
      text-align: center;
      margin-bottom: var(--spacer-base);
    }
  }
  
}
</style>
