<template>
  <div class="sw-image-bubble-row">
    <SwImageRounded v-for="image in slots.slots" :key="image.id" :content="image" :rounded="true"/>
  </div>
</template>

<script>
import SwImageRounded from "./SwImageRounded";
import { setContentOrder } from "../cmsNameMapper";
import { reactive } from "@vue/composition-api";

export default {
  name: 'SwImageBubbleRow',
  components: {
    SwImageRounded,
  },
  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const slots = reactive(setContentOrder(props.content))
    return {slots}
  }
};
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';

.sw-image-bubble-row {
  display: flex;
  flex-direction: column;
  margin: var(--spacer-extra-big) 0;

  @include for-desktop {
    flex-direction: row;
    justify-content: space-around;
  }
}
</style>
