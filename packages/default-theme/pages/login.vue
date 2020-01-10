<template>
  <SwLoginModal :is-open="true" :onClose="redirectToHome" :onSuccess="redirectToMyAccount"/>
</template>
<script>
import SwLoginModal from "../components/modals/SwLoginModal"

export default {
  name: 'Login',
  components: {
    SwLoginModal
  },
  middleware: "auth",
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
    redirectToHome() {
      this.$router.push("/")  
    },
    redirectToMyAccount() {
      this.$router.push("/account")
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';
@import '~@storefront-ui/shared/styles/helpers/visibility';

</style>
