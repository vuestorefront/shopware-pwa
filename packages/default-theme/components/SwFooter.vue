<template>
  <div class="sw-footer" data-cy="main-footer">
    <slot class="sw-footer__content" name="content" v-bind="column">
      <SwFooterNavigation
        class="content sw-footer__bottom-navigation"
        :navigation-links="navigation"
      />
      <div class="content sw-footer__signature">
        <SwPluginSlot name="footer-content">
          <i18n path="footer.description" :tag="false">
            <template #creator>
              <a
                href="https://www.shopware.com/en/products/shopware-pwa/"
                class="sw-footer__link"
                >shopware AG</a
              >
              &
              <a
                href="https://www.vuestorefront.io/shopware"
                class="sw-footer__link"
                >Vue Storefront</a
              >
            </template>
          </i18n>
        </SwPluginSlot>
      </div>
    </slot>
  </div>
</template>

<script>
import SwPluginSlot from "sw-plugins/SwPluginSlot"
import SwFooterNavigation from "@shopware-pwa/default-theme/components/organisms/SwFooter"
import { getStoreNavigation } from "@shopware-pwa/shopware-6-client"
import { onMounted, ref } from "@vue/composition-api"
import { getApplicationContext } from "@shopware-pwa/composables"
import { getStoreNavigationRoutes } from "@shopware-pwa/helpers"
export default {
  name: "SwFooter",
  components: {
    SwPluginSlot,
    SwFooterNavigation,
  },
  props: {
    column: {
      type: Number,
      default: 4,
    },
  },
  setup({}, { root }) {
    const { apiInstance } = getApplicationContext(root, "SwFooter")
    const navigation = ref([])
    onMounted(async () => {
      const navigationResponse = await getStoreNavigation({
        requestActiveId: "footer-navigation",
        requestRootId: "footer-navigation",
        params: {
          includes: {
            category: ["seoUrls", "externalLink", "name", "id", "children"],
            seo_url: ["pathInfo", "seoPathInfo"],
          },
          associations: {
            seoUrls: {},
          },
        },
      })

      navigation.value = getStoreNavigationRoutes(navigationResponse)
    })

    return {
      navigation,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.sw-footer {
  align-items: flex-end;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: auto;
  justify-content: center;
  margin-top: 1em;
  width: 100%;

  @include for-desktop {
    margin-bottom: 0;
    margin-top: 2em;
  }

  &__link {
    font-weight: 500;

    &:hover {
      color: var(--_c-green-primary);
      text-decoration: underline;
    }
  }

  &__signature {
    padding: 2em;
    text-align: center;
    width: 100%;

    @include for-desktop {
      margin-bottom: 0;
    }
  }

  &__bottom-navigation {
    width: 100%;
  }
}
</style>
