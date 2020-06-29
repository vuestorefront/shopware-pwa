module.exports = {
  title: "PWA",
  description: "Headless PWA for Shopware",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.png",
      },
    ],
  ],
  themeConfig: {
    repo: "DivanteLtd/shopware-pwa",
    docsDir: "docs",
    smoothScroll: true,
    logo: "/shopware_docs_horizontal.svg",
    sidebar: require("./sidebar.js"),
    nav: require("./navigation.js"),
  },
};
