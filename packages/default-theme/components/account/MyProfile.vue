<template>
  <SfTabs :open-tab="1">
    <SfTab title="Personal data">
      <SfList>
        <SfProperty name="customerNumber" :value="customerNumber"/>
        <SfProperty name="email" :value="email"/>
        <SfProperty name="firstname" :value="firstName"/>
        <SfProperty name="lastname" :value="lastName"/>
      </SfList>
    </SfTab>
  </SfTabs>
</template>
<script>

import { SfProperty, SfTabs, SfList } from '@storefront-ui/vue'
import { useUser } from '@shopware-pwa/composables'

export default {
  name: "MyProfile",
  components: {SfProperty, SfTabs, SfList},
  props: {
  },
  setup() {
    const { user } = useUser()
    return {
      user
    }
  },
  data() {
    return {
    }
  },
  computed: {
    customerNumber(){
      return this.user && this.user.customerNumber
    },
    email() {
      return this.user && this.user.email
    },
    firstName(){
      return this.user && this.user.firstName
    },
    lastName(){
      return this.user && this.user.lastName
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';
@import '~@storefront-ui/shared/styles/helpers/visibility';
</style>
