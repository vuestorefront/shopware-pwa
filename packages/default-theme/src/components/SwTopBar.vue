<template>
  <SfTopBar class="sw-top-bar desktop-only" data-cy="top-bar">
    <template #right>
      <SwCurrencySwitcher class="sf-header__currency" />
      <SwLanguageSwitcher />
    </template>
  </SfTopBar>
</template>

<script>
import { SfTopBar } from "@storefront-ui/vue"
import SwCurrencySwitcher from "@/components/SwCurrencySwitcher.vue"
import SwLanguageSwitcher from "@/components/SwLanguageSwitcher.vue"

export default {
  components: {
    SfTopBar,
    SwCurrencySwitcher,
    SwLanguageSwitcher,
  },
}
</script>

<style lang="scss">
.sf-top-bar__container {
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 1320px;
  padding: 0 1rem;
}
</style>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.sw-top-bar {
  position: relative;
  z-index: 3;

  &__location-label {
    margin: 0 var(--spacer-sm) 0 0;
  }

  .sf-header {
    &__currency {
      --select-dropdown-z-index: 2;
      position: relative;
      margin: 0 var(--spacer-base) 0 var(--spacer-base);
      width: 2.5rem;
      &::before {
        content: "";
        display: block;
        position: absolute;
        background-color: white;
        width: 20px;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        padding: var(--spacer-2xs);
        left: 50%;
        height: 20px;
      }
    }
    &__header {
      padding-left: var(--spacer-sm);
    }
    &__icon {
      --icon-size: 1.25rem;
    }
  }
}
</style>
