<script>
/**
 * The recover-password path is hardcoded in the API, and /account parent path is forbidden for guest uesers.
 * So the redirection is being made to the public route.
 */
export default {
  name: "RecoverPassword",
  middleware: ({ redirect, query: { hash } }) => {
    return redirect(`/reset-password?hash=${hash}`)
  },
}
</script>
