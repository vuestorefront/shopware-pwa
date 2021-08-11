const GTM_TAG = "GTM-WMDC3CP";

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
    // HubSpot
    [
      "script",
      {
        async: true,
        defer: true,
        src: "https://js.hs-scripts.com/8443671.js",
        id: "hs-script-loader",
      },
    ],
    // Google Tag Manager
    [
      "script",
      {},
      [
        `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_TAG}');
      `,
      ],
    ],
  ],
  themeConfig: {
    repo: "DivanteLtd/shopware-pwa",
    docsDir: "docs",
    smoothScroll: true,
    logo: "/shopware_docs_horizontal.svg",
    sidebar: require("./sidebar.js"),
    nav: require("./navigation.js"),
    GTM_TAG,
  },
};
