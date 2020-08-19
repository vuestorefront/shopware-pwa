<template>
  <div>
    <form
      v-if="!formSent"
      action=""
      class="cms-element-sign-to-newsletter"
      @submit.prevent="submit"
    >
      <SwButton
        v-if="!newsletterForm"
        class="send button"
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

      <SwButton v-if="newsletterForm" class="send button">
        {{ $t("Subscribe") }}
      </SwButton>

      <SfInput
        v-if="newsletterForm"
        v-model="email"
        type="email"
        name="email"
        label="Email address"
        error-message="Please enter a valid email address"
        :valid="!$v.email.$error"
        class="small input"
        @blur="$v.email.$touch()"
      />
    </form>
  </div>
</template>

<script>
import { SfInput, SfAlert } from "@storefront-ui/vue"
import { validationMixin } from "vuelidate"
import { required, email } from "vuelidate/lib/validators"
import SwButton from "@shopware-pwa/default-theme/components/atoms/SwButton"
import { postNewsletterSubscribe } from "@shopware-pwa/shopware-6-client"
import { ref } from "@vue/composition-api"
import { getApplicationContext } from "@shopware-pwa/composables"
import { getMessagesFromErrorsArray } from "@shopware-pwa/helpers"

export default {
  name: "CmsElementNewsletterForm",
  components: {
    SfInput,
    SfAlert,
    SwButton,
    validationMixin,
    required,
    email,
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
        await postNewsletterSubscribe(
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
