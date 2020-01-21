const getConfig = require("vuepress-bar");
const barConfig = getConfig(`${__dirname}/..`);

module.exports = {
  title: "Shopware-PWA",
  description: "Headless PWA for Shopware",
  themeConfig: {
    sidebar: barConfig.sidebar,
    repo: "DivanteLtd/shopware-pwa",
    docsDir: "docs",
    sidebarDepth: 2
  }
};
