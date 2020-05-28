<template>
  <div class="sw-top-navigation">
    <SfOverlay :visible="!!currentCategoryName" class="sw-overlay" />
    <SwTopBar />
    <SfHeader
      :title="$t('page.title')"
      class="sw-header"
      :has-mobile-search="false"
      :is-sticky="false"
      :cart-items-qty="count.toString()"
    >
      <template #logo>
        <SwLogo />
      </template>
      <template #navigation>
        <SwPluginSlot name="sw-top-navigation-before" />
        <SfHeaderNavigationItem
          v-for="category in navigationElements"
          :key="category.name"
          class="sf-header__link"
          @mouseover="currentCategoryName = category.name"
          @mouseleave="currentCategoryName = null"
          @keyup.tab="currentCategoryName = category.name"
        >
          <nuxt-link
            class="sf-header__link"
            :to="$i18n.path(getCategoryUrl(category))"
          >
            {{ category.name }}
          </nuxt-link>
          <SwMegaMenu
            :category="category"
            :visible="
              currentCategoryName && category.name === currentCategoryName
            "
          />
        </SfHeaderNavigationItem>
        <SwPluginSlot name="sw-top-navigation-after" />
      </template>
      <template #search>
        <!-- TODO: SwSearchBar here -->
      </template>
      <template #header-icons="{accountIcon, cartIcon}">
        <div class="sf-header__icons desktop-only">
          <div class="sw-header__icons">
            <SwPluginSlot name="top-header-icons-before" />
            <SfIcon
              :icon="accountIcon"
              class="sf-header__icon sw-header__icon"
              :class="{
                'sf-header__icon--is-active': activeIcon === 'account-icon',
              }"
              role="button"
              :aria-label="$t('Go to My Account')"
              :aria-pressed="activeIcon === 'account-icon' ? 'true' : 'false'"
              :has-badge="isLoggedIn"
              @click="userIconClick"
            />
            <SfDropdown
              class="dropdown"
              :is-open="isDropdownOpen"
              @click:close="isDropdownOpen = false"
            >
              <SfList>
                <SfListItem>
                  <nuxt-link
                    class="sf-button sf-button--full-width sf-button--underlined color-primary"
                    :to="getPageAccount"
                    @click.native="isDropdownOpen = false"
                  >
                    My account
                  </nuxt-link>
                </SfListItem>
                <SfListItem>
                  <SwButton
                    class="sf-button sf-button--full-width sf-button--underlined color-primary dropdown__item"
                    @click="logoutUser()"
                  >
                    Logout
                  </SwButton>
                </SfListItem>
              </SfList>
            </SfDropdown>
            <SfIcon
              :icon="cartIcon"
              :has-badge="count > 0"
              :badge-label="count.toString()"
              class="sf-header__icon sw-header__icon"
              :class="{
                'sf-header__icon--is-active': activeIcon === 'cart-icon',
              }"
              role="button"
              :aria-label="$t('Go to cart')"
              :aria-pressed="activeIcon === 'cart-icon' ? 'true' : 'false'"
              @click="toggleSidebar"
            />
            <SwPluginSlot name="top-header-icons-after" />
          </div>
        </div>
      </template>
    </SfHeader>
  </div>
</template>

<script>
import {
  SfHeader,
  SfList,
  SfDropdown,
  SfOverlay,
  SfTopBar,
  SfIcon,
} from '@storefront-ui/vue'
import {
  useUser,
  useCart,
  useUIState,
  useNavigation,
  useProductSearch,
} from '@shopware-pwa/composables'

import {
  PAGE_ACCOUNT,
  PAGE_LOGIN,
} from '@shopware-pwa/default-theme/helpers/pages'
import SwMegaMenu from '@shopware-pwa/default-theme/components/SwMegaMenu'
import { ref, reactive, onMounted, watch } from '@vue/composition-api'
import { getCategoryUrl } from '@shopware-pwa/helpers'
import SwPluginSlot from 'sw-plugins/SwPluginSlot'
import { getAvailableLanguages } from '@shopware-pwa/shopware-6-client'
import { useLocales } from '@shopware-pwa/default-theme/logic'
import SwButton from '@shopware-pwa/default-theme/components/atoms/SwButton'
import SwTopBar from '@shopware-pwa/default-theme/components/SwTopBar'
import SwLogo from '@shopware-pwa/default-theme/components/SwLogo'

export default {
  components: {
    SfHeader,
    SfDropdown,
    SfList,
    SwMegaMenu,
    SfOverlay,
    SfTopBar,
    SfIcon,
    SwButton,
    SwPluginSlot,
    SwTopBar,
    SwLogo,
  },
  setup() {
    const { isLoggedIn, logout } = useUser()
    const { count } = useCart()
    const { switchState: toggleSidebar } = useUIState('CART_SIDEBAR_STATE')
    const { switchState: switchLoginModalState } = useUIState(
      'LOGIN_MODAL_STATE'
    )
    const { search: fulltextSearch } = useProductSearch()
    const { fetchNavigationElements, navigationElements } = useNavigation()
    const { currentLocale } = useLocales()

    const currentCategoryName = ref(null)

    onMounted(() => {
      watch(currentLocale, async () => {
        try {
          await fetchNavigationElements(3)
        } catch (e) {
          console.error('[SwTopNavigation]', e)
        }
      })
    })

    return {
      count,
      switchLoginModalState,
      toggleSidebar,
      isLoggedIn,
      logout,
      fulltextSearch,
      navigationElements,
      getCategoryUrl,
      currentCategoryName,
    }
  },
  data() {
    return {
      activeIcon: '',
      isModalOpen: false,
      isDropdownOpen: false,
    }
  },
  computed: {
    getPageAccount() {
      return this.$i18n.path(PAGE_ACCOUNT)
    },
  },
  methods: {
    userIconClick() {
      if (this.isLoggedIn) this.isDropdownOpen = !this.isDropdownOpen
      else this.switchLoginModalState(true)
    },
    async logoutUser() {
      await this.logout()
      this.isDropdownOpen = false
      this.$router.push(this.$i18n.path('/'))
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.sw-top-navigation {
  --search-bar-width: 100%;
  --header-container-padding: 0 var(--spacer-base);
  --header-navigation-item-margin: 0 1rem 0 0;
  margin-bottom: var(--spacer-sm);
  .sw-overlay {
    --overlay-z-index: 1;
  }

  @include for-desktop {
    ::v-deep .sf-header {
      display: flex;
      justify-content: space-between;
      &__sticky-container {
        width: 100%;
      }
      &__navigation {
        flex: 0 0 calc(100% - 20rem);
      }
    }
  }
  .dropdown {
    --dropdown-width: auto;
    --dropdown-transform: translate(-10%, 100%);
    &__item {
      &:hover {
        color: var(--c-link-hover);
      }
    }
  }

  .sw-header__icons {
    display: flex;
    justify-content: space-around;
    margin-left: 1rem;

    .sw-header__icon {
      margin: 0 10px;
    }
  }
}
.sw-header {
  z-index: 2;
  background-color: #fff;
  &__icons {
    display: flex;
  }
  &__icon {
    cursor: pointer;
  }
}
</style>
