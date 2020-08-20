<template>
  <div>
    <form
      v-if="!formSent"
      action=""
      class="cms-element-sign-to-newsletter"
      @submit.prevent="submit"
    >
      <SfHeading
        title="Subscribe to Newsletters"
        subtitle="Be aware of upcoming sales and events. Receive gifts and special offers!"
        class="sf-heading--left"
      />
      <div>
        <SwButton
          v-if="!newsletterForm"
          class="send button toggle-input"
          @click="
            {
              {
                newsletterForm = !newsletterForm
              }
            }
          "
        >
          {{ $t("Subscribe") }}
        </SwButton>

        <transition name="sf-fade" mode="out-in">
          <SfInput
            v-if="newsletterForm"
            v-model="email"
            type="email"
            name="email"
            label="Email address"
            error-message="Please enter a valid email address"
            :valid="!$v.email.$error"
            class="email small input"
            @blur="$v.email.$touch()"
          />
        </transition>

        <span>
          <SwButton
            v-if="newsletterForm"
            class="send button sf-button--full-width"
          >
            {{ $t("Subscribe") }}
          </SwButton>
        </span>
      </div>
    </form>
  </div>
</template>

<script>
import { SfInput, SfHeading } from "@storefront-ui/vue"
import { validationMixin } from "vuelidate"
import { required, email } from "vuelidate/lib/validators"
import SwButton from "@shopware-pwa/default-theme/components/atoms/SwButton"
import { newsletterSubscribe } from "@shopware-pwa/shopware-6-client"
import { ref } from "@vue/composition-api"
import { getApplicationContext } from "@shopware-pwa/composables"
import { getMessagesFromErrorsArray } from "@shopware-pwa/helpers"

export default {
  name: "CmsElementNewsletterForm",
  components: {
    SfInput,
    SwButton,
    SfHeading,
  },
  mixins: [validationMixin],
  data() {
    return {
      newsletterForm: false,
    }
  },
  setup(props, { root }) {
    const { apiInstance } = getApplicationContext(root, "SwFooter")
    const errorMessage = ref("")
    const email = ref(null)
    const formSent = ref(false)
    const sendForm = async () => {
      try {
        await newsletterSubscribe(
          {
            email: email.value,
            option: "subscribe",
            storefrontUrl:
              window &&
              window.location &&
              `${window.location.protocol}//${window.location.hostname}`,
          },
          apiInstance
        )
        formSent.value = true
      } catch (e) {
        errorMessage.value = getMessagesFromErrorsArray(e.message)
      }
    }

    return {
      email,
      sendForm,
      errorMessage,
      formSent,
    }
  },
  methods: {
    async submit() {
      this.errorMessage = ""
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.errorMessage = this.$t("Please fill form data.")
        return
      }

      await this.sendForm()
    },
  },
  validations: {
    email: {
      required,
      email,
    },
  },
}
</script>

<style lang="scss" scoped>
.cms-element-sign-to-newsletter {
  --heading-title-color: var(--c-white);
  --heading-subtitle-color: var(--c-white);

  align-items: center;
  background-color: rgba($color: #000000, $alpha: 0.7);
  display: flex;
  height: 231px;
  justify-content: space-around;
  padding-bottom: var(--spacer-sm);
  padding-left: var(--spacer-sm);
  padding-right: var(--spacer-sm);
  padding-top: var(--spacer-sm);

  .email {
    --input-color: var(--c-white);

    color: var(--c-white);
    margin-bottom: var(--spacer-lg);
  }

  .toggle-input {
    --button-width: 218px;
  }
}
</style>
