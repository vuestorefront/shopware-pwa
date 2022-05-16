<template>
  <div
    class="
      cms-element-category-navigation-sidebar-filter
      sw-navbar
      navbar
      section
    "
  >
    <div class="sw-navbar navbar__main">
      <SwButton
        v-if="getAvailableFilters.length"
        class="sf-button--text navbar__filters-button"
        @click="openFiltersSidebar"
      >
        <SfIcon size="14px" icon="filter" style="margin-right: 10px" />{{
          $t("Filters")
        }}
      </SwButton>
      <div class="navbar__sort desktop-only" v-if="isMounted && getSortingOrders.length">
        <span class="navbar__label">{{ $t("Sort by") }}:</span>
        <SfSelect v-model="currentSortingOrder" class="sort-by">
          <SfSelectOption
            v-for="option in getSortingOrders"
            :key="option.key"
            :value="option.key"
            class="sort-by__option"
            >{{ $t(getTranslatedProperty(option, "label")) }}</SfSelectOption
          >
        </SfSelect>
      </div>
      <div class="navbar__counter">
        <span class="navbar__label desktop-only"
          >{{ $t("Products found") }}:</span
        >
        <strong class="desktop-only">{{ getTotal }}</strong>
        <span class="navbar__label smartphone-only"
          >{{ getTotal }} {{ $t("Items") }}:</span
        >
      </div>
      <div class="navbar__view">
        <span class="navbar__view-label desktop-only">{{ $t("View") }}</span>
        <SwButton
          class="sf-button--pure"
          aria-label="Change to grid view"
          :aria-pressed="!isListView.toString()"
          @click="switchToListView(false)"
        >
          <SfIcon
            class="navbar__view-icon"
            :color="!isListView ? '#1D1F22' : '#BEBFC4'"
            icon="tiles"
            size="12px"
          />
        </SwButton>
        <SwButton
          class="sf-button--pure"
          aria-label="Change to list view"
          :aria-pressed="isListView.toString()"
          @click="switchToListView(true)"
        >
          <SfIcon
            class="navbar__view-icon"
            :color="isListView ? '#1D1F22' : '#BEBFC4'"
            icon="list"
            size="12px"
          />
        </SwButton>
      </div>
      <SfSidebar
        :title="$t('Filters')"
        position="left"
        :visible="isFilterSidebarOpen"
        class="filters-sidebar"
        @close="closeFiltersSidebar"
      >
        <div class="filters">
          <SwProductListingFilter
            class="filters__filter"
            :filter="filter"
            v-for="filter in getAvailableFilters"
            :current-filters="sidebarSelectedFilters"
            :selected-filters="sidebarSelectedFilters[filter.code]"
            :selected-entity-filters="{}"
            :key="filter.name"
            @toggle-filter-value="toggleFilterValue"
          />
        </div>
        <template #content-bottom>
          <div class="filters__buttons">
            <SwButton
              class="sf-button--full-width filters__button-clear"
              @click="clearAllFilters()"
              >{{ $t("Clear all") }}</SwButton
            >
          </div>
        </template>
      </SfSidebar>
    </div>
  </div>
</template>

<script>
import {
  SfIcon,
  SfSelect,
  SfFilter,
  SfHeading,
  SfSidebar,
} from "@storefront-ui/vue"
import { computed, onMounted, ref } from "@vue/composition-api"

import { useUIState, useListing } from "@shopware-pwa/composables"
import SwButton from "@/components/atoms/SwButton.vue"
import SwProductListingFilter from "@/components/listing/SwProductListingFilter.vue"
import {
  toggleSearchFilter,
  getTranslatedProperty,
} from "@shopware-pwa/helpers"

