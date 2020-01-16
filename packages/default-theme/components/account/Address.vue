<template>
  <SfList>
    <SfBadge class="sf-badge--full-width"><strong>#{{address.id}}</strong></SfBadge>
    <SfProperty
        name="name"
        :value="name" />
    <SfProperty
        name="street"
        :value="street" />
    <SfProperty
        name="city"
        :value="city" />
    <SfProperty
        name="zipcode"
        :value="zipcode" />
    <SfProperty
        name="country"
        :value="country" />    
    <SfDivider/>
  </SfList>
</template>
<script>

import { SfList, SfProperty, SfBadge, SfDivider } from '@storefront-ui/vue'
import { VuelidateMixin } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useUser } from '@shopware-pwa/composables'

export default {
  name: "Address",
  mixins: [VuelidateMixin],
  components: {SfList, SfProperty, SfBadge, SfDivider},
  props: {
    address: {
      type: Object,
      default: {}
    }
  },
  computed: {
    name(){
      return this.address && `${this.address.firstName} ${this.address.lastName}`
    },
    street() {
      return this.address && this.address.street
    },
    city() {
      return this.address && this.address.city
    },
    zipcode() {
      return this.address && this.address.zipcode
    },
    country() {
      return this.address && this.address.country && this.address.country.name || ""
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
