<template>
  <div class="wishlistPage">
    <div v-if="productsList.length">
      <SwProductCard
        v-for="product in productIds"
        :key="product.id"
        class=""
        :product="product"
      />
    </div>

    <div v-else class="no-results">
      <SfImage class="image" :src="require('@/assets/hearts.svg')" />

      <SfHeading
        :title="$t('No favourites yet')"
        :level="2"
        class="main-headline"
      />
      <SfHeading
        :title="$t('Tap any heart next to a product to favorite.')"
        :level="4"
      />
      <SfHeading :title="$t('We’ll save them for you here!')" :level="4" />
    </div>
  </div>
</template>

<script>
import { getProduct } from "@shopware-pwa/shopware-6-client"
import { getApplicationContext, useWishlist } from "@shopware-pwa/composables"
import SwProductCard from "@/components/SwProductCard"
import { SfHeading, SfImage } from "@storefront-ui/vue"
import { result } from "lodash"
import { computed, onMounted } from "@vue/composition-api"

export default {
  name: "Wishlist",
  components: {
    getProduct,
    SwProductCard,
    SfHeading,
    SfImage,
  },
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      productIds: [],
      products: [],
    }
  },

  setup(product, { root }) {
    const { removeFromWishlist, getFromStorage } = useWishlist(root, product)
    const { apiInstance } = getApplicationContext(root, "Wishlist")

    this.productIds = getFromStorage()

    console.log(this.productIds)

    onMounted(async () => {
      try {
        const result = await getProduct(this.productIds[0], null, apiInstance) //get first item from wishlist array only for tests
        this.product.value = result
        console.log(result)
      } catch (e) {}
      console.error(e)
    })

    return {
      removeFromWishlist,
      getFromStorage,
    }
  },
}
</script>

<style lang="scss" scoped>
.wishlistPage {
  .no-results {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .main-headline {
      --heading-title-color: var(--c-primary);
      margin-bottom: var(--spacer-xl);
    }

    .image {
      margin-bottom: var(--spacer-2xl);
      margin-top: var(--spacer-2xl);
    }
  }
}
</style>
