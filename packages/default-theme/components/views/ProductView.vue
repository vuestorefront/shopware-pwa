<template>
  <div>
    <h2> Dumb product view component, as a param takes cms page </h2>
    <pre> {{ cmsPageDescription }} </pre>
  </div>
</template>
<script>

export default {
  name: 'ProductView',
  components: {
  },
  props: {
    cmsPage: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
    }
  },
  computed: {
    cmsPageDescription () {
      return `${this.cmsPage.name} ${this.cmsPage.type}`
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>

</style>
