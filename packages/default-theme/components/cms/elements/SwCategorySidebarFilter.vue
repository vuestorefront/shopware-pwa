<template>
  <div class="navbar">
    <div class="navbar__main">
      <SfButton
        class="navbar__filters-button"
        @click="isFilterSidebarOpen = true"
      >
        <SfIcon size="15px" style="margin-right: 10px;">
          <svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
            <g clip-icon="url(#clip0)">
              <path
                d="m2.461 6.9416e-6h-0.1786c-1.113 0.0021094-2.0151 0.90421-2.0173 2.018v0.17859c-0.001406 0.53649 0.21024 1.0512 0.58851 1.4316 0.37829 0.38039 0.89226 0.59414 1.4287 0.59555h0.1786c0.53859 0.0014 1.0547-0.21165 1.4358-0.59204 0.38039-0.38039 0.59344-0.89719 0.59203-1.4351v-0.17859c-0.0014-0.53649-0.21585-1.0505-0.59554-1.4295-0.3804-0.37829-0.89581-0.58991-1.4323-0.58851zm1.452 2.1965c0.00141 0.38531-0.15047 0.75585-0.42329 1.028-0.27281 0.27281-0.64265 0.42539-1.0287 0.42329h-0.1786c-0.3839-7.1e-4 -0.75164-0.15399-1.0223-0.4261-0.27-0.27281-0.42117-0.64125-0.41906-1.0252v-0.1786c7.03e-4 -0.79594 0.64616-1.4407 1.4414-1.4421h0.1786c0.3839-0.00211 0.75305 0.14906 1.0252 0.41976 0.27281 0.27 0.4261 0.63844 0.4268 1.0223v0.1786z"
              />
              <path
                d="m9.0959 0h-0.19265c-1.1109 0.005625-2.0095 0.90634-2.0117 2.018v0.17859c-0.00281 1.1145 0.89719 2.0214 2.0117 2.0272h0.19265c1.1145-0.00562 2.0144-0.91265 2.0117-2.0272v-0.17859c-0.0021-1.1116-0.9007-2.0124-2.0117-2.018zm1.4421 2.1965h-7e-4c0.0022 0.3839-0.149 0.75235-0.4197 1.0252-0.27001 0.27211-0.63846 0.4254-1.0217 0.4261h-0.19265c-0.79524-0.00141-1.4407-0.64616-1.4414-1.4421v-0.17859c-0.00211-0.3839 0.14907-0.75235 0.41976-1.0252 0.27-0.27211 0.63845-0.4254 1.0216-0.4261h0.19265c0.79524 0.001406 1.4407 0.64616 1.4414 1.4421l7e-4 0.17859z"
              />
              <path
                d="m15.718 6.9631e-6h-0.1786c-0.5364-0.0014063-1.0518 0.21024-1.4322 0.58851-0.3797 0.37899-0.5942 0.89296-0.5956 1.4295v0.17859c-0.0014 0.5379 0.2117 1.0547 0.5921 1.4351 0.3811 0.38039 0.8972 0.59344 1.4358 0.59204h0.1786c0.5364-0.00141 1.0504-0.21516 1.4287-0.59555s0.5899-0.89509 0.5885-1.4316v-0.17859c-0.0021-1.1138-0.9042-2.0158-2.0172-2.018h-1e-4zm1.4414 2.1965c0.0022 0.3839-0.149 0.75234-0.419 1.0252-0.2707 0.27211-0.6385 0.42539-1.0224 0.4261h-0.1786c-0.386 0.00211-0.7558-0.15047-1.0286-0.42329-0.2728-0.27211-0.4247-0.64265-0.4233-1.028v-0.1786c7e-4 -0.3839 0.154-0.75234 0.4268-1.0223 0.2721-0.2707 0.6412-0.42188 1.0251-0.41976h0.1786c0.7953 0.001406 1.4407 0.64616 1.4414 1.4421v0.1786z"
              />
              <path
                d="m2.461 6.8921h-0.17859c-1.1138 0.00211-2.0165 0.90562-2.0173 2.0194v0.17859c0.002109 1.1138 0.90421 2.0158 2.0173 2.018h0.17859c0.53719 0.0014 1.0526-0.2103 1.433-0.5892 0.3804-0.379 0.59415-0.89369 0.59485-1.4302v-0.1786c-0.00141-0.53649-0.21586-1.0505-0.59555-1.4294-0.38039-0.37829-0.89579-0.58991-1.4323-0.58851v-7e-5zm1.452 2.1965c-0.0014 0.79524-0.64616 1.4407-1.4421 1.4414h-0.1786c-0.3839 0.0021-0.75305-0.149-1.0252-0.419-0.27211-0.27073-0.4254-0.63847-0.4261-1.0224v-0.1786c7.03e-4 -0.79594 0.64617-1.4407 1.4414-1.4421h0.17859c0.38461-0.00211 0.75375 0.14906 1.0259 0.42046 0.2728 0.2707 0.42609 0.63915 0.42609 1.023v0.17719z"
              />
              <path
                d="m9.0959 6.8921h-0.19266c-1.1116 0.00562-2.0102 0.90774-2.0117 2.0194v0.17859c0.00211 1.1116 0.9007 2.0124 2.0117 2.018h0.19266c1.1117-0.0056 2.0103-0.9078 2.0117-2.0194v-0.17859c-0.0021-1.1116-0.9007-2.0124-2.0117-2.018zm1.4421 2.1965h-7e-4c0 0.79664-0.64542 1.4421-1.4414 1.4435h-0.19266c-0.79524-0.0014-1.4407-0.64612-1.4414-1.4421v-0.17859c0-0.79664 0.64546-1.4421 1.4414-1.4435h0.19266c0.79524 0.00141 1.4407 0.64616 1.4414 1.4421l7e-4 0.1786z"
              />
              <path
                d="m15.717 6.8922h-0.1786c-0.5371-0.0014-1.0525 0.21024-1.4329 0.58921-0.3804 0.37899-0.5942 0.89367-0.5949 1.4302v0.17859c0.0014 0.53649 0.2159 1.0505 0.5956 1.4295 0.3804 0.3783 0.8958 0.5899 1.4322 0.5885h0.1786c1.1138-0.0021 2.0166-0.9056 2.0173-2.0194v-0.17859c-0.0021-1.1138-0.9042-2.0158-2.0173-2.018v7e-5zm1.4414 2.1965c-7e-4 0.79524-0.6461 1.4407-1.4414 1.4414h-0.1786c-0.3839 0.0021-0.753-0.1491-1.0251-0.4191-0.2728-0.27065-0.4261-0.63839-0.4268-1.0223v-0.17859c0.0014-0.79594 0.6462-1.4407 1.4421-1.4421h0.1786c0.3839-0.00211 0.753 0.14906 1.0259 0.42046 0.2721 0.27071 0.4253 0.63915 0.4253 1.023v0.17719z"
              />
              <path
                d="m9.0959 13.786h-0.19266c-1.1109 5e-3 -2.0095 0.9064-2.0117 2.0173v0.1786c0.00211 1.1116 0.9007 2.0124 2.0117 2.018h0.19266c1.111-0.0057 2.0096-0.9064 2.0117-2.018v-0.1786c-0.0021-1.1109-0.9007-2.0124-2.0117-2.0173zm1.4421 2.1966l-7e-4 -7e-4c-7e-4 0.7959-0.64612 1.4407-1.4414 1.4421h-0.19266c-0.79524-0.0014-1.4407-0.6462-1.4414-1.4421v-0.1786c7e-4 -0.7953 0.64616-1.4407 1.4414-1.4414h0.19266c0.79524 7e-4 1.4407 0.6461 1.4414 1.4414l7e-4 0.1793z"
              />
            </g>
          </svg>
        </SfIcon>
        Filters
      </SfButton>
      <div class="navbar__sort">
        <span class="navbar__label">Sort by:</span>
        <!-- <SfSelect class="sort-by" v-model="sortBy">
          <SfSelectOption
          v-for="option in sortByOptions"
          :key="option.value"
          :value="option.value"
          class="sort-by__option"
          >{{ option.label }}</SfSelectOption
          >
          </SfSelect> -->
      </div>
      <div class="navbar__counter">
        <span class="navbar__label desktop-only">Products found: </span>
        <strong class="desktop-only">280</strong>
        <span class="navbar__label mobile-only">280 Items</span>
      </div>
      <SfButton
        class="navbar__filters-button mobile-only"
        @click="isFilterSidebarOpen = true"
      >
        Sort by
        <SfIcon size="15px" style="margin-left: 10px;">
          <svg viewBox="0 0 12 16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.32809 15.2897L12 11.7644V12.2892L8.13547 16L4.27094 12.2892V11.7644L7.94285 15.2897V6.83165H8.32809L8.32809 15.2897ZM3.67191 0.710288L0 4.23556V3.71082L3.86453 0L7.72906 3.71082V4.23556L4.05715 0.710288V9.16835H3.67191L3.67191 0.710288Z"
            />
          </svg>
        </SfIcon>
      </SfButton>
      <SfSidebar
        :visible="isFilterSidebarOpen"
        @close="isFilterSidebarOpen = false"
      >
        <div class="filters">
          <div v-for="filter in filters" :key="filter.name">
            <h3 class="filters__title">{{ filter.name }}</h3>
            <SfFilter
              v-for="option in filter.options"
              :key="option.value"
              :label="option.label"
              :count="option.count"
              :color="option.color"
              class="filters__item"
            />
          </div>

          <div class="filters__buttons">
            <SfButton
              class="sf-button--full-width"
              @click="isFilterSidebarOpen = false"
              >Done</SfButton
            >
            <SfButton
              class="sf-button--full-width filters__button-clear"
              @click="clearAllFilters"
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
  SfSidebar
} from '@storefront-ui/vue'
import { useCategoryFilters } from '@shopware-pwa/composables'
const { availableFilters } = useCategoryFilters()

