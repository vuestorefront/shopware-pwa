<template>
<<<<<<< 84300017004a397ffa02f09d49d7992e3e1bd6db
  <SwLoginModal :is-open="true" :onClose="redirectToHome" :onSuccess="redirectToMyAccount"/>
=======
  <SwLoginModal :is-open="true" :onClose="redirectToHome"/>
>>>>>>> --wip-- handle login, logout and redirect to my account page
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
<<<<<<< 84300017004a397ffa02f09d49d7992e3e1bd6db
    },
    redirectToMyAccount() {
      this.$router.push("/account")
=======
>>>>>>> --wip-- handle login, logout and redirect to my account page
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';
@import '~@storefront-ui/shared/styles/helpers/visibility';

</style>
