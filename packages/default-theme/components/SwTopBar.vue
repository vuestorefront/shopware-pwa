<template>
  <SfTopBar class="sw-top-bar desktop-only">
    <template #right>
      <SwCurrencySwitcher class="sf-header__currency" />
      <SwLanguageSwitcher />
    </template>
  </SfTopBar>
</template>

<script>
import { SfTopBar } from '@storefront-ui/vue'
import SwCurrencySwitcher from '@shopware-pwa/default-theme/components/SwCurrencySwitcher'
import SwLanguageSwitcher from '@shopware-pwa/default-theme/components/SwLanguageSwitcher'

export default {
  components: {
    SfTopBar,
    SwCurrencySwitcher,
    SwLanguageSwitcher,
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.sw-top-bar {
  padding: 0 var(--spacer-sm);
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
        content: '';
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
