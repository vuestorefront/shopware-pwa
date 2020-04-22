<template>
  <div id="login" :key="$route.fullPath">
    <SwLogin class="login__component" @success="redirectToMyAccount"/>
  </div>
</template>
<script>
import SwLogin from "@shopware-pwa/default-theme/components/SwLogin"
import { PAGE_ACCOUNT } from '@shopware-pwa/default-theme/helpers/pages'
import authMiddleware from "@shopware-pwa/default-theme/middleware/auth"

export default {
  name: 'Login',
  components: {
    SwLogin
  },
  middleware: authMiddleware,
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
    redirectToMyAccount() {
      this.$router.push(PAGE_ACCOUNT)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';
#login {
  width: 100%;
  height: 65vh;
  margin-bottom: 10vh;
  justify-content: center;
  align-items: center;
  display: flex;
  .login__component {
    width: 50%;
  }
}
</style>
