<template>
  <SfMegaMenu :visible="visible" :title="category.name" class="sw-mega-menu">
    <div class="sw-mega-menu__content">
      <div
        class="sw-mega-menu__content-section"
        v-for="subcategory in category.children"
        :key="subcategory.name"
      >
        <nuxt-link
          class="sf-header__link"
          :to="$i18n.path(getCategoryUrl(subcategory))"
        >
          <SfHeading
            :title="subcategory.name"
            :subtitle="subcategory.description"
            :level="4"
          />
        </nuxt-link>
        <SfList>
          <SfListItem v-for="child in subcategory.children" :key="child.label">
            <nuxt-link
              class="sf-header__link"
              :to="$i18n.path(getCategoryUrl(child))"
            >
              <SfMenuItem :label="child.name" />
            </nuxt-link>
          </SfListItem>
        </SfList>
      </div>
    </div>
  </SfMegaMenu>
</template>

<script>
import { SfMegaMenu, SfMenuItem, SfList, SfHeading } from '@storefront-ui/vue'
import { getCategoryUrl } from '@shopware-pwa/helpers'

export default {
  name: 'SwMegaMenu',
  components: { SfMegaMenu, SfMenuItem, SfList, SfHeading },
  props: {
    category: {
      type: Object,
      default: () => ({}),
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return { getCategoryUrl }
  },
}
</script>

<style lang="scss" scoped>
.sw-mega-menu {
  position: absolute;
  left: 0;
  width: 100%;
  top: 100%;
  background: var(--c-white);
  &__content {
    flex-wrap: wrap;
    display: flex;
    max-width: 80vw;

    &-section {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }
  }
}
</style>
