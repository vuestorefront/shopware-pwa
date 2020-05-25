module.exports = {
  title: "shopware PWA",
  description: "Headless PWA for Shopware",
  themeConfig: {
    repo: "DivanteLtd/shopware-pwa",
    docsDir: "docs",
    sidebarDepth: 0,
    smoothScroll: true,
    displayAllHeaders: true,
    logo: "/shopware_docs_logo.svg",
    sidebar: [
      {
        title: "Home",
        path: "/",
        collapsable: true,
        children: [
          ["/landing/project/", "Project"],
          ["/landing/getting-started/", "Getting started"],
          ["/landing/fundamentals/", "Fundamentals"],
          ["/landing/concepts/", "Concepts"],
          ["/landing/operation/", "Operations"],
          ["/landing/resources/", "Resources"],
        ],
      },
    ],
    nav: (module.exports = [
      {
        text: "Home",
        link: "/",
      },
      /*{
        text: "Fundamentals",
        link: "/landing/fundamentals/"
        items: [
          {
            text: "Nuxt.js",
            link: "/fundamentals/",
          },
          {
            text: "Storefront UI",
            link: "/fundamentals/",
          },
          {
            text: "PWA CLI",
            items: [
              {
                text: "Themes",
                link: "/guide/cms.html",
              },
              {
                text: "Plugins",
                link: "/guide/plugins.html",
              },
              {
                text: "Payment",
                link: "/guide/payment.html",
              },
            ],
          },
        ],
      },*/
      {
        text: "Concepts",
        items: [
          {
            text: "CMS",
            link: "/guide/cms.html",
          },
          {
            text: "Plugins",
            link: "/guide/plugins.html",
          },
          {
            text: "Payment",
            link: "/guide/payment.html",
          },
        ],
      },
      {
        text: "Resources",
        items: [
          {
            text: "Roadmap",
            link: "/guide/roadmap/",
          },
          {
            text: "Package API",
            link: "/api/",
          },
          {
            text: "Troubleshooting",
            link: "/guide/troubleshooting/",
          },
          {
            text: "Cheatsheet",
            link: "/guide/cheatsheet/",
          },
          {
            text: "Contribution",
            items: [
              {
                text: "Contribution Guide",
                link: "/contribution/contributing/",
              },
              {
                text: "Project Structure",
                link: "/contribution/structure/",
              },
            ],
          },
          {
            text: "Featurelist",
            items: [
              {
                text: "Functional",
                link: "/guide/featurelist.html#functional",
              },
              {
                text: "Technical",
                link: "/guide/featurelist.html#technical",
              },
              {
                text: "Integrations",
                link: "/guide/featurelist.html#integrations",
              },
            ],
          },
        ],
      },
    ]),
  },
};
