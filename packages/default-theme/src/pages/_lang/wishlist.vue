<template>
  <div class="wishlistPage">
    <SfLoader :loading="isLoading">
      <div v-if="products.length">
        <SwProductCard
          v-for="product in products"
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
    </SfLoader>
  </div>
</template>

<script>
import { getProducts } from "@shopware-pwa/shopware-6-client"
import { getApplicationContext, useWishlist } from "@shopware-pwa/composables"
import SwProductCard from "@/components/SwProductCard"
import { SfHeading, SfImage, SfLoader } from "@storefront-ui/vue"
import { onMounted, ref, watch } from "@vue/composition-api"

export default {
  name: "Wishlist",
  components: {
    SwProductCard,
    SfHeading,
    SfImage,
    SfLoader,
  },
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
  },
  setup({}, { root }) {
    const { removeFromWishlist, items } = useWishlist(root)
    const { apiInstance } = getApplicationContext(root, "Wishlist")

    const products = ref([])
    const isLoading = ref(false)

    const loadProductsByItemIds = async (itemIds) => {
      isLoading.value = true
      try {
        const result = await getProducts(
          {
            configuration: {
              ids: items.value,
            },
          },
          apiInstance
        )
        if (result) {
          products.value = result
        }
      } catch (e) {
        console.error(e)
      }
      isLoading.value = false
    }

    onMounted(async () => {
      loadProductsByItemIds(items.value)
    })

    watch(items, (items, prev) => {
      if (items.length !== prev.length) {
        products.value = products.value.filter(({ id }) => items.includes(id))
      }
    })

    return {
      removeFromWishlist,
      products,
      isLoading,
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
