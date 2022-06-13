<template>
  <SfMegaMenu
    :visible="visible"
    :title="getTranslatedProperty(category, 'name')"
    class="sw-mega-menu"
    data-testid="mega-menu"
  >
    <div class="sw-mega-menu__content">
      <div
        v-for="subcategory in category.children"
        :key="getTranslatedProperty(subcategory, 'name')"
        class="sw-mega-menu__content-section"
        data-testid="mega-menu-category"
      >
        <nuxt-link
          class="sf-header__link"
          :to="$routing.getUrl(getCategoryUrl(subcategory))"
        >
          <SfHeading
            :title="getTranslatedProperty(subcategory, 'name')"
            :description="subcategory.description"
            :level="4"
          />
        </nuxt-link>
        <SfList>
          <SfListItem v-for="child in subcategory.children" :key="child.label">
            <nuxt-link
              class="sf-header__link"
              :to="$routing.getUrl(getCategoryUrl(child))"
            >
              <SfMenuItem
                class="sw-menu-item"
                :label="getTranslatedProperty(child, 'name')"
              />
            </nuxt-link>
          </SfListItem>
        </SfList>
      </div>
    </div>
    <div v-if="category.media" class="sw-mega-menu__image-container">
      <nuxt-link
        :to="$routing.getUrl(getCategoryUrl(category))"
      >
        <SwImage
          :src="getImageUrl(category.media)"
          :alt="category.media.alt || ''"
          :width="310"
          :height="250"
        />
      </nuxt-link>
    </div>
  </SfMegaMenu>
</template>

<script>
import { SfMegaMenu, SfMenuItem, SfList, SfHeading } from "@storefront-ui/vue"
import getResizedImage from "@/helpers/images/getResizedImage.js"
import { getCategoryUrl, getTranslatedProperty } from "@shopware-pwa/helpers"
import SwImage from "@/components/atoms/SwImage.vue"

export default {
  name: "SwMegaMenu",
  components: { SfMegaMenu, SfMenuItem, SfList, SfHeading, SwImage },
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
  setup(props, { root }) {
    function getImageUrl(media) {
      return getResizedImage(media?.url, { width: 310, height: 250 })
    }

    return { getImageUrl, getCategoryUrl, getTranslatedProperty }
  },
}
</script>

<style lang="scss" scoped>
.sw-mega-menu {
  background: var(--c-white);
  left: 0;
  position: absolute;
  top: 100%;

  .sf-header__link:hover {
    --heading-title-color: var(--_c-green-primary);
    text-decoration: underline;
  }

  .sw-menu-item:hover {
    --menu-item-label-color: var(--_c-green-primary);
    text-decoration: underline;
  }

  &__content {
    display: flex;
    flex-wrap: wrap;
    max-width: 80vw;

    &-section {
      align-items: flex-start;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 1rem;
      width: 170px;

      .sf-list {
        margin-top: 15px;

        &__item {
          & + .sf-list__item {
            margin-top: 10px;
          }
        }
      }

      ::v-deep .sf-heading {
        text-align: left;
      }

      .sf-header__link {
        text-align: left;
      }
    }

    .sf-heading {
      padding: 0;
    }
  }
}
</style>
