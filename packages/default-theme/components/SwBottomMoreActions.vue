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
          <SfBottomNavigationItem label="Currency">
            <template #icon>
              <SfIcon icon="credits" size="20px" @click="changeCurrency" />
            </template>
          </SfBottomNavigationItem>

          <SfBottomNavigationItem label="Language">
            <template #icon>
              <SfIcon icon="marker" size="20px" @click="changeLanguage" />
            </template>
          </SfBottomNavigationItem>
        </div>

        <div v-if="showLanguage">
          <SfList>
            <SfListItem
              v-for="language in availableLanguages"
              :key="language.code"
              :value="language.code"
            >
              <SfMenuItem
                :label="language.name"
                @click="changeLocale(language.code), $emit('close')"
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
import { useLocales } from "@/logic/useLocales"
import { useCurrency } from "@shopware-pwa/composables"
import { onMounted } from "@vue/composition-api"

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
    const { availableLanguages, currentLocale, changeLocale } = useLocales(root)
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
      availableLanguages,
      changeLocale,
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
      this.headline = "Choose Language"
      this.showLanguage = true
      this.contentChanged = true
    },
    changeCurrency() {
      this.headline = "Choose Currency"
      this.showCurrency = true
      this.contentChanged = true
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
