<template>
  <div class="sw-address">
    <div class="sw-address__content">
      <h4 class="sw-address__title">{{ addressTitle }}</h4>
      <p class="content">
        {{ street }} {{ apartment }},
        {{ zipcode }}<br />
        {{ city }}
      </p>
      <p class="content" v-if="phoneNumber">
        {{ phoneNumber }}
      </p>
    </div>
  </div>
</template>

<script>
import { SfInput, SfButton, SfAlert, SfTable } from '@storefront-ui/vue'
import SwPluginSlot from 'sw-plugins/SwPluginSlot'


export default {
  name: 'SwPersonalDetails',
  components: { SfButton, SfInput, SfAlert, SfTable, SwPluginSlot },
  props: {
    addressTitle: {
      type: String,
      default: ""
    },
    address: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    title() {
      return this.address.title;
    },
    zipcode() {
      return this.address.zipcode;
    },
    street() {
      return this.address.street;
    },
    city() {
      return this.address.city;
    },
    apartment() {
      return this.address.apartment;
    },
    phoneNumber() {
      return this.address.phoneNumber;
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';

.sw-address {
   &__title {
    font-size: var(--font-sm);
    margin-bottom: var(--spacer-sm);
    color: var(--c-text);
  }
  &__content {
    font-size: var(--font-xs);
  }
}
.content {
  margin: 0;
  color: var(--c-text-muted);
}

</style>
