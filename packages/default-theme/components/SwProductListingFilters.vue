<template>
  <div
    class="cms-element-category-navigation-sidebar-filter sw-navbar navbar section"
  >
    <div class="sw-navbar navbar__main">
      <SwButton
        class="sf-button--text navbar__filters-button"
        @click="isFilterSidebarOpen = true"
      >
        <SfIcon size="14px" icon="filter" style="margin-right: 10px;" />
        Filters
      </SwButton>
      <div class="navbar__sort desktop-only">
        <span class="navbar__label">Sort by:</span>
        <SfSelect
          v-model="activeSorting"
          :size="sortings.length"
          class="sort-by"
        >
          <SfSelectOption
            v-for="(option, key) in sortings"
            :key="key"
            :value="option"
            class="sort-by__option"
          >
            {{ getSortingLabel(option) }}
          </SfSelectOption>
        </SfSelect>
      </div>
      <div class="navbar__counter">
        <span class="navbar__label desktop-only">Products found: </span>
        <strong class="desktop-only">{{ totalFound }}</strong>
        <span class="navbar__label mobile-only">{{ totalFound }} Items</span>
      </div>
      <div class="navbar__view">
        <span class="navbar__view-label desktop-only">View</span>
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
        v-if="filters"
        title="Filters"
        :visible="isFilterSidebarOpen"
        @close="isFilterSidebarOpen = false"
      >
        <div class="filters">
          <div v-for="filter in filters" :key="filter.name">
            <SfHeading class="filters__title" :level="4" :title="filter.name" />
            <div
              v-if="
                filter &&
                filter.type === 'entity' &&
                filter.options &&
                filter.options.length
              "
              :class="{
                'filters__filter--color':
                  filter.name && filter.name === 'color',
              }"
            >
              <SfFilter
                v-for="option in filter.options"
                :key="option.value"
                :label="option.label"
                :count="option.count"
                :color="option.color ? option.color : null"
                :selected="!!selectedFilters.find((id) => id === option.value)"
                class="filters__item"
                :class="{ 'filters__item--color': option.color }"
                @change="
                  $emit('toggle-filter-value', {
                    type: 'equals',
                    value: option.value,
                    field: filter.name,
                  })
                "
              />
            </div>
          </div>
        </div>
        <template #content-bottom>
          <div class="filters__buttons">
            <SwButton class="sf-button--full-width" @click="submitFilters"
              >Done</SwButton
            >
            <SwButton
              class="sf-button--full-width filters__button-clear"
              @click="clearAllFilters()"
              >Clear all</SwButton
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
import {
  useCategoryFilters,
  useProductListing,
  useUIState,
  useProductSearch,
} from "@shopware-pwa/composables"

import { getSearchResults } from "@shopware-pwa/shopware-6-client"
import { ref, computed, reactive } from "@vue/composition-api"
import { getSortingLabel } from "@shopware-pwa/default-theme/helpers"
import { getCategoryAvailableSorting } from "@shopware-pwa/helpers"
import SwButton from "@shopware-pwa/default-theme/components/atoms/SwButton"

export default {
  name: "SwProductListingFilters",
  components: {
    SwButton,
    SfIcon,
    SfSelect,
    SfFilter,
    SfHeading,
    SfSidebar,
  },
  props: {
    listing: {
      type: Object,
      default: () => ({}),
    },
    filters: {
      type: Array,
      default: () => [],
    },
    selectedFilters: {
      type: Array,
      default: () => [],
    },
  },
  setup({ listing }, { root, emit }) {
    const availableSorting = ref(listing.sortings)
    const selectedSortingField = ref(listing.sorting)
    const sortings = computed(() =>
      getCategoryAvailableSorting({ sorting: availableSorting.value })
    )
    const activeSorting = computed({
      get: () => sortings.value.find((sorting) => sorting.active),
      set: (sorting) => {
        emit("change-sorting", sorting)
      },
    })
    const { isOpen: isListView, switchState: switchToListView } = useUIState(
      root,
      "PRODUCT_LISTING_STATE"
    )

    return {
      getCategoryAvailableSorting,
      getSortingLabel,
      activeSorting,
      sortings,
      isListView,
      switchToListView,
    }
  },
  data() {
    return {
      isFilterSidebarOpen: false,
    }
  },
  computed: {
    totalFound() {
      return this.listing && this.listing.total
    },
    lazyLoad() {
      return true
    },
  },

  methods: {
    async clearAllFilters() {
      this.$emit("reset-filters")
      this.isFilterSidebarOpen = false
    },
    async submitFilters() {
      await this.$emit("submit-filters")
      this.isFilterSidebarOpen = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../cms/settings.scss";

.navbar {
  position: relative;
  display: flex;
  width: 100%;
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
    font-size: var(--font-sm);
    @include for-desktop {
      padding: var(--spacer-base) 0;
    }
  }
  &__title {
    padding: 0;
    font-size: var(--font-lg);
    line-height: 2.23;
  }
  &__filters-button {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    background: transparent;
    color: inherit;
    font-size: inherit;
    font-weight: 500;
    @include for-mobile {
      order: 1;
    }
    @include for-desktop {
      margin: 0 0 0 var(--spacer-xl);
      font-weight: 400;
      text-transform: none;
    }
    svg {
      fill: var(--c-dark);
      @include for-desktop {
        fill: var(--c-gray-variant);
      }
    }
    &:hover {
      color: var(--c-primary);
      svg {
        fill: var(--c-primary);
      }
    }
  }
  &__label {
    color: var(--c-gray-variant);
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
    &-icon {
      margin: 11px;
    }
    @include for-mobile {
      margin: 0;
      order: -1;
    }
  }
}

.sort-by {
  flex: unset;
  width: 190px;
  padding: 0 10px;
  --select-selected-padding: 0 var(--spacer-lg) 0 var(--spacer-2xs);
  --select-margin: 0;

  &--mobile {
    width: auto;
    padding-right: 0px;
  }
}

.filters {
  &__title {
    margin: calc(var(--spacer-base) * 3) 0 var(--spacer-base);
    text-align: left;
    &:first-child {
      margin: 0 0 var(--spacer-base) 0;
    }
  }
  &__filter {
    &--color {
      display: flex;
      flex-wrap: wrap;
    }
  }
  &__item {
    padding: var(--spacer-2xs) 0;
    &--color {
      width: auto;
      margin: var(--spacer-xs) var(--spacer-xs) var(--spacer-xs) 0;
    }
  }
  &__buttons {
    margin: var(--spacer-base) 0 calc(var(--spacer-base) * 3) 0;
    @include for-desktop {
      margin: var(--spacer-xl) 0 0 0;
    }
  }
  &__button-clear {
    color: #a3a5ad;
    margin-top: 10px;
    background-color: var(--c-light);
  }
}
</style>
