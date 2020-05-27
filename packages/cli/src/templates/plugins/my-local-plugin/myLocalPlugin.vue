<template>
  <div class="my-local-plugin">
    <h3>Hello from your local plugin!</h3>
  </div>
</template>
<script>
export default {
  name: "MyLocalPlugin",
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.my-local-plugin {
  display: flex;
  justify-content: center;
  border: 1px solid green;
}
</style>
