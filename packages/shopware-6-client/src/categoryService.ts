import axios from "axios";
import { config } from "./settings";
import { CATEGORY_ENDPOINT } from "./endpoints";

const getCategories = async function(): Promise<any> {
  const resp = await axios.get(config.endpoint + CATEGORY_ENDPOINT);
  return resp.data;
};

export { getCategories };
