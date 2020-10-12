<template>
  <h2>You can show your CMS page overriding "src/pages/_lang/_.vue" file.</h2>
</template>
<script>
export default {
  name: "DynamicRoute",
  components: {},
  watchQuery(newQuery, oldQuery) {
    // Only execute component methods if currency changed
    return newQuery.currencyId !== oldQuery.currencyId;
  },
  asyncData: async ({ params, app, error: errorView, query }) => {
    return {};
  },
};
</script>
<style lang="scss" scoped></style>
