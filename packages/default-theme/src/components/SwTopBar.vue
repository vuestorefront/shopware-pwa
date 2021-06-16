<template>
  <SfTopBar class="sw-top-bar desktop-only" data-cy="top-bar">
    <template #right>
      <SwCurrencySwitcher class="sf-header__currency" />
      <SwLanguageSwitcher />
      <div v-if="isLoggedIn" class="sw-logged-info">
        <span v-if="isGuestSession"> {{ $t("Guest session") }} </span>
        <span v-else> {{ $t("Logged in as", [user.firstName]) }} </span>
        <SwButton @click="logout" class="sf-button--text">
          {{ $t("Logout") }}
        </SwButton>
      </div>
    </template>
  </SfTopBar>
</template>

<script>
import { SfTopBar } from "@storefront-ui/vue"
import SwCurrencySwitcher from "@/components/SwCurrencySwitcher.vue"
import SwLanguageSwitcher from "@/components/SwLanguageSwitcher.vue"
import { useUser } from "@shopware-pwa/composables"
import SwButton from "@/components/atoms/SwButton.vue"

export default {
  components: {
    SfTopBar,
    SwCurrencySwitcher,
    SwLanguageSwitcher,
    SwButton,
  },
  setup(props, { root }) {
    const { isGuestSession, isLoggedIn, logout, user } = useUser(root)

    return {
      isGuestSession,
      isLoggedIn,
      logout,
      user,
    }
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
  z-index: 1;

  &__location-label {
    margin: 0 var(--spacer-sm) 0 0;
  }

  .sf-header {
    &__currency {
      --select-dropdown-z-index: 2;
      position: relative;
      margin: 0 var(--spacer-base) 0 var(--spacer-base);
      width: 2.5rem;
    }
    &__header {
      padding-left: var(--spacer-sm);
    }
    &__icon {
      --icon-size: 1.25rem;
    }
  }
}

.sw-logged-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 2rem;

  span {
    margin-right: 1rem;
  }
}
</style>
