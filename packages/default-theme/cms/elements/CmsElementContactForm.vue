<template>
  <div>
    <form action="" @submit.prevent="submit">
      <SfSelect
        v-model="salutation"
        :label="`Salutation`"
        :required="true"
        :disabled="false"
        :error-message="`this field is required`"
        :persistent="`Hello`"
        style="max-width: 30rem;"
        :valid="!$v.salutation.$error"
        @blur="$v.salutation.$touch()"
      >
        <SfSelectOption
          v-for="item in salutationsList"
          :key="item"
          :value="item"
        >
          {{ item }}
        </SfSelectOption>
      </SfSelect>

      <SfInput
        v-model="fname"
        :type="formFields.textType"
        :label="`First name`"
        :name="`firstname`"
        :error-message="`this field is required`"
        :disabled="false"
        :valid="!$v.fname.$error"
        @blur="$v.fname.$touch()"
      />

      <SfInput
        v-model="lname"
        :type="formFields.textType"
        :label="`Last name`"
        :name="`lastname`"
        :error-message="`this field is required`"
        :disabled="false"
        :valid="!$v.lname.$error"
        @blur="$v.lname.$touch()"
      />

      <SfInput
        v-model="email"
        :type="formFields.textType"
        :label="`Email address`"
        :name="`email`"
        :error-message="`this field is required`"
        :disabled="false"
        :valid="!$v.email.$error"
        @blur="$v.email.$touch()"
      />

      <SfInput
        v-model="phone"
        :type="formFields.textType"
        :label="`Phone number`"
        :name="`phone`"
        :error-message="`this field is required`"
        :disabled="false"
        :valid="!$v.phone.$error"
        @blur="$v.phone.$touch()"
      />

      <SfInput
        v-model="subject"
        :type="formFields.textType"
        :label="`Subject line`"
        :name="`subject`"
        :error-message="`this field is required`"
        :disabled="false"
        :valid="!$v.subject.$error"
        @blur="$v.subject.$touch()"
      />

      <SfInput
        v-model="message"
        :type="formFields.textType"
        :label="`Your message`"
        :name="`message`"
        :error-message="`this field is required`"
        :disabled="false"
        :valid="!$v.message.$error"
        @blur="$v.message.$touch()"
      />

      <SfCheckbox
        v-model="checkbox"
        :name="`checkbox`"
        :label="`I have read the data protection information.`"
        :valid="!$v.checkbox.$error"
        @blur="$v.checkbox.$touch()"
      />

      <SfButton>
        send
      </SfButton>
    </form>
  </div>
</template>

<script>
import { SfSelect, SfInput, SfCheckbox, SfButton } from "@storefront-ui/vue"
import { validationMixin } from "vuelidate"
import { required, email, minLength } from "vuelidate/lib/validators"

export default {
  name: "CmsElementContactForm",
  components: {
    SfSelect,
    SfInput,
    SfCheckbox,
    SfButton,
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
      checkbox: "",
      checked: false,
    }
  },
  computed: {
    getSlots() {
      return this.content.slots || []
    },
    getContent() {
      return this.getSlots.length && this.getSlots[0]
    },
  },
  methods: {
    submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR"
        console.log("error")
      } else {
        this.submitStatus = "PENDING"
        setTimeout(() => {
          this.submitStatus = "OK"
        }, 500)
        console.log("sending")
      }
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
    },
  },
}
</script>

<style lang="scss" scoped>
.cms-element-contact-form {
}
</style>
