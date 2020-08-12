module.exports = {
  sidebarDepth: 2,
  "/": [
    {
      path: "/landing/project/",
      title: "Project",
      collapsable: false,
      children: ["/landing/project/contribution"],
    },
    {
      path: "/landing/getting-started/",
      title: "Getting Started",
      collapsable: false,
      children: [
        "/landing/getting-started/prepare-shopware",
        "/landing/getting-started/upgrade",
      ],
    },
    {
      path: "/landing/fundamentals/",
      title: "Fundamentals",
      collapsable: false,
      children: ["/landing/fundamentals/cli", "/landing/fundamentals/security"],
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
      ],
    },
    {
      path: "/landing/operations/",
      title: "Operations",
      collapsable: false,
      children: [
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
