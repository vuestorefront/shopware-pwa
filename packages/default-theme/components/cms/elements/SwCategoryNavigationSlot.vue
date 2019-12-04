<template>
  <div class="sw-category-navigation">
    <div class="sw-category-navigation__header">
      <h1 class="sw-category-navigation__title">{{ navTitle }}</h1>
    </div>
    <div class="sw-category-navigation__menu">
      <SfAccordion :firstOpen="true" :showChevron="true">
        <SfAccordionItem
          v-for="accordion in navigation"
          :key="accordion.id"
          :header="accordion.name"
        >
          <template v-if="accordion.children.length > 0">
            <SfList>
              <SfListItem v-for="item in accordion.children" :key="item.id">
                <SfMenuItem :label="item.name" />
              </SfListItem>
            </SfList>
          </template>
        </SfAccordionItem>
      </SfAccordion>
    </div>
  </div>
</template>

<script>
import { SfList, SfAccordion, SfMenuItem } from "@storefront-ui/vue";
import { getNavigation } from "@shopware-pwa/shopware-6-client";

export default {
  components: {
    SfAccordion,
    SfList,
    SfMenuItem
  },
  data() {
    return {
      navTitle: 'Category',
      navigationElements: []
    };
  },
  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  },
  async mounted() {
    const { children } = await getNavigation({depth:2})
    this.navigationElements = children
  },
  computed: {
    navigation() {
      return this.navigationElements;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles.scss";

@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}

.sw-category-navigation {
  margin-right: 0 !important;
  &__header {
    margin-left: 2.5rem;
    flex: 0 0 15%;
    align-items: center;
    display: flex;
    height: 3.9rem;
    @include for-desktop {
      border-top: 1px solid $c-light;
      border-bottom: 1px solid $c-light;
    }
  }

  &__title {
    padding: 0;
    font-size: $font-size-big-desktop;
  }

  &__menu {
  margin-right: 20px;
  flex: 0 0 15%;
  padding: $spacer-extra-big;

    &__aside {
      display: flex;
      align-items: center;
      flex: 0 0 15%;
      padding: $spacer-big $spacer-extra-big;
      border-right: 1px solid $c-light;
    }
  }
}
</style>
