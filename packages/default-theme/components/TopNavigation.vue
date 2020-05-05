<template>
  <div class="top-navigation">
    <SfTopBar class="top-bar desktop-only">
      <template #right>
        <SwCurrency class="sf-header__currency" />
        <!-- TODO Implement SfLanguageSelector -->
        <div class="top-bar__location-label">Location:</div>
        <SfImage
          :src="require('@shopware-pwa/default-theme/assets/flag.png')"
          alt="flag of the USA"
        />
      </template>
    </SfTopBar>
    <SfHeader
      title="Shopware-PWA"
      :has-mobile-search="false"
      :is-sticky="false"
      :cart-items-qty="count.toString()"
    >
      <template #logo>
        <nuxt-link to="/" class="sf-header__logo">
          <SfImage src="/img/logo.svg" alt="Shopware PWA" />
        </nuxt-link>
      </template>
      <template #navigation>
        <SwPluginSlot name="top-navigation-before" />
        <SfHeaderNavigationItem
          v-for="{ routeLabel, routePath } in routes"
          :key="routeLabel"
          class="sf-header__link"
        >
          <nuxt-link class="sf-header__link" :to="routePath">
            <a
              :style="{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
              }"
            >
              {{ routeLabel }}
            </a>
          </nuxt-link>
        </SfHeaderNavigationItem>
        <SwPluginSlot name="top-navigation-after" />
      </template>
      <template #search>
        <SfSearchBar
          placeholder="Search for products"
          aria-label="Search for products"
          class="sf-header__search desktop-only"
          @enter="fulltextSearch"
        />
      </template>
      <template #header-icons="{accountIcon, cartIcon}">
        <div class="sf-header__icons desktop-only">
          <div class="sw-header__icons">
            <SwPluginSlot name="top-header-icons-before" />
            <SfIcon
              v-if="accountIcon"
              :icon="accountIcon"
              class="sf-header__icon sw-header__icon"
              :class="{
                'sf-header__icon--is-active': activeIcon === 'account-icon',
              }"
              role="button"
              aria-label="Go to My Account"
              :aria-pressed="activeIcon === 'account-icon' ? 'true' : 'false'"
              :has-badge="isLoggedIn"
              @click="userIconClick"
            />
            <SfIcon
              v-if="cartIcon"
              :icon="cartIcon"
              :has-badge="count > 0"
              :badge-label="count.toString()"
              class="sf-header__icon sw-header__icon"
              :class="{
                'sf-header__icon--is-active': activeIcon === 'cart-icon',
              }"
              role="button"
              aria-label="Go to cart"
              :aria-pressed="activeIcon === 'cart-icon' ? 'true' : 'false'"
              @click="toggleSidebar"
            />
            <SwPluginSlot name="top-header-icons-after" />
            <!-- TODO - SfBadge will appear with the next StorefrontUI version 
            https://github.com/DivanteLtd/storefront-ui/issues/870 
            -->
          </div>
        </div>
      </template>
    </SfHeader>
    <SwLoginModal :is-open="isModalOpen" @close="isModalOpen = false" />
  </div>
</template>

<script>
import {
  SfHeader,
  SfIcon,
  SfImage,
  SfTopBar,
  SfSearchBar,
} from '@storefront-ui/vue'
import {
  useUser,
  useCart,
  useCartSidebar,
  useUserLoginModal,
  useNavigation,
  useProductSearch,
} from '@shopware-pwa/composables'
import SwLoginModal from '@shopware-pwa/default-theme/components/modals/SwLoginModal'
import SwCurrency from '@shopware-pwa/default-theme/components/SwCurrency'
import { PAGE_ACCOUNT } from '@shopware-pwa/default-theme/helpers/pages'
import SwPluginSlot from 'sw-plugins/SwPluginSlot'

export default {
  components: {
    SfHeader,
    SfIcon,
    SwLoginModal,
    SfImage,
    SfTopBar,
    SfSearchBar,
    SwCurrency,
    SwPluginSlot
  },
  setup() {
    const { routes, fetchRoutes } = useNavigation()
    const { isLoggedIn, logout } = useUser()
    const { count } = useCart()
    const { toggleSidebar } = useCartSidebar()
    const { toggleModal } = useUserLoginModal()
    const { search: fulltextSearch } = useProductSearch()

    return {
      routes,
      fetchRoutes,
      count,
      toggleModal,
      toggleSidebar,
      isLoggedIn,
      logout,
      fulltextSearch,
    }
  },
  data() {
    return {
      navigationElements: [{ name: '' }],
      activeSidebar: 'account',
      activeIcon: '',
      isModalOpen: false,
    }
  },
  async mounted() {
    await this.fetchRoutes({ depth: 1 })
  },
  methods: {
    userIconClick() {
      if (this.isLoggedIn) this.$router.push(PAGE_ACCOUNT)
      else this.toggleModal()
    },
  },
}
</script>

<style lang="scss">
@import '~@storefront-ui/vue/styles.scss';

.top-navigation {
  --search-bar-width: 100%;
  --header-container-padding: 0 var(--spacer-base);
  --header-navigation-item-margin: 0 1rem 0 0;
  margin-bottom: var(--spacer-sm);
  .sf-header {
    padding: 0 var(--spacer-sm);
    &__currency {
      position: relative;
      margin: 0 var(--spacer-base) 0 var(--spacer-base);
      --select-padding: var(--spacer-xs);
      --select-dropdown-z-index: 2;
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
  @include for-desktop {
    .sf-header {
      display: flex;
      justify-content: space-between;
      &__sticky-container {
        width: 100%;
      }
      &__navigation {
        flex: 1;
      }
      &__link {
        display: flex;
        align-items: center;
        height: 100;
      }
    }
  }
}
.top-bar {
  padding: 0 var(--spacer-sm);

  &__location-label {
    margin: 0 var(--spacer-sm) 0 0;
  }
}
.sf-header__logo {
  height: 2rem;
}
.sw-header {
  &__icons {
    display: flex;
  }
  &__icon {
    cursor: pointer;
  }
}
</style>
