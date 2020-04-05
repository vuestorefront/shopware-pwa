<template>
  <div class="accordion__item">
    <div class="accordion__content">
      <p class="content">{{ firstName }} {{ lastName }}<br /></p>
      <p class="content">
        {{ email }}
      </p>
    </div>
    <SfButton
      class="sf-button--text accordion__edit"
      @click="$emit('click:edit', 0)"
      >Edit</SfButton
    >
  </div>
</template>
<script>
import { SfButton } from '@storefront-ui/vue'
import { usePersonalDetails } from '../usePersonalDetails'

export default {
  name: 'PersonalDetails',
  components: {
    SfButton,
  },
  setup() {
    const { firstName, lastName, email } = usePersonalDetails()
    return {
      firstName,
      lastName,
      email,
    }
  },
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';
</style>
