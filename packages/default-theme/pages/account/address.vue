<template>
<div>
  <nuxt/>
  <h1>My addresses</h1>
</div>
</template>

<script>
export default {
  name: 'profile',
  data() {
    return {}
  },
  middleware: "auth",
}
</script>

<style>

</style>