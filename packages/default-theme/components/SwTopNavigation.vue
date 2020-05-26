<template>
  <div class="top-navigation">
    <SfOverlay :visible="!!currentCategoryName" class="sw-overlay" />
    <SfTopBar class="top-bar desktop-only">
      <template #right>
        <SwCurrency class="sf-header__currency" />
        <SwLanguageSwitcher />
      </template>
    </SfTopBar>
    <SfHeader
      :title="$t('page.title')"
      class="sw-header"
      :has-mobile-search="false"
      :is-sticky="false"
      :cart-items-qty="count.toString()"
    >
      <template #logo>
        <nuxt-link :to="$i18n.path('/')" class="sf-header__logo">
          <SfImage src="/img/logo.svg" :alt="$t('page.title')" />
        </nuxt-link>
      </template>
      <template #navigation>
        <SwPluginSlot name="top-navigation-before" />
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
        <SwPluginSlot name="top-navigation-after" />
      </template>
      <template #search>
        <SfSearchBar
          :placeholder="$t('Search for products')"
          :aria-label="$t('Search for products')"
          class="sf-header__search desktop-only"
          @enter="fulltextSearch"
        />
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
            <SfDropdown class="dropdown" :is-open="isDropdownOpen" @click:close="isDropdownOpen = false">
              <SfList>
                <SfListItem>
                  <nuxt-link class="sf-button sf-button--full-width sf-button--underlined color-primary" :to="getPageAccount">
                    My account
                  </nuxt-link>
                </SfListItem>
                <SfListItem>
                  <SfButton class="sf-button sf-button--full-width sf-button--underlined color-primary dropdown__item" @click="logoutUser()">
                    Logout
                  </SfButton>
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
    <SwLoginModal :is-open="isModalOpen" @close="isModalOpen = false" />
  </div>
</template>

<script>
import {
  SfHeader,
  SfImage,
  SfSearchBar,
  SfList,
  SfButton,
  SfDropdown,
  SfOverlay,
  SfTopBar,
  SfIcon,
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
import { PAGE_ACCOUNT, PAGE_LOGIN } from '@shopware-pwa/default-theme/helpers/pages'
import SwLanguageSwitcher from '@shopware-pwa/default-theme/components/SwLanguageSwitcher'
import SwMegaMenu from '@shopware-pwa/default-theme/components/SwMegaMenu'
import { ref, reactive, onMounted, watch } from '@vue/composition-api'
import { getCategoryUrl } from '@shopware-pwa/helpers'
import SwPluginSlot from 'sw-plugins/SwPluginSlot'
import { getAvailableLanguages } from '@shopware-pwa/shopware-6-client'
import { useLocales } from '@shopware-pwa/default-theme/logic'

export default {
  components: {
    SfHeader,
    SwLoginModal,
    SfImage,
    SfSearchBar,
    SfDropdown,
    SfList,
    SfButton,
    SwMegaMenu,
    SfOverlay,
    SfTopBar,
    SwCurrency,
    SwLanguageSwitcher,
    SfIcon,
    SfButton,
    SwPluginSlot,
  },
  setup() {
    const { isLoggedIn, logout } = useUser()
    const { count } = useCart()
    const { toggleSidebar } = useCartSidebar()
    const { toggleModal } = useUserLoginModal()
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
      toggleModal,
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
      isDropdownOpen: false
    }
  },
  computed: {
    getPageAccount() {
      return this.$i18n.path(PAGE_ACCOUNT)
    }
  },
  methods: {
    userIconClick() {
      if (this.isLoggedIn) this.isDropdownOpen = !this.isDropdownOpen
      else this.toggleModal()
    },
    async logoutUser() {
      await this.logout()
      this.$router.push(this.$i18n.path('/'))
    }
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.top-navigation {
  --search-bar-width: 100%;
  --header-container-padding: 0 var(--spacer-base);
  --header-navigation-item-margin: 0 1rem 0 0;
  margin-bottom: var(--spacer-sm);
  .sw-overlay {
    --overlay-z-index: 1;
  }
  .sf-header {
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
      }
    }
  }
  .dropdown {
    --dropdown-width: auto; 
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
.top-bar {
  padding: 0 var(--spacer-sm);
  position: relative;
  z-index: 3;
  &__location-label {
    margin: 0 var(--spacer-sm) 0 0;
  }
}
.sf-header__logo {
  height: 2rem;
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
