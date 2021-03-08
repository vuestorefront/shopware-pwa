<template>
  <div>
    <SfBottomModal
      :is-open="true"
      class="sw-bottom-more-actions"
      @click:close="$emit('close')"
    >
      <template>
        <div class="sw-bottom-more-actions__title">
          {{ headline }}
        </div>
      </template>

      <div class="content">
        <div v-if="!contentChanged" class="content-list">
          <SfBottomNavigationItem
            v-if="availableCurrencies.length > 1"
            label="Currency"
          >
            <template #icon>
              <SfIcon icon="credits" size="20px" @click="changeCurrency" />
            </template>
          </SfBottomNavigationItem>

          <SfBottomNavigationItem
            v-if="availableDomains.length > 1"
            label="Language"
          >
            <template #icon>
              <SfIcon icon="marker" size="20px" @click="changeLanguage" />
            </template>
          </SfBottomNavigationItem>

          <SfBottomNavigationItem label="Wishlist">
            <template #icon>
              <SfIcon icon="heart" size="20px" @click="goToWishlist" />
            </template>
          </SfBottomNavigationItem>
        </div>

        <div v-if="showLanguage">
          <SfList>
            <SfListItem
              v-for="domain in availableDomains"
              :key="domain.domainId"
              :value="domain.domainId"
            >
              <SfMenuItem
                :label="domain.languageLabel"
                @click="changeDomain(domain.domainId), $emit('close')"
              />
            </SfListItem>
          </SfList>
        </div>

        <div v-if="showCurrency">
          <SfList>
            <SfListItem
              v-for="currencyItem in availableCurrencies"
              :key="currencyItem.id"
              :value="currencyItem.id"
            >
              <SfMenuItem
                :label="`${currencyItem.symbol} - ${currencyItem.translated.name}`"
                @click="setCurrency(currencyItem), $emit('close')"
              />
            </SfListItem>
          </SfList>
        </div>
      </div>
    </SfBottomModal>
  </div>
</template>

<script>
import { SfBottomModal, SfIcon, SfList, SfMenuItem } from "@storefront-ui/vue"
import { useDomains } from "@/logic"
import { useCurrency } from "@shopware-pwa/composables"
import { onMounted } from "@vue/composition-api"
import { PAGE_WISHLIST } from "@/helpers/pages"

export default {
  name: "SwBottomMoreActions",
  components: {
    SfBottomModal,
    SfIcon,
    SfList,
    SfMenuItem,
  },
  data() {
    return {
      headline: "",
      contentChanged: false,
      showCurrency: false,
      showLanguage: false,
    }
  },
  setup(props, { root }) {
    const { availableDomains, changeDomain } = useDomains(root)
    const {
      setCurrency,
      loadAvailableCurrencies,
      availableCurrencies,
    } = useCurrency(root)

    // TODO: loaded on mounted only untill fixed issue: https://github.com/DivanteLtd/storefront-ui/issues/1097
    onMounted(async () => {
      await loadAvailableCurrencies()
    })

    return {
      availableDomains,
      changeDomain,
      availableCurrencies,
      setCurrency,
    }
  },
  computed: {},
  watch: {
    $route() {
      this.$emit("close")
    },
  },
  methods: {
    changeLanguage() {
      this.headline = this.$t("Choose Language")
      this.showLanguage = true
      this.contentChanged = true
    },

    changeCurrency() {
      this.headline = this.$t("Choose Currency")
      this.showCurrency = true
      this.contentChanged = true
    },

    goToWishlist() {
      this.$router.push(this.$routing.getUrl(PAGE_WISHLIST))
    },
  },
}
</script>

<style lang="scss" scoped>
.sw-bottom-more-actions {
  flex-wrap: wrap;

  ::v-deep .sf-bottom-navigation-item__label {
    margin-top: var(--spacer-xs);
  }
  ::v-deep .sf-menu-item__label {
    width: 100%;
  }

  .content {
    --menu-item-mobile-nav-icon-display: none;

    padding: 0 var(--spacer-xs) var(--spacer-xs);

    &-list {
      display: flex;
      justify-content: flex-start;
    }

    .sf-bottom-navigation-item {
      margin-left: var(--spacer-xs);
      margin-right: var(--spacer-xs);
    }
  }

  &__title {
    font-weight: bold;
    padding-top: var(--spacer-xs);
    text-align: center;
  }
}
</style>
