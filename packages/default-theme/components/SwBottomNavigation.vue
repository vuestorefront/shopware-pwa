<template>
  <div class="sw-bottom-navigation">
    <transition name="fade">
      <SfOverlay
        :visible="overlayIsVisible"
        :transition="transition"
        @click="triggerMobileNav"
      />
    </transition>
    <SfBottomNavigation data-cy="bottom-navigation">
      <nuxt-link aria-label="Go to Home Page" :to="$i18n.path('/')">
        <SfBottomNavigationItem
          label="Home"
          icon="home"
          icon-size="20px"
          data-cy="bottom-navigation-home"
        />
      </nuxt-link>
      <SfBottomNavigationItem
        icon="menu"
        icon-size="20px"
        label="Menu"
        class="menu-button"
        data-cy="bottom-navigation-menu"
        @click.self="triggerMobileNav"
      >
        <template #icon>
          <SfIcon
            icon="menu"
            size="20px"
            style="width: 25px;"
            @click="triggerMobileNav"
          />
          <transition name="sf-collapse-bottom">
            <SfList v-if="mobileNavIsActive" class="mobile-nav-list">
              <transition name="fade">
                <div v-if="categoryIsChanging">
                  <SfListItem
                    v-if="currentCategory.length != 0"
                    class="back-to-category"
                  >
                    <div class="name" @click="goBack">
                      <SfIcon
                        icon="chevron_left"
                        class="icon sf-chevron_left"
                        size="21px"
                        view-box="0 0 24 12"
                      />
                      {{ currentCategory.slice(-1)[0] }}
                    </div>
                  </SfListItem>
                </div>
              </transition>
              <transition name="slide-fade">
                <div v-if="categoryIsChanging">
                  <SfListItem
                    v-for="category in categoriesList"
                    :key="category.name"
                  >
                    <nuxt-link
                      class="sf-header__link"
                      :to="$i18n.path(getCategoryUrl(category))"
                      @click="triggerMobileNav"
                    >
                      {{ category.name }}
                    </nuxt-link>

                    <div
                      v-if="category.children && category.children.length"
                      class="choose-subcategory"
                      @click="goDeeper(category.name)"
                    >
                      <SfIcon
                        icon="chevron_right"
                        class="icon sf-chevron_right"
                        size="21px"
                        view-box="0 0 24 12"
                      />
                    </div>
                  </SfListItem>
                </div>
              </transition>
            </SfList>
          </transition>
        </template>
      </SfBottomNavigationItem>
      <SfBottomNavigationItem
        icon="profile"
        label="My Account"
        class="menu-button"
        data-cy="bottom-navigation-account"
      >
        <template #icon>
          <SfIcon icon="profile" size="20px" @click="userIconClick" />
          <SfSelect
            v-if="isLoggedIn"
            class="menu-button__select"
            data-cy="bottom-navigation-account-select"
          >
            <!-- TODO: change .native to @click after https://github.com/DivanteLtd/storefront-ui/issues/1097 -->
            <SfSelectOption
              :value="getPageAccount"
              data-cy="bottom-navigation-account-option"
              @click.native="goToMyAccount"
              >My account</SfSelectOption
            >
            <!-- TODO: change .native to @click after https://github.com/DivanteLtd/storefront-ui/issues/1097 -->
            <SfSelectOption :value="'logout'">
              <SwButton class="sf-button--full-width" @click="logoutUser"
                >Logout</SwButton
              >
            </SfSelectOption>
          </SfSelect>
        </template>
      </SfBottomNavigationItem>
      <SfBottomNavigationItem
        label="Currency"
        class="menu-button"
        data-cy="bottom-navigation-currency"
      >
        <template #icon>
          <SwCurrencySwitcher class="menu-button__currency" />
        </template>
      </SfBottomNavigationItem>
      <SfBottomNavigationItem
        icon="empty_cart"
        label="Cart"
        :is-floating="true"
        data-cy="bottom-navigation-cart"
      >
        <template #icon>
          <SfCircleIcon
            aria-label="Go to Cart"
            icon="empty_cart"
            :has-badge="count > 0"
            :badge-label="count.toString()"
            @click="toggleSidebar"
          />
        </template>
      </SfBottomNavigationItem>
    </SfBottomNavigation>
  </div>
</template>

<script>
import {
  SfBottomNavigation,
  SfCircleIcon,
  SfIcon,
  SfList,
  SfOverlay,
  SfSelect,
} from "@storefront-ui/vue"
import {
  useUIState,
  useNavigation,
  useUser,
  useCart,
} from "@shopware-pwa/composables"
import SwCurrencySwitcher from "@shopware-pwa/default-theme/components/SwCurrencySwitcher"
import { onMounted } from "@vue/composition-api"
import SwButton from "@shopware-pwa/default-theme/components/atoms/SwButton"
import { PAGE_ACCOUNT } from "@shopware-pwa/default-theme/helpers/pages"
import { getCategoryUrl } from "@shopware-pwa/helpers"

