<template>
  <div>
    <form
      action=""
      class="cms-element-contact-form"
      @submit.prevent="submit"
      v-if="!formSent"
    >
      <SfSelect
        v-if="getMappedSalutations && getMappedSalutations.length > 0"
        v-model="salutation"
        label="Salutation"
        :valid="!$v.salutation.$error"
        error-message="Salutation must be selected"
        data-cy="salutation-select"
      >
        <SfSelectOption
          v-for="salutationOption in getMappedSalutations"
          :key="salutationOption.id"
          :value="salutationOption"
          data-cy="salutation-option"
        >
          {{ salutationOption.name }}
        </SfSelectOption>
      </SfSelect>

      <div class="input-group">
        <SfInput
          v-model="firstName"
          type="text"
          label="First name"
          name="firstname"
          error-message="First name is required"
          :disabled="false"
          :valid="!$v.firstName.$error"
          class="small input"
          @blur="$v.firstName.$touch()"
        />

        <SfInput
          v-model="lastName"
          type="text"
          label="Last name"
          name="lastname"
          error-message="Last name is required"
          :disabled="false"
          :valid="!$v.lastName.$error"
          class="small input"
          @blur="$v.lastName.$touch()"
        />
      </div>

      <div class="input-group">
        <SfInput
          v-model="email"
          type="text"
          label="Email address"
          name="email"
          error-message="Email is required"
          :disabled="false"
          :valid="!$v.email.$error"
          class="small input"
          @blur="$v.email.$touch()"
        />
        <SfInput
          v-model="phone"
          type="text"
          label="Phone number"
          name="phone"
          error-message="Enter valid phone number"
          :disabled="false"
          :valid="!$v.phone.$error"
          @blur="$v.phone.$touch()"
        />
      </div>

      <div class="input-group">
        <SfInput
          v-model="subject"
          type="text"
          label="Subject line"
          name="subject"
          error-message="Subject is required"
          :disabled="false"
          :valid="!$v.subject.$error"
          @blur="$v.subject.$touch()"
        />
      </div>
      <div class="input-group">
        <SfInput
          v-model="message"
          type="text"
          label="Your message"
          name="message"
          error-message="Message is required"
          :disabled="false"
          :valid="!$v.message.$error"
          @blur="$v.message.$touch()"
        />
      </div>

      <div class="input-group">
        <SfCheckbox
          v-model="checkbox"
          name="checkbox"
          :label="getConfirmationText"
          :valid="!$v.checkbox.$error"
          error-message="Required"
          @blur="$v.checkbox.$touch()"
        />
      </div>

      <SfAlert v-if="errorMessage" :message="errorMessage" type="danger" />

      <SwButton class="send button">
        {{ $t("send") }}
      </SwButton>
    </form>

    <div v-if="formSent" class="thanks-message">
      <SfIcon size="21px" icon="heart_fill" />
      <SfHeading
        title="Thanks!"
        subtitle="We'll contact you as soon as possible!"
      />
    </div>
  </div>
</template>

<script>
import {
  SfSelect,
  SfInput,
  SfCheckbox,
  SfAlert,
  SfIcon,
  SfHeading,
} from "@storefront-ui/vue"
import { validationMixin } from "vuelidate"
import { required, email, minLength } from "vuelidate/lib/validators"
import {
  mapSalutations,
  getMessagesFromErrorsArray,
} from "@shopware-pwa/helpers"
import {
  useSalutations,
  getApplicationContext,
} from "@shopware-pwa/composables"
import { computed, ref } from "@vue/composition-api"
import SwButton from "@shopware-pwa/default-theme/components/atoms/SwButton"
import { sendContactForm } from "@shopware-pwa/shopware-6-client"

export default {
  name: "CmsElementContactForm",
  components: {
    SfSelect,
    SfInput,
    SfCheckbox,
    SwButton,
    SfAlert,
    SfIcon,
    SfHeading,
  },
  mixins: [validationMixin],
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { root }) {
    const { apiInstance } = getApplicationContext(root, "SwFooter")
    const { getSalutations, error: salutationsError } = useSalutations(root)
    const getMappedSalutations = computed(() =>
      mapSalutations(getSalutations.value)
    )

    const getConfirmationText = computed(
      () =>
        props?.content?.config?.confirmationText?.value ||
        "I have read and agree with the data protection regulations."
    )

    const errorMessage = ref("")
    const salutation = ref(null)
    const firstName = ref(null)
    const lastName = ref(null)
    const email = ref(null)
    const phone = ref(null)
    const subject = ref(null)
    const message = ref(null)
    const formSent = ref(false)
    const sendForm = async () => {
      try {
        await sendContactForm(
          {
            salutationId: salutation.value?.id,
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            subject: subject.value,
            comment: message.value,
            phone: phone.value,
          },
          apiInstance
        )
        formSent.value = true
      } catch (e) {
        errorMessage.value = getMessagesFromErrorsArray(e.message)
      }
    }
    const checkbox = ref(false)

    return {
      getMappedSalutations,
      salutationsError,
      getConfirmationText,
      sendForm,
      errorMessage,
      salutation,
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
      checkbox,
      formSent,
    }
  },
  methods: {
    async submit() {
      this.errorMessage = ""
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.errorMessage = this.$t(
          "Please fill form data and check regulations acceptance."
        )
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
    firstName: {
      required,
      minLength: minLength(3),
    },
    lastName: {
      required,
      minLength: minLength(3),
    },
    salutation: {
      required,
    },
    phone: {
      required,
      minLength: minLength(3),
    },
    subject: {
      required,
      minLength: minLength(3),
    },
    message: {
      required,
      minLength: minLength(10),
    },
    checkbox: {
      required,
      isTrue: (value) => value === true,
    },
  },
}
</script>

<style lang="scss" scoped>
.cms-element-contact-form {
  max-width: 1024px;
  margin: 0 auto;

  .input {
    &-group {
      display: flex;
      margin-bottom: var(--spacer-xl);

      > * {
        margin-right: var(--spacer-sm);
        width: 100%;
      }
    }
  }

  .sf-checkbox {
    margin-top: var(--spacer-sm);
    margin-bottom: var(--spacer-sm);
  }

  .button {
    &.send {
      float: right;
    }
  }
}
.thanks-message {
  --icon-color: var(--_c-blue-primary);
  --heading-title-color: var(--_c-green-primary);

  margin-top: var(--spacer-sm);
  margin-bottom: var(--spacer-sm);
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