export default {
  name: "SwProductListingFilters",
  components: {
    SwButton,
    SfIcon,
    SfSelect,
    SfFilter,
    SfHeading,
    SfSidebar,
    SwProductListingFilter,
  },
  props: {
    listingType: {
      type: String,
      default: "categoryListing",
    },
  },
  setup(props, { root }) {
    const {
      getCurrentSortingOrder,
      changeCurrentSortingOrder,
      getSortingOrders,
      getAvailableFilters,
      search,
      getCurrentFilters,
      getTotal,
    } = useListing({ listingType: props.listingType })

    const { isOpen: isListView, switchState: switchToListView } = useUIState({
      stateName: "PRODUCT_LISTING_STATE",
    })

    const isMounted = ref(false)
    onMounted(() => {
      isMounted.value = true
    })

    const sidebarSelectedFilters = ref({})
    const initSidebarFilters = () => {
      sidebarSelectedFilters.value =
        JSON.parse(JSON.stringify(getCurrentFilters.value)) || {}
    }

    const currentSortingOrder = computed({
      get: () => getCurrentSortingOrder.value,
      set: (order) => changeCurrentSortingOrder(order),
    })

    return {
      search,
      isListView,
      switchToListView,
      getAvailableFilters,
      getSortingOrders,
      currentSortingOrder,
      initSidebarFilters,
      sidebarSelectedFilters,
      getTotal,
      getCurrentFilters,
      isMounted,
      getTranslatedProperty,
    }
  },
  data() {
    return {
      isFilterSidebarOpen: false,
    }
  },
  methods: {
    async toggleFilterValue(filter) {
      this.sidebarSelectedFilters = toggleSearchFilter(
        this.sidebarSelectedFilters,
        filter
      )

      this.search(this.sidebarSelectedFilters)
    },
    async clearAllFilters() {
      this.closeFiltersSidebar()
      this.search({
        query: this.getCurrentFilters && this.getCurrentFilters.search,
      })
    },
    openFiltersSidebar() {
      this.isFilterSidebarOpen = true
      this.initSidebarFilters()
    },
    closeFiltersSidebar() {
      this.isFilterSidebarOpen = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/cms/settings.scss";

.navbar {
  position: relative;
  display: flex;
  border-bottom: 1px solid var(--c-light);

  @include for-desktop {
    margin-top: 20px;
    border-top: 1px solid var(--c-light);
  }

  &__aside {
    display: flex;
    align-items: center;
    flex: 0 0 15%;
    padding: var(--spacer-base) var(--spacer-xl);
    border-right: 1px solid var(--c-light);
  }
  &__main {
    flex: 1;
    display: flex;
    align-items: center;
    padding: var(--spacer-sm);
    font-size: var(--font-size--sm);
    @include for-desktop {
      padding: var(--spacer-base) 0;
    }
  }
  &__title {
    padding: 0;
    font-size: var(--font-size--lg);
    line-height: 2.23;
  }
  &__filters-button {
    display: flex;
    align-items: center;
    --button-font-size: var(--font-size--base);
    --button-text-decoration: none;
    --button-color: var(--c-link);
    --button-font-weight: var(--font-weight--normal);
    margin: 0 var(--spacer-xl);
    @include for-mobile {
      --button-font-weight: var(--font-weight--medium);
      order: 2;
      margin: 0;
    }
    svg {
      fill: var(--c-text-muted);
      transition: fill 150ms ease;
    }
  }
  &__label {
    font-family: var(--font-family--secondary);
    font-weight: var(--font-weight--normal);
    font-size: var(--font-size--base);
    color: var(--c-text-muted);
    @include for-desktop {
      color: var(--c-link);
      margin: 0 var(--spacer-2xs) 0 0;
    }
  }
  &__sort {
    display: flex;
    align-items: center;
    margin-left: var(--spacer-xl);
    margin-right: auto;
  }
  &__counter {
    margin: auto;
    @include for-desktop {
      margin-right: 20px;
    }
  }
  &__view {
    display: flex;
    align-items: center;
    margin: 0 var(--spacer-xl);
    font-family: var(--font-family--secondary);
    font-weight: var(--font-weight--normal);
    font-size: var(--font-size--base);
    color: var(--c-link);
    &-icon {
      margin: 11px;
    }
    @include for-mobile {
      margin: 0;
      order: -1;
      color: var(--c-text-muted);
    }
  }
}

.sort-by {
  --select-width: 150px;
  --select-padding: 0;
  --select-height: auto;
  --select-selected-padding: 0 var(--spacer-lg) 0 var(--spacer-2xs);
  --select-margin: 0;
  --select-option-font-size: var(--font-size-sm);
  --select-error-message-height: 0;
  ::v-deep .sf-select__dropdown {
    font-size: var(--font-size-base);
    font-family: var(--font-family--secondary);
    font-weight: var(--font-weight--light);
    margin: 2px 0 0;
    padding: 4px;
  }
  ::v-deep .sf-select__placeholder {
    --select-option-font-size: var(--font-size-sm);
  }
}

.filters {
  &__filter {
    padding: 1rem 0;
  }
}
.filters-sidebar {
  --sidebar-z-index: 4;
  --overlay-z-index: 4;
}
</style>
