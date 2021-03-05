<template>
  <div id="login" :key="$route.fullPath">
    <SfHeading
      class="login__header desktop-only"
      :level="3"
      :title="$t('Log in')"
    />
    <SwLogin class="login__component" @success="redirectToMyAccount" />
  </div>
</template>
<script>
import { SfHeading } from "@storefront-ui/vue"

import SwLogin from "@/components/SwLogin.vue"
import { PAGE_ACCOUNT } from "@/helpers/pages"
import authMiddleware from "@/middleware/auth"

export default {
  name: "LoginPage",
  components: {
    SwLogin,
    SfHeading,
  },
  middleware: authMiddleware,
  data() {
    return {}
  },
  computed: {},
  methods: {
    redirectToMyAccount() {
      this.$router.push(this.$routing.getUrl(PAGE_ACCOUNT))
    },
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";
#login {
  height: 65vh;
  margin-bottom: 10vh;
  flex-direction: column;
  align-items: center;
  display: flex;
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    justify-content: center;
  }
  .login__component {
    width: 100%;
    @include for-desktop {
      max-width: 450px;
    }
  }
}
</style>
