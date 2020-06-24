<template>
  <SfHero class="cms-element-image-slider">
    <SfHeroItem v-for="slide in getSlides" :key="slide.media.id"
        class="sw-image-slider__item"
        :image="slide.media.url">
      <template v-if="slide.url" #call-to-action>
        <nuxt-link :to="$i18n.path(slide.url)">
          <SwButton class="sf-button">
            See more
          </SwButton>
        </nuxt-link>
      </template>
    </SfHeroItem>
  </SfHero>
</template>
<script>
import { SfHero, SfHeroItem } from "@storefront-ui/vue";
import SwButton from "@shopware-pwa/default-theme/components/atoms/SwButton";

export default {
  components: {
    SfHero, SwButton
  },
  name: "CmsElementImageSlider",
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    getSlides() {
      return this.content.data && this.content.data.sliderItems || []
    }
  }

}
</script>
<style lang="scss" scoped>

</style>
