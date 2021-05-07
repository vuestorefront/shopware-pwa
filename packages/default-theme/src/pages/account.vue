<template>
  <div :key="$route.fullPath" class="my-account">
    <SfContentPages
      :title="$t('My account')"
      :active="activePage"
      class="my-account__content"
      @click:change="updateActivePage"
    >
      <SfContentCategory :title="$t('Personal Details')">
        <SfContentPage :title="$t('My profile')">
          <nuxt-child />
        </SfContentPage>
        <SfContentPage :title="$t('My addresses')">
          <nuxt-child />
        </SfContentPage>
      </SfContentCategory>
      <SfContentCategory :title="$t('Order details')">
        <SfContentPage :title="$tc('Order history', ordersCount)">
          <nuxt-child />
        </SfContentPage>
      </SfContentCategory>
      <SfContentPage :title="$t('Logout')"></SfContentPage>
    </SfContentPages>
  </div>
</template>

<script>
import { computed } from "@vue/composition-api"
import { SfContentPages } from "@storefront-ui/vue"
import { useUser, useBreadcrumbs } from "@shopware-pwa/composables"
import { PAGE_ACCOUNT, PAGE_LOGIN } from "@/helpers/pages"
import authMiddleware from "@/middleware/auth"

export default {
  name: "AccountPage",

  components: {
    SfContentPages,
  },

  middleware: authMiddleware,

  setup(props, { root }) {
    const { logout, user, loadOrders, orders } = useUser(root)
    const { setBreadcrumbs } = useBreadcrumbs(root)
    setBreadcrumbs([
      {
        name: root.$t("My Account"),
        path: PAGE_ACCOUNT,
      },
    ])
    const ordersCount = computed(() => user.value && user.value.orderCount)
    return { logout, user, loadOrders, orders, ordersCount }
  },

  data() {
    return {
      activePage: this.$t("My profile"),
      allAddresses: [],
    }
  },

  computed: {
    activeBillingAddress() {
      return (this.user && this.user && this.user.activeBillingAddress) || {}
    },
    activeShippingAddress() {
      return (this.user && this.user && this.user.activeShippingAddress) || {}
    },
  },

  watch: {
    $route(to, from) {
      if (to.name === "account-profile") {
        this.activePage = this.$t("My profile")
      }
    },
  },

  mounted() {
    this.updateActivePage(this.activePage)
  },

  methods: {
    async updateActivePage(title) {
      switch (title) {
        case this.$t("My profile"):
          this.$router.push(this.$routing.getUrl("/account/profile"))
          break
        case this.$t("My addresses"):
          this.$router.push(this.$routing.getUrl("/account/addresses"))
          break
        case this.$tc("Order history", this.ordersCount):
          this.$router.push(this.$routing.getUrl("/account/orders"))
          break
        case this.$t("Logout"):
          await this.logout()
          this.$router.push(this.$routing.getUrl(PAGE_LOGIN))
          break
      }
      this.activePage = title
    },
  },
}
</script>

<style lang="scss">
.my-account .my-account__content,
.my-account .sf-content-pages__content {
  height: auto;
}
</style>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.my-account {
  @include for-desktop {
    max-width: 1320px;
    margin: 0 auto;
    padding: 0 var(--spacer-sm);
  }
  &__content {
    @include for-mobile {
      --content-pages-sidebar-category-title-font-weight: var(
        --font-weight--normal
      );
      --content-pages-sidebar-category-title-margin: var(--spacer-sm)
        var(--spacer-sm) var(--spacer-sm) var(--spacer-base);
    }
    @include for-desktop {
      --content-pages-sidebar-flex: 0 0 20rem;
      --content-pages-sidebar-category-title-margin: var(--spacer-xl) 0 0 0;
      --content-pages-sidebar-padding: var(--spacer-xl);
      --content-pages-content-padding: var(--spacer-xl);
      --content-pages-sidebar-title-font-weight: var(--font-weight--normal);
    }
  }
}
</style>
