<template>
  <div class="cms-element-category-navigation">
    <div class="cms-element-category-navigation__header">
      <SfHeading :level="3" :title="navTitle" />
    </div>
    <div class="cms-element-category-navigation__menu">
      <SfHeading subtitle="No subcategories" v-if="!navigation.length" />
      <SfAccordion :show-chevron="true">
        <SfAccordionItem
          v-for="accordion in navigation"
          :key="accordion.id"
          :header="accordion.name"
        >
          <template #header="{header, isOpen, accordionClick}">
            <div class="cms-element-category-navigation__menu-item">
              <nuxt-link :to="$i18n.path(getCategoryUrl(accordion))">
                <SwButton
                  :aria-pressed="isOpen.toString()"
                  :aria-expanded="isOpen.toString()"
                  :class="{ 'sf-accordion-item__header--open': isOpen }"
                  class="sf-button--pure sf-accordion-item__header"
                >
                  {{ header }}
                </SwButton>
              </nuxt-link>
              <SfChevron
                tabindex="0"
                class="sf-accordion-item__chevron"
                :class="{ 'sf-chevron--right': !isOpen }"
                @click.native="accordionClick"
              />
            </div>
          </template>
          <template v-if="accordion.children.length > 0">
            <SfList>
              <SfListItem v-for="item in accordion.children" :key="item.id">
                <nuxt-link
                  v-if="item.route && item.name"
                  :to="$i18n.path(getCategoryUrl(item))"
                >
                  <SfMenuItem :label="item.name" />
                </nuxt-link>
              </SfListItem>
            </SfList>
          </template>
          <template v-else>
            <nuxt-link
              v-if="accordion.route && accordion.name"
              :to="$i18n.path(getCategoryUrl(accordion))"
            >
              See {{ accordion.name }}
            </nuxt-link>
          </template>
        </SfAccordionItem>
      </SfAccordion>
    </div>
  </div>
</template>

<script>
import {
  SfList,
  SfAccordion,
  SfMenuItem,
  SfHeading,
  SfChevron,
} from "@storefront-ui/vue"
import { getNavigation } from "@shopware-pwa/shopware-6-client"
import { useCms } from "@shopware-pwa/composables"
import SwButton from "@shopware-pwa/default-theme/components/atoms/SwButton"
import { getCategoryUrl } from "@shopware-pwa/helpers"

export default {
  components: {
    SfAccordion,
    SfList,
    SfMenuItem,
    SfHeading,
    SfChevron,
    SwButton,
  },
  name: "CmsElementCategoryNavigation",
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { root }) {
    const { categoryId } = useCms(root)

    return { categoryId, getCategoryUrl }
  },
  data() {
    return {
      navTitle: "Subcategories",
      navigationElements: [],
    }
  },
  computed: {
    navigation() {
      return this.navigationElements
    },
  },
  async mounted() {
    const { children } = await getNavigation(
      {
        depth: 2,
        rootNode: this.categoryId,
      },
      this.$shopwareApiInstance
    )
    this.navigationElements = children
  },
}
</script>

<style lang="scss" scoped>
@import "../settings.scss";

.cms-element-category-navigation {
  &__header {
    --heading-title-font-weight: var(--font-light);
    --heading-title-font-size: var(--font-xl);
    flex: 0 0 15%;
    align-items: center;
    display: flex;
    height: 2.4rem;
    padding: var(--spacer-base) var(--spacer-sm);
    @include for-desktop {
      border-top: 1px solid var(--c-light);
      border-bottom: 1px solid var(--c-light);
    }
  }
  &__menu {
    flex: 0 0 15%;
    @include for-desktop {
      padding: var(--spacer-sm);
      width: 12rem;
    }

    &__aside {
      display: flex;
      align-items: center;
      flex: 0 0 15%;
      padding: var(--spacer-base) var(--spacer-xl);
      border-right: 1px solid var(--c-light);
    }
  }
  &__menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
