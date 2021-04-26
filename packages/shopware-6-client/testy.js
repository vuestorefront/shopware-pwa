const { getUserCountry, setup } = require("@shopware-pwa/shopware-6-client");

!(async () => {
  setup({
    endpoint: "http://localhost:8000",
    accessToken: "SWSCMGPZM1LVCK5QOHLBSMLAUQ",
  });
  try {
    const response = await getUserCountry("012e32ef96674dd584d71d993fb1f458");
    console.info(response);
  } catch (error) {
    console.warn("error", error);
  }
})();
