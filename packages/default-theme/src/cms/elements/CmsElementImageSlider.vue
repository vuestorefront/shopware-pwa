<template>
  <SfHero class="cms-element-image-slider">
    <SfHeroItem
      v-for="slide in getSlides"
      :key="slide.media.id"
      class="sw-image-slider__item"
      :image="`'${slide.media.url}'`"
    >
      <template v-if="slide.url" #call-to-action>
        <!-- ToDo https://github.com/DivanteLtd/storefront-ui/issues/1279 
        ToDo move nuxt-link to SwLink when https://github.com/DivanteLtd/shopware-pwa/pull/901 merge -->

        <nuxt-link
          :to="$routing.getUrl(slide.url)"
          class="cms-element-image-slider__link"
        >
          <SwButton class="sf-button"> See more </SwButton>
        </nuxt-link>
      </template>
    </SfHeroItem>
  </SfHero>
</template>

<script>
import { SfHero } from "@storefront-ui/vue"
import SwButton from "@/components/atoms/SwButton.vue"

export default {
  name: "CmsElementImageSlider",

  components: {
    SfHero,
    SwButton,
  },

  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    getSlides() {
      return (this.content.data && this.content.data.sliderItems) || []
    },
  },
}
</script>

<style lang="scss" scoped></style>
