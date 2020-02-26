<template>
  <div class="error-page">
    <SfHeading
      class="error-page__heading"
      :level="2"
      :title="`${code}`"
      :subtitle="message"
    />
    <SfButton @click="$router.push('/')">
      <SfIcon icon="chevron_left" color="white" size="20px" />Return to homepage
    </SfButton>
  </div>
</template>
<script>
import { SfHeading, SfButton, SfDivider, SfIcon } from '@storefront-ui/vue'

const customMessageDictionary = {
  404: "We can't find what you are looking for. Are you lost?",
  500: 'Oops, something went terribly wrong :(',
  502: "Server couldn't complete your request. Please try again in few seconds.",
  503: 'Server is really busy right now'
}

const getMessageForCode = code => customMessageDictionary[code]

export default {
  name: 'ErrorPage',
  components: {
    SfHeading,
    SfButton,
    SfDivider,
    SfIcon
  },
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  computed: {
    code() {
      return this.error.statusCode
    },
    message() {
      return getMessageForCode(this.code) || this.error.message
    }
  }
}
</script>
<style lang="scss">
@import '~@storefront-ui/vue/styles.scss';
.error-page {
  text-align: center;
  margin: auto;
  min-height: 55vh;

  &__heading {
    text-align: center;
    height: 32vh;
    margin-bottom: 30px;
    h2 {
      font-size: 5rem;
      color: var(--c-primary);
    }
  }

  .sf-icon {
    float: left;
    margin-right: 20px;
  }
}
</style>
