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
        <SfSelect v-model="sortBy" :size="sorting.length" class="sort-by">
          <SfSelectOption
            v-for="(option, key) in sorting"
            :key="key"
            :value="option"
            class="sort-by__option"
          >
            {{ getSortLabel(option) }}
          </SfSelectOption>
        </SfSelect>
      </div>
      <div class="navbar__counter">
        <span class="navbar__label desktop-only">Products found: </span>
        <strong class="desktop-only">{{ productsTotal }}</strong>
        <span class="navbar__label mobile-only">{{ productsTotal }} Items</span>
      </div>
      <div class="navbar__view">
        <span class="navbar__view-label desktop-only">View</span>
        <SwButton
          class="sf-button--pure"
          aria-label="Change to grid view"
          :aria-pressed="isGridView.toString()"
          @click="setGridView(true)"
        >
          <SfIcon
            class="navbar__view-icon"
            :color="isGridView ? '#1D1F22' : '#BEBFC4'"
            icon="tiles"
            size="12px"
          />
        </SwButton>
        <SwButton
          class="sf-button--pure"
          aria-label="Change to list view"
          :aria-pressed="!isGridView.toString()"
          @click="setGridView(false)"
        >
          <SfIcon
            class="navbar__view-icon"
            :color="!isGridView ? '#1D1F22' : '#BEBFC4'"
            icon="list"
            size="12px"
          />
        </SwButton>
      </div>
      <SfSidebar
        title="Filters"
        :visible="isFilterSidebarOpen"
        @close="isFilterSidebarOpen = false"
      >
        <div class="filters">
          <div v-for="filter in filters" :key="filter.name">
            <SfHeading class="filters__title" :level="4" :title="filter.name" />
            <div
              v-if="filter && filter.options && filter.options.length"
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
                :selected="
                  selectedFilters[filter.name] &&
                  !!selectedFilters[filter.name].find(
                    (propertyId) => propertyId === option.value
                  )
                "
                class="filters__item"
                :class="{ 'filters__item--color': option.color }"
                @change="
                  toggleFilter({
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
            <SwButton class="sf-button--full-width" @click="submitFilters()"
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
} from '@storefront-ui/vue'
import {
  useCategoryFilters,
  useProductListing,
} from '@shopware-pwa/composables'
import { getSortingLabel } from '@shopware-pwa/default-theme/helpers'
import SwButton from '@shopware-pwa/default-theme/components/atoms/SwButton'
const { availableFilters, availableSorting } = useCategoryFilters()

export default {
  name: 'CmsElementCategorySidebarFilter',
  components: {
    SwButton,
    SfIcon,
    SfSelect,
    SfFilter,
    SfHeading,
    SfSidebar,
  },
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    const {
      toggleFilter,
      changeSorting,
      selectedSorting,
      search,
      selectedFilters,
      resetFilters,
      productsTotal,
    } = useProductListing()

    return {
      toggleFilter,
      changeSorting,
      selectedSorting,
      search,
      selectedFilters,
      resetFilters,
      productsTotal,
    }
  },
  data() {
    return {
      isFilterSidebarOpen: false,
      sortBy: this.selectedSorting,
    }
  },
  computed: {
    filters() {
      return (availableFilters && availableFilters.value) || []
    },
    sorting() {
      return (availableSorting && availableSorting.value) || []
    },
    getMedia() {
      return this.content && this.content.data && this.content.data.media
    },
    imgUrl() {
      return this.getMedia && this.getMedia.url
    },
    alt() {
      return this.getMedia && this.getMedia.alt
    },
    title() {
      return this.getMedia && this.getMedia.title
    },
    lazyLoad() {
      return true
    },
    isGridView() {
      return !!this.$store.state.isGridView
    },
  },
  watch: {
    sortBy(newSorting, oldOne) {
      // prevent reloading on default sorting
      if (oldOne.name !== newSorting.name) {
        this.changeSorting(newSorting)
      }
    },
  },
  methods: {
    async clearAllFilters() {
      this.resetFilters()
      await this.search()
      this.isFilterSidebarOpen = false
    },
    async submitFilters() {
      await this.search()
      this.isFilterSidebarOpen = false
    },
    getSortLabel(sorting) {
      return getSortingLabel(sorting)
    },
    setGridView(flag) {
      this.$store.commit('SET_IS_GRID_VIEW', flag)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../settings.scss';

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
