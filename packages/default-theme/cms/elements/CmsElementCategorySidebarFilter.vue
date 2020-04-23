<template>
  <div
    class="cms-element-category-navigation-sidebar-filter sw-navbar navbar section"
  >
    <div class="sw-navbar navbar__main">
      <SfButton
        class="sf-button--text navbar__filters-button"
        @click="isFilterSidebarOpen = true"
      >
        <SfIcon size="1.5rem" icon="filter" style="margin-right: 10px;" />
        Filters
      </SfButton>
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
      <SfSelect v-model="sortBy" class="sort-by sort-by--mobile mobile-only">
        <SfSelectOption
          v-for="(option, key) in sorting"
          :key="key"
          :value="option"
          class="sort-by__option"
        >
          {{ getSortLabel(option) }}
        </SfSelectOption>
      </SfSelect>
      <div class="navbar__view">
        <span class="navbar__view-label desktop-only">View</span>
        <SfIcon
          class="navbar__view-icon"
          :color="isGridView ? '#1D1F22' : '#BEBFC4'"
          icon="tiles"
          size="2rem"
          role="button"
          aria-label="Change to grid view"
          :aria-pressed="isGridView"
          @click="isGridView = true"
        />
        <SfIcon
          class="navbar__view-icon"
          :color="!isGridView ? '#1D1F22' : '#BEBFC4'"
          icon="list"
          size="2rem"
          role="button"
          aria-label="Change to list view"
          :aria-pressed="!isGridView"
          @click="isGridView = false"
        />
      </div>
      <SfSidebar
        title="Filters"
        :visible="isFilterSidebarOpen"
        @close="isFilterSidebarOpen = false"
      >
        <div class="filters">
          <div v-for="filter in filters" :key="filter.name">
            <SfHeading class="filters__title" :level="4" :title="filter.name"/>
            <div v-if="filter && filter.options && filter.options.length">
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
                @change.native="
                  toggleFilter({
                    type: 'equals',
                    value: option.value,
                    field: filter.name,
                  })
                "
              />
            </div>
          </div>

          <div class="filters__buttons">
            <SfButton class="sf-button--full-width" @click="submitFilters()"
              >Done</SfButton
            >
            <SfButton
              class="sf-button--full-width filters__button-clear"
              @click="clearAllFilters()"
              >Clear all</SfButton
            >
          </div>
        </div>
      </SfSidebar>
    </div>
  </div>
</template>

<script>
import {
  SfButton,
  SfIcon,
  SfSelect,
  SfFilter,
  SfHeading,
  SfSidebar,
  SfProductOption,
} from '@storefront-ui/vue'
import {
  useCategoryFilters,
  useProductListing,
} from '@shopware-pwa/composables'
import { getSortingLabel } from '@shopware-pwa/helpers'
const { availableFilters, availableSorting } = useCategoryFilters()

export default {
  components: {
    SfButton,
    SfIcon,
    SfSelect,
    SfFilter,
    SfHeading,
    SfSidebar,
    SfProductOption,
  },
  name: 'CmsElementCategorySidebarFilter',
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
      isGridView: true,
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
  },
}
</script>

<style lang="scss" scoped>
@import '../settings.scss';

.navbar {
  position: relative;
  display: flex;
  width: 100%;
  @include for-desktop {
    border-top: 1px solid var(--c-light);
    border-bottom: 1px solid var(--c-light);
  }
  &::after {
    position: absolute;
    bottom: 0;
    left: var(--spacer-base);
    width: calc(100% - (var(--spacer-base) * -2));
    height: 1px;
    background-color: var(--c-light);
    content: '';
    @include for-desktop {
      content: none;
    }
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
    padding: var(--spacer-sm) 0;
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
      margin-left: 10px;
    }
  }
}

.section {
  padding-left: var(--spacer-base);
  padding-right: var(--spacer-base);
  @include for-desktop {
    padding-left: 0;
    padding-right: 0;
  }
}
.sort-by {
  flex: unset;
  width: 190px;
  padding: 0 10px;
  font-size: inherit;
  &__option {
    padding: 10px;
    font-size: inherit;
  }

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
  &__item {
    padding: var(--spacer-2xs) 0;
    &--color {
      margin: 0 var(--spacer-xs);
    }
  }
  &__buttons {
    margin: calc(var(--spacer-base) * 3) 0 0 0;
  }
  &__button-clear {
    color: #a3a5ad;
    margin-top: 10px;
    background-color: var(--c-light);
  }
}
</style>
