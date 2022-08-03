<template>
  <div class="newsletter-subcription">
    <slot name="message">
      <p class="message">
        {{
          $t("Here you can change your newsletter status")
        }}
      </p>
    </slot>
    <SwInput
        v-model="user.email"
        name="loginEmail"
        :label="$t('Your email')"
        class="sw-form__input"
        type="email"
        :disabled="true"
        data-testid="email-input"
    />
    <SwButton
      v-if="!isNewsletterSubscribed"
      class="send button toggle-input"
      @click="subscribeNewsletter"
    >
        {{ $t("Subscribe") }}
    </SwButton>
    <SwButton
      v-else
      class="send button toggle-input"
      @click="unsubscribeNewsletter"
    >
        {{ $t("Unsubscribe") }}
    </SwButton>
  </div>
</template>

<script>
import { newsletterSubscribe, newsletterUnsubscribe } from "@shopware-pwa/shopware-6-client"
import { getApplicationContext } from "@shopware-pwa/composables"
import { useUser, useNotifications } from "@shopware-pwa/composables"
import SwButton from "@/components/atoms/SwButton.vue"
import SwInput from "@/components/atoms/SwInput.vue"

export default {
  name: "SwNewsletter",
  components: {
    SwButton,
    SwInput
  },
  props: {
    option: {
      type: String,
      default: 'direct'
    },
  },
  setup(props, { root }) {
    const { apiInstance, routing } = getApplicationContext({ contextName: "SwNewsletter" })
    const { user, refreshUser, isNewsletterSubscribed } = useUser()
    const { pushSuccess, pushError } = useNotifications()

    const subscribeNewsletter = async () => {
      try {
        await newsletterSubscribe(
          {
            email: user.value.email,
            option: props.option,
            storefrontUrl:
              routing.getCurrentDomain.value?.url ||
              (process.client && window.location.origin) ||
              ""
          },
          apiInstance
        )
        await refreshUser()
        pushSuccess(root.$t("Subscription was enabled"))
      } catch (e) {
        pushError(root.$t("Something went wrong. Please try again later"))
      }
    }

    const unsubscribeNewsletter = async () => {
      try {
        await newsletterUnsubscribe({
          email: user.value.email
        })
        await refreshUser()
        pushSuccess(root.$t("Subscription was disabled"))
      } catch (e) {
        pushError(root.$t("Something went wrong. Please try again later"))
      }
    }

    return {
      subscribeNewsletter,
      unsubscribeNewsletter,
      isNewsletterSubscribed,
      user
    }
  }
}
</script>

<style lang="scss" scoped>

.message {
  margin: 0 0 var(--spacer-xl) 0;
  color: var(--c-dark-variant);
  &__label {
    font-weight: 400;
  }
  &--second {
    padding: 4rem;
  }
}
</style>