<template>
  <div class="sw-personal-details">
    <div class="sw-personal-details__content">
      <h4 class="sw-personal-details__title desktop-only">Personal details</h4>
      <p class="content">{{ firstName }} {{ lastName }}<br /></p>
      <p class="content">
        {{ email }}
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
    personalDetails: {
      type: Object,
      default: (()=> {})
    }
  },
  computed: {
    email() {
      return this.personalDetails.email;
    },
    firstName() {
      return this.personalDetails.firstName;
    },
    lastName() {
      return this.personalDetails.lastName;
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';

.sw-personal-details {
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
