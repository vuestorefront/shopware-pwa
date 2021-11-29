module.exports = {
  sidebarDepth: 2,
  "/": [
    {
      path: "/landing/project/",
      title: "Project",
      collapsable: true,
      children: [],
    },
    {
      path: "/landing/getting-started/",
      title: "Get Started",
      collapsable: true,
      children: [
        {
          title: "Installation",
          path: "/landing/getting-started/installation",
          collapsable: true,
          children: [
            {
              title: "Setup up your Shopware 6",
              path: "/landing/getting-started/prepare-shopware",
            },
            {
              title: "Create a project",
              path: "/landing/getting-started/create-project",
            },
          ],
        },
        {
          title: "Configuration",
          path: "/landing/getting-started/configuration",
          collapsable: true,
        },
        "/landing/getting-started/local-environment",
        "/landing/project/contribution",
      ],
    },
    {
      path: "/landing/fundamentals/",
      title: "Fundamentals",
      collapsable: false,
      children: [
        "/landing/fundamentals/cli",
        "/landing/fundamentals/devtools",
        "/landing/fundamentals/security",
      ],
    },
    {
      path: "/landing/cookbook/",
      title: "Cookbook",
      collapsable: false,
    },
    {
      path: "/landing/concepts/",
      title: "Concepts",
      collapsable: false,
      children: [
        "/landing/concepts/cms",
        "/landing/concepts/plugins",
        "/landing/concepts/payment",
        "/landing/concepts/snippets",
        "/landing/concepts/interceptor",
        "/landing/concepts/api-client-errors",
        "/landing/concepts/routing",
      ],
    },
    {
      path: "/landing/operations/",
      title: "Operations",
      collapsable: false,
      children: [
        "/landing/operations/migrations/",
        "/landing/operations/hosting/",
        "/landing/operations/deployment/",
      ],
    },
    {
      path: "/landing/resources/",
      title: "Resources",
      collapsable: false,
      children: [
        "/landing/resources/roadmap",
        ["/landing/resources/api/", "Package API"],
        "/landing/resources/features",
        "/landing/resources/troubleshooting",
        "/landing/resources/cheatsheet",
      ],
    },
  ],
};
