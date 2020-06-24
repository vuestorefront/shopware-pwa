import { decode } from "he";
import Vue from "vue";

Vue.prototype.$entitiesDecoder = (html) => decode(html);
export default ({ app }, inject) => {
  // Set the function directly on the context.app object
  app.$entitiesDecoder = (html) => decode(html);
};
