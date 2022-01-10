import { PlaywrightTestConfig } from "@playwright/test";

const baseURL = process.env.BASE_URL || "http://localhost:3000";
console.error("Test for base url: ", baseURL);
const config: PlaywrightTestConfig = {
  use: {
    baseURL,
  },
  timeout: 120000,
  retries: 3,
};
export default config;
