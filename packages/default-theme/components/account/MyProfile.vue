<template>
  <SfTabs :open-tab="1">
    <SfTab title="Personal data">
      <SfList>
        <SfListItem>customerNumber: {{ user.customerNumber }}</SfListItem>
        <SfListItem>email: {{ user.email }}</SfListItem>
        <SfListItem>firstname: {{ user.firstName }} </SfListItem>
        <SfListItem>lastname: {{ user.lastName }} </SfListItem>
      </SfList>
    </SfTab>

  </SfTabs>
  
</template>
<script>

import { SfIcon, SfModal, SfInput, SfButton, SfLoader, SfAlert, SfTabs, SfList } from '@storefront-ui/vue'
import { VuelidateMixin } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useUser } from '@shopware-pwa/composables'

export default {
  name: "MyProfile",
  mixins: [VuelidateMixin],
  components: {SfTabs, SfList},
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
  
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';
@import '~@storefront-ui/shared/styles/helpers/visibility';
</style>
