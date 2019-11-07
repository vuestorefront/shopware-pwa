<template>
  <div>
    <div id="nav">
      <nuxt-link to="/">Home</nuxt-link> |
      <nuxt-link to="/category">Category</nuxt-link>
    </div>
    <nuxt />
  </div>
</template>

<style lang="scss">
@import '~@storefront-ui/vue/styles.scss';
@import '~@storefront-ui/shared/styles/helpers/visibility';
@import '~@storefront-ui/vue/src/utilities/transitions/transitions';

body {
  padding: 0;
  margin: 0;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.nuxt-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