export default {
  name: "SwBottomNavigation",
  components: {
    SfBottomNavigation,
    SfIcon,
    SfCircleIcon,
    SfSelect,
    SwCurrencySwitcher,
    SwButton,
    SfList,
    SfOverlay,
  },
  data() {
    return {
      currentRoute: { routeLabel: "", routePath: "/" },
      currentCategory: [],
      mobileNavIsActive: false,
      transition: "sf-fade",
      overlayIsVisible: false,
      categoryIsChanging: true,
    }
  },
  setup(props, { root }) {
    const { switchState: toggleSidebar, isOpen: isSidebarOpen } = useUIState(
      root,
      "CART_SIDEBAR_STATE"
    )
    const { fetchNavigationElements, navigationElements } = useNavigation(root)
    const { switchState: toggleModal } = useUIState(root, "LOGIN_MODAL_STATE")
    const { isLoggedIn, logout } = useUser(root)
    const { count } = useCart(root)

    onMounted(async () => {
      try {
        await fetchNavigationElements(3)
      } catch (e) {
        console.error("[SwBottomNavigation]", e)
      }

      // fixes a watch issue - fetch the elements if watch wasn't fired
      if (Array.isArray(navigationElements) && !navigationElements.length) {
        fetchNavigationElements(3)
      }
    })
    return {
      isLoggedIn,
      logout,
      navigationElements,
      getCategoryUrl,
      isSidebarOpen,
      toggleSidebar,
      toggleModal,
      count,
    }
  },
  computed: {
    getPageAccount() {
      return PAGE_ACCOUNT
    },

    categoriesList() {
      let categoriesToDisplay = this.navigationElements
      for (let i = 0; i < this.currentCategory.length; i++) {
        const foundedCat = categoriesToDisplay.find((cat) => {
          return cat.name === this.currentCategory[i]
        })
        if (foundedCat) {
          categoriesToDisplay = foundedCat.children
        } else {
          categoriesToDisplay = this.navigationElements
          this.currentCategory = []
          break
        }
      }
      return categoriesToDisplay
    },
  },
  watch: {
    $route() {
      this.mobileNavIsActive = false
      this.overlayIsVisible = false
    },
  },
  methods: {
    userIconClick() {
      if (this.isLoggedIn) {
        this.$router.push(this.$i18n.path(PAGE_ACCOUNT))
      } else this.toggleModal()
    },
    goToMyAccount() {
      this.$router.push(this.$i18n.path(PAGE_ACCOUNT))
    },
    async logoutUser() {
      await this.logout()
      this.$router.push(this.$i18n.path("/"))
    },
    goDeeper(name) {
      this.currentCategory.push(name)
      this.changeCategoryAnimation()
    },
    goBack() {
      this.currentCategory.pop()
      this.changeCategoryAnimation()
    },
    changeCategoryAnimation() {
      this.categoryIsChanging = false

      setTimeout(() => {
        this.categoryIsChanging = true
      }, 500)
    },
    triggerMobileNav() {
      this.mobileNavIsActive = !this.mobileNavIsActive
      this.overlayIsVisible = !this.overlayIsVisible
    },
  },
}
</script>
<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.55s ease;
}
.slide-fade-leave-active {
  transition: all 0.55s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.55s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(34px);
  opacity: 0;
}
.sw-bottom-navigation {
  align-items: center;
}
.menu-button {
  position: relative;

  &__currency {
    --select-padding: 0;
    --select-height: 2rem;
    --select-color: #afb0b6;
  }
  &__select {
    --chevron-size: 0;
    --select-margin: 0;
    text-align: center;
    position: absolute;
    text-transform: uppercase;
  }

  .sf-select__dropdown {
    .sf-select-option {
      position: relative;

      .sf-header__link {
        display: block;
        margin: 0 auto;
        max-width: 90%;
      }

      .choose-subcategory,
      .back-subcategory {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 2;
      }

      .choose-subcategory {
        right: 8px;
      }

      .back-subcategory {
        left: 8px;
      }
    }
  }
}

.mobile-nav-list {
  background-color: white;
  bottom: 60px;
  box-sizing: border-box;
  left: 0;
  padding: 10px 10px 40px;
  position: var(--select-dropdown-position, fixed);
  width: 100%;

  .sf-list__item {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin: 13px 0;
  }

  .back-to-category {
    align-items: center;
    display: flex;
    justify-content: center;
    padding: 15px 0;
    position: relative;
    width: 100%;

    .name {
      font-weight: bolder;
    }

    .icon {
      font-weight: bolder;
      left: 0;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
