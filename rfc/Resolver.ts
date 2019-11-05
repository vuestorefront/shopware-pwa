import axios from "axios";
import { PageCriteria } from "./ResolverInterface";

/**
 * use case for specific category
 */
const getPageForHeadless = (params: PageCriteria) =>
  axios.post("/resolver", params, {
    headers: {
      "sw-context-token": "JwQCccZtRmRtpoxORKSm6pFGGC18175P"
    }
  });

const searchCriteria: PageCriteria = {
  path: "Kids-Toys/Health-Beauty"
};

!(async () => {
  const { data } = await getPageForHeadless(searchCriteria);
})();

/**
 * use case for specific product
 */
const resolveProductCriteria: PageCriteria = {
  path: "Aerodynamic-Iron-Jetsilk/eea0f69ec02d44f7a4224272b3d99478"
};

!(async () => {
  const { data } = await getPageForHeadless(resolveProductCriteria);
})();
