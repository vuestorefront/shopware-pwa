<template>
  <div id="category">
    <CmsPage :content="cmsPage" />
  </div>
</template>
<script>
import { getPage } from "@shopware-pwa/shopware-6-client";
import CmsPage from "../../../components/CmsPage";
import {
  SfSidebar,
  SfButton,
  SfList,
  SfIcon,
  SfMenuItem,
  SfFilter,
  SfProductCard,
  SfPagination,
  SfAccordion,
  SfSelect,
  SfBreadcrumbs
} from "@storefront-ui/vue";

export default {
  components: {
    SfButton,
    SfSidebar,
    SfIcon,
    SfList,
    SfFilter,
    SfProductCard,
    SfPagination,
    SfMenuItem,
    SfAccordion,
    SfSelect,
    SfBreadcrumbs,
    CmsPage
  },
  data() {
    return {
      cmsPage: {},
      currentPage: 1,
      sortBy: "price-up",
      isFilterSidebarOpen: false,
    };
  },
  async asyncData({params}) {
    const { cmsPage } = await getPage(`${params.id}`);
    return { cmsPage }
  },
  computed: {
    getProductsCount() {
      return this.productsResponse && this.productsResponse.total
        ? this.productsResponse.total
        : 0;
    }
  },
  methods: {
    clearAllFilters() {
      const filters = {};
      const keys = Object.keys(this.filters);
      keys.forEach(key => {
        filters[key] = [];
      });
      this.filters = filters;
    },
    toggleWishlist() {
      //   this.products[index].isOnWishlist = !this.products[index].isOnWishlist;
    },
    async changeCurrentPage(page) {
      this.currentPage = page;
      this.productsResponse = await getProducts({ pagination: { page: page } });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
@import "~@storefront-ui/shared/styles/helpers/visibility";
@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}

#category {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: auto;
  }
}
.breadcrumbs {
  padding: $spacer-big $spacer-extra-big $spacer-extra-big;
}
.main {
  display: flex;
}
.navbar {
  position: relative;
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
    content: "";
    @include for-desktop {
      content: none;
    }
  }
  &__aside {
    display: flex;
    align-items: center;
    flex: 0 0 15%;
    padding: $spacer-big $spacer-extra-big;
    border-right: 1px solid $c-light;
  }
  &__main {
    flex: 1;
    display: flex;
    align-items: center;
    padding: $spacer-medium 0;
    font-size: $font-size-small-desktop;
    @include for-desktop {
      padding: $spacer-big 0;
    }
  }
  &__title {
    padding: 0;
    font-size: $font-size-big-desktop;
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
      margin: 0 0 0 $spacer-extra-big;
      font-weight: 400;
      text-transform: none;
    }
    svg {
      fill: $c-dark;
      @include for-desktop {
        fill: $c-gray-secondary;
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
    color: $c-gray-secondary;
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
  &__view {
    display: flex;
    align-items: center;
    margin: 0 $spacer-extra-big;
    &-icon {
      margin-left: 10px;
    }
  }
}

.products {
  box-sizing: border-box;
  flex: 1;
  margin: 0 -#{$spacer};
  @include for-desktop {
    margin: $spacer-big;
  }
  &__list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 1.875rem - 0.5rem;
  }
  &__product-card {
    flex: 0 0 50%;
    padding: $spacer;
    @include for-desktop {
      flex: 0 0 25%;
      padding: $spacer-big;
    }
  }
  &__pagination {
    @include for-desktop {
      display: flex;
      justify-content: center;
      margin-top: $spacer-extra-big;
    }
  }
}
.section {
  padding-left: $spacer-big;
  padding-right: $spacer-big;
  @include for-desktop {
    padding-left: 0;
    padding-right: 0;
  }
}
.sidebar {
  flex: 0 0 15%;
  padding: $spacer-extra-big;
  border-right: 1px solid $c-light;
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
