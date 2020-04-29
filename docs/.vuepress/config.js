module.exports = {
  title: "Shopware-PWA",
  description: "Headless PWA for Shopware",
  themeConfig: {
    repo: "DivanteLtd/shopware-pwa",
    docsDir: "docs",
    sidebarDepth: 2,
    smoothScroll: true,
    sidebar: {
      "/cli/": [""],
      "/api/": [
        {
          title: "API",
          path: "",
          collapsable: false,
          children: [
            { title: "Composables", path: "composables" },
            { title: "Helpers", path: "helpers" },
            { title: "Shopware 6 client", path: "shopware-6-client" },
          ],
        },
      ],
      "/": [""],
    },
    nav: (module.exports = [
      {
        text: "Guide",
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
