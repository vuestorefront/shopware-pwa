<template>
  <div>
    <h1>My account</h1>

  </div>
</template>
<script>


export default {
  name: 'Account',
  components: {
  },
  middleware: "auth",
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';
@import '~@storefront-ui/shared/styles/helpers/visibility';

</style>
