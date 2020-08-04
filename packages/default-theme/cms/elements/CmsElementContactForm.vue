<template>
  <div>
    <form action="" class="cms-element-contact-form" @submit.prevent="submit">
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
          v-model="fname"
          :type="formFields.textType"
          label="First name"
          name="firstname"
          error-message="First name is required"
          :disabled="false"
          :valid="!$v.fname.$error"
          class="small input"
          @blur="$v.fname.$touch()"
        />

        <SfInput
          v-model="lname"
          :type="formFields.textType"
          label="Last name"
          name="lastname"
          error-message="Last name is required"
          :disabled="false"
          :valid="!$v.lname.$error"
          class="small input"
          @blur="$v.lname.$touch()"
        />
      </div>

      <div class="input-group">
        <SfInput
          v-model="email"
          :type="formFields.textType"
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
          :type="formFields.textType"
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
          :type="formFields.textType"
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
          :type="formFields.textType"
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

      <SfAlert
        v-if="$v.$invalid && errorMessage"
        :message="errorMessage"
        type="danger"
      />

      <SwButton class="send button">
        {{ $t("send") }}
      </SwButton>
    </form>
  </div>
</template>

<script>
import { SfSelect, SfInput, SfCheckbox, SfAlert } from "@storefront-ui/vue"
import { validationMixin } from "vuelidate"
import { required, email, minLength } from "vuelidate/lib/validators"
import { mapSalutations } from "@shopware-pwa/helpers"
import { useSalutations } from "@shopware-pwa/composables"
import { computed } from "@vue/composition-api"
import SwButton from "@shopware-pwa/default-theme/components/atoms/SwButton"

export default {
  name: "CmsElementContactForm",
  components: {
    SfSelect,
    SfInput,
    SfCheckbox,
    SwButton,
    SfAlert,
  },
  mixins: [validationMixin],
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      salutationsList: ["Sir", "Madam", "Mr", "Mrs"],
      formFields: {
        textType: "text",
        defaultCheckbox: "",
        defaultInput: "",
        defaultSelect: "Mr",
      },
      salutation: "",
      fname: "",
      lname: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      checkbox: false,
      errorMessage: "",
    }
  },
  setup(props, { root }) {
    const { getSalutations, error: salutationsError } = useSalutations(root)
    const getMappedSalutations = computed(() =>
      mapSalutations(getSalutations.value)
    )

    const getConfirmationText = computed(
      () =>
        props?.content?.config?.confirmationText?.value ||
        "I have read and agree with the data protection regulations."
    )

    return {
      getMappedSalutations,
      salutationsError,
      getConfirmationText,
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

      console.error("SENDING")
    },
  },
  validations: {
    email: {
      required,
      email,
    },
    fname: {
      required,
      minLength: minLength(3),
    },
    lname: {
      required,
      minLength: minLength(3),
    },
    salutation: {
      required,
    },
    phone: {
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
</style>
