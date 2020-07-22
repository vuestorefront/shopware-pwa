<template>
  <div>
    <form action="">
      <SfSelect
        v-model="selected"
        :label="`Salutation`"
        :required="true"
        :valid="true"
        :disabled="false"
        :error-message="`this field is required`"
        :persistent="Hello"
        style="max-width: 30rem;"
      >
        <SfSelectOption
          v-for="(option, key) in optionsList"
          :key="key"
          :value="option.value"
        >
          <SfProductOption
            :color="option.color"
            :label="option.label"
          ></SfProductOption>
        </SfSelectOption>
      </SfSelect>

      <SfInput
        v-model="value"
        :type="text"
        :label="`First name`"
        :name="`firstname`"
        :valid="false"
        :error-message="`this field is required`"
        :required="false"
        :disabled="false"
        :has-show-password="false"
      />

      <SfInput
        v-model="value"
        :type="text"
        :label="`Last name`"
        :name="`lastname`"
        :valid="false"
        :error-message="`this field is required`"
        :required="false"
        :disabled="false"
        :has-show-password="false"
      />

      <SfInput
        v-model="value"
        :type="text"
        :label="`Email address`"
        :name="`email`"
        :valid="false"
        :error-message="`this field is required`"
        :required="false"
        :disabled="false"
        :has-show-password="false"
      />

      <SfInput
        v-model="value"
        :type="text"
        :label="`Phone number`"
        :name="`phone`"
        :valid="false"
        :error-message="`this field is required`"
        :required="false"
        :disabled="false"
        :has-show-password="false"
      />

      <SfInput
        v-model="value"
        :type="text"
        :label="`Subject line`"
        :name="`subject`"
        :valid="false"
        :error-message="`this field is required`"
        :required="false"
        :disabled="false"
        :has-show-password="false"
      />

      <SfInput
        v-model="value"
        :type="text"
        :label="`Your message`"
        :name="`message`"
        :valid="false"
        :error-message="`this field is required`"
        :required="false"
        :disabled="false"
        :has-show-password="false"
      />

      <SfCheckbox
        v-model="checked"
        :name="`checkbox`"
        :label="`I have read the data protection information.`"
        :required="true"
        :disabled="false"
        :valid="true"
        :checked="false"
      />
    </form>
  </div>
</template>

<script>
import {
  SfSelect,
  SfProductOption,
  SfInput,
  SfIcon,
  SfCheckbox,
} from "@storefront-ui/vue"

export default {
  name: "CmsElementContactForm",
  components: {
    SfSelect,
    SfProductOption,
    SfInput,
    SfIcon,
    SfCheckbox,
  },
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      optionsList: [
        { value: "amaranth", color: "#E52B50", label: "Amaranth" },
        { value: "amber", color: "#FFBF00", label: "Amber" },
        { value: "arctic-lime", color: "#D0FF14", label: "Arctic lime" },
        { value: "bluetiful", color: "#3C69E7", label: "Bluetiful" },
        { value: "buff", color: "#F0DC82", label: "Buff" },
      ],
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
}
</script>

<style lang="scss" scoped>
.cms-element-contact-form {
}
</style>
