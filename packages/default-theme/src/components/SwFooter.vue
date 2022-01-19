<template>
  <div class="sw-footer" data-testid="main-footer">
    <slot class="sw-footer__content" name="content" v-bind="column">
      <div class="sw-footer__signature">
        <SwPluginSlot name="footer-content">
          <SwFooterNavigation class="sw-footer__bottom-navigation" />
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
import SwPluginSlot from "sw-plugins/SwPluginSlot.vue"
import SwFooterNavigation from "@/components/organisms/SwFooterNavigation.vue"

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
    text-align: center;
    width: 100%;

    @include for-desktop {
      margin-bottom: 0;
    }
  }

  &__bottom-navigation {
    border-top: var(--c-primary) solid 4px;
    margin-bottom: var(--spacer-sm);
  }
}
</style>
