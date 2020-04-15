<template>
  <SfImage :src="getImgUrl" :title="getTitle" :alt="getAlt" lazy class="sw-image"/>
</template>

<script>
import {
  SfImage
} from "@storefront-ui/vue";

import {useImageProps} from '@shopware-pwa/composables'

export default {
  components: {
    SfImage
  },
  props: {
    content: {
      type: Object,
      default: () => ({})
    },
  },
  setup(props) {
    const { getImgUrl, getAlt, getTitle} = useImageProps(props.content)

    return {getImgUrl, getAlt, getTitle}
  },
};
</script>

<style lang="scss">
.sw-image {
  position: relative;
  display: flex;
  width: 100%;
  // height: auto;
  // justify-content: center;
  // width: 100%;
  // height: 100%;
  --image-width: 100%;
}
</style>