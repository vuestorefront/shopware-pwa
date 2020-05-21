<template>
  <div class="error-page">
    <SfImage
      class="error-page__image"
      :src="require('@shopware-pwa/default-theme/assets/error.svg')"
    />
    <SfHeading
      class="error-page__heading"
      :level="1"
      :title="`${code}`"
      :subtitle="message"
    />
    <div class="error-page__actions">
      <SfButton class="error-page__actions-button" @click="$router.push($i18n.path('/'))">
        <SfIcon
          class="error-page__actions-button-icon"
          icon="chevron_left"
          color="white"
          size="20px"
        />Return to homepage
      </SfButton>
      <SfButton
        @click="$router.back()"
        class="sf-button--full-width sf-button--text error-page__actions-button"
      >
        Back
      </SfButton>
    </div>
  </div>
</template>
<script>
import { SfHeading, SfButton, SfIcon, SfImage } from '@storefront-ui/vue'

const customMessageDictionary = {
  404: "We can't find what you are looking for. Are you lost?",
  408: 'The API is taking to long to respond',
  500: 'Oops, something went terribly wrong :(',
  502: "Server couldn't complete your request. Please try again in few seconds.",
  503: 'Server is really busy right now',
}

const getMessageForCode = (code) => customMessageDictionary[code]

export default {
  name: 'ErrorPage',
  components: {
    SfHeading,
    SfButton,
    SfImage,
    SfIcon,
  },
  props: {
    error: {
      type: Object,
      default: () => {},
    },
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
    },
  },
}
</script>
<style lang="scss">
@import '~@storefront-ui/vue/styles.scss';
.error-page {
  box-sizing: border-box;
  text-align: center;
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    margin: 0 auto;
    max-width: 1272px;
  }
  &__heading {
    --heading-title-margin: var(--spacer-sm) 0;
    --heading-title-color: var(--c-primary);
    --heading-subtitle-color: var(--c-secondary-variant);
    --heading-subtitle-font-size: var(--font-base);
    --heading-subtitle-margin: 0 var(--spacer-base);
    --heading-subtitle-font-family: var(--font-family-primary);
    --heading-title-font-weight: var(--font-semibold);
    @include for-desktop {
      --heading-title-font-size: 5rem;
    }
  }
  &__image {
    --image-width: 10rem;
    min-height: 10rem;
    @include for-desktop {
      --image-width: 18rem;
      min-height: 18rem;
    }
  }
  &__actions {
    margin: var(--spacer-sm) 0 0 0;
    @include for-desktop {
      margin: var(--spacer-lg) 0 0 0;
    }
  }
  &__actions-button {
    --button-width: 100%;
    --button-height: 3.25rem;
    margin: 0 auto;
    &-icon {
      margin: 0 var(--spacer-base) 0 0;
    }
    @include for-desktop {
      --button-width: 20rem;
    }
  }
}
</style>
