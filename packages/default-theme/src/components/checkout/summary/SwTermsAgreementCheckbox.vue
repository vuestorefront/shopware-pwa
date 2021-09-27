<template>
  <div style="margin: 1rem 0">
    <div style="display: flex">
      <span style="margin-right: 4px"> {{ $t("Read our") }} </span>
      <SwButton class="sf-button--pure" @click="isModalOpen = true">
        {{ $t("terms and conditions") }}
      </SwButton>
    </div>
    <SwCheckbox
      v-model="termsAgreementCheckbox"
      name="termsAgreementCheckbox"
      :label="$t('I accepted the terms and conditions')"
      :valid="!$v.termsAgreementCheckbox.$error"
      :error-message="$t('This field is required')"
      @blur="$v.termsAgreementCheckbox.touch()"
    />
    <SfModal
      class="sw-modal"
      :title="$t('Terms of service')"
      :visible="isModalOpen"
      @close="isModalOpen = false"
    >
      <SfHeading
        :title="$t('Terms of service')"
        class="title desktop-only"
        :level="4"
      />
      <SwTermsAndConditions />
    </SfModal>
  </div>
</template>
<script>
import SwCheckbox from "@/components/atoms/SwCheckbox.vue"
import { useVuelidate } from "@vuelidate/core"
import { SfHeading, SfModal } from "@storefront-ui/vue"
import SwButton from "@/components/atoms/SwButton.vue"
import SwTermsAndConditions from "@/components/SwTermsAndConditions.vue"

export default {
  name: "SwTermsAgreementCheckbox",
  components: {
    SwCheckbox,
    SfHeading,
    SfModal,
    SwButton,
    SwTermsAndConditions,
  },
  data() {
    return {
      termsAgreementCheckbox: false,
      isModalOpen: false,
    }
  },
  setup() {
    return {
      $v: useVuelidate(),
    }
  },
  computed: {
    getErrorMessage() {
      return this.$v.termsAgreementCheckbox.$errors?.length
        ? this.$v.termsAgreementCheckbox.$errors[0].$message
        : ""
    },
  },
  validations: {
    termsAgreementCheckbox: {
      checkTerms: {
        $validator: (value) => value === true,
        $message:
          "Your agreement with our Terms and Conditions is required to place new order.",
      },
    },
  },
}
</script>
