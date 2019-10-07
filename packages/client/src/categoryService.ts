import axios from "axios";
import { config } from "./settings";
import { CATEGORY_ENDPOINT } from "./endpoints";

const getCategories = async function(): Promise<any> {
  return axios.get(config.endpoint + CATEGORY_ENDPOINT);
};

export { getCategories };
