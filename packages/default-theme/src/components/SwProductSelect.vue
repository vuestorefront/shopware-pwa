<template>
  <div class="">
    <SfSelect
      v-if="options.length"
      v-model="selectedOption"
      :label="label"
      class="sf-select--underlined product-details__attribute"
      @change="$emit('change', selectedOption)"
    >
      <SfSelectOption
        v-for="option in options"
        :key="option.code"
        :value="option.code"
      >
        <slot v-bind="option">
          <SfProductOption
            :label="`${option.label} `"
            :color="option.color"
            v-if="isOptionAvailableForSelectedOptions(option)"
          />
          <SfProductOption v-else :label="`${option.label} (unavailable)`">
            <template #label="{ label }">
              <div style="color: var(--c-text-muted)">{{ label }}</div>
            </template>
          </SfProductOption>
        </slot>
      </SfSelectOption>
    </SfSelect>
  </div>
</template>
<script>
import { SfSelect, SfProductOption } from "@storefront-ui/vue"
import { isOptionAvailableForSelectedOptions as isOptionAvailable } from "@shopware-pwa/helpers"

export default {
  name: "SwProductSelect",
  components: { SfSelect, SfProductOption },
  model: {
    prop: "selected",
    event: "select",
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      default: () => [],
    },
    allOptions: {
      type: Object,
      default: () => [],
    },
    allSelected: {
      type: Object,
      default: () => [],
    },
    label: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      selectedOption: this.value,
    }
  },
  methods: {
    isOptionAvailableForSelectedOptions(option) {
      return isOptionAvailable(
        this.label,
        this.value,
        option,
        this.allOptions,
        this.allSelected
      )

      // if (optionId == this.value) {
      //   return true
      // }

      // let matchingOptions = false
      // Object.entries(this.allSelected).forEach(([attribute, selectedId]) => {
      //   if (attribute !== this.label) {
      //     this.allOptions[attribute].forEach((otherOption) => {
      //       if (otherOption.code === selectedId) {
      //         matchingOptions = otherOption["matchingIds"].includes(optionId)
      //       }
      //     })
      //   }
      // })

      // return matchingOptions
    },
  },
}
</script>
<style lang="scss" scoped></style>
