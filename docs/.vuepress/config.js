module.exports = {
  title: "Shopware-PWA",
  description: "Headless PWA for Shopware",
  themeConfig: {
    repo: "DivanteLtd/shopware-pwa",
    docsDir: "docs",
    sidebarDepth: 2,
    smoothScroll: true,
    displayAllHeaders: true,
    sidebar: [
      {
        title: "Documentation",
        path: "/landing/",
        collapsable: false,
        children: [
          ["/landing/project/", "Project"],
          ["/landing/getting-started/", "Getting started"],
          ["/landing/fundamentals/", "Fundamentals"],
          ["/landing/concepts/", "Concepts"],
          ["/landing/operation/", "Operation"],
        ],
      },
    ],
    nav: (module.exports = [
      {
        text: "Guides",
        items: [
          {
            text: "Setup",
            items: [
              {
                text: "Cheatsheet",
                link: "/guide/cheatsheet.html",
              },
            ],
          },
          {
            text: "Concepts",
            items: [
              {
                text: "CMS",
                link: "/guide/cms.html",
              },
              {
                text: "Payment",
                link: "/guide/payment.html",
              },
            ],
          },
          {
            text: "Features",
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
          {
            text: "Help",
            items: [
              {
                text: "FAQ / Troubleshooting",
                link: "/guide/troubleshooting.html",
              },
              {
                text: "Roadmap",
                link: "/guide/roadmap.html",
              },
            ],
          },
        ],
      },
      {
        text: "CLI",
        link: "/cli/",
      },
      {
        text: "API",
        link: "/API/index.md",
      },
      {
        text: "Contribution",
        items: [
          {
            text: "Contribution guide",
            link: "/contribution/contributing.html",
          },
          {
            text: "Project structure",
            link: "/contribution/structure.html",
          },
        ],
      },
      // {
      //   text: "Plugin",
      //   link: "/plugin/",
      // },
      // {
      //   text: "Theme",
      //   link: "/theme/",
      // },
    ]),
  },
};
