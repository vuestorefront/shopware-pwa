<template>
  <div id="login">
    <SwLogin class="login__component" @success="redirectToMyAccount"/>
  </div>
</template>
<script>
import SwLogin from "../components/SwLogin"

export default {
  name: 'Login',
  components: {
    SwLogin
  },
  middleware: "auth",
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
    redirectToMyAccount() {
      this.$router.push("/account")
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';
@import '~@storefront-ui/shared/styles/helpers/visibility';
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