export default {
  components: {
    SfButton,
    SfIcon,
    SfSelect,
    SfFilter,
    SfSidebar
  },
  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      sortBy: null,
      isFilterSidebarOpen: false
    }
  },
  computed: {
    filters() {
      return (availableFilters && availableFilters.value) || []
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
    sortByOptions() {
      return [
        {
          value: 'latest',
          label: 'Latest'
        },
        {
          value: 'price-up',
          label: 'Price from low to high'
        },
        {
          value: 'price-down',
          label: 'Price from high to low'
        }
      ]
    }
  },
  methods: {
    clearAllFilters() {}
  }
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';
@import '~@storefront-ui/shared/styles/helpers/visibility';
@import '~@storefront-ui/shared/styles/variables';

@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}

.navbar {
  margin-left: 0 !important;
  display: flex;
  @include for-desktop {
    border-top: 1px solid $c-light;
    border-bottom: 1px solid $c-light;
  }
  &::after {
    position: absolute;
    bottom: 0;
    left: $spacer-big;
    width: calc(100% - (#{$spacer-big} * 2));
    height: 1px;
    background-color: $c-light;
    content: '';
    @include for-desktop {
      content: none;
    }
  }

  &__main {
    margin-left: 20px;
    flex: 1;
    display: flex;
    align-items: center;
    padding: $spacer-medium 0;
    font-size: $font-size-small-desktop;
    @include for-desktop {
      padding: $spacer-big 0;
    }
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
      margin: 0 0 0 $spacer-extra-big;
      font-weight: 400;
      text-transform: none;
    }
    svg {
      fill: $c-dark;
      @include for-desktop {
        fill: $c-gray-variant;
      }
    }
    &:hover {
      color: $c-primary;
      svg {
        fill: $c-primary;
      }
    }
  }
  &__label {
    color: $c-gray-variant;
  }
  &__sort {
    display: flex;
    align-items: center;
    margin-left: $spacer-extra-big;
    margin-right: auto;
  }
  &__counter {
    margin: auto;
    @include for-desktop {
      margin-right: 0;
    }
  }
}
.filters {
  box-sizing: border-box;
  width: 20rem;
  padding: 0 $spacer-big * 3;
  height: 100%;
  overflow-y: auto;
  @include for-desktop {
    width: 22.875rem;
  }
  &::-webkit-scrollbar {
    width: 0;
  }
  &__title {
    margin: $spacer-big * 3 0 $spacer-big;
    font-size: $font-size-big-desktop;
    line-height: 1.6;
  }
  &__item {
    padding: $spacer-small 0;
  }
  &__buttons {
    margin: $spacer-big * 3 0;
  }
  &__button-clear {
    color: #a3a5ad;
    margin-top: 10px;
    background-color: $c-light;
  }
}
</style>
