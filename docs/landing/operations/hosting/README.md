# Hosting

## General

Shopware PWA is based on Nuxt.js and uses the server-side-rendering (in [their documentation](https://nuxtjs.org/guide/commands/#production-deployment) referred to as `Universal SSR`) features provided by their core. The application server used by Nuxt.js is written in **Node.js**, so in order to host Shopware PWA you need to provision Node.js nodes.

The Nuxt application server is _stateless_ which means that no application state gets persisted on the server once it has been started. It also means that in can be scaled horizontally very easily. In fact, for redundancy purposes you should run at least two nodes in parallel to make sure your frontend is always accessible even if one node would crash.

## Requirements

Your runtime nodes need to fulfill the following requirements:

**Infrastructure**

You can run a single application node, but it is good practice to provision **at least** two nodes that serve the application for redundancy purposes. An ALB (_application load balancer_) should be configured to forward traffic between those nodes. There are a lot of [hosting platforms](/landing/operations/deployment/#guides) that take all the configuration for you.

**Versions**

- Node.js version 12.x (LTS)
- Yarn 1.22 or similar NPM version

The requirements for runtime and build time are the same.

## Updates

Updates can be handled in a zero-downtime fashion thanks to the stateless design of the application server. Whenever you're building a new version, it is advised to spawn a separate node that builds and runs the application. As soon as the new node is ready, the LB is informed to direct traffic to your newly created node. This also enables the option to provision multiple versions of your application at the same time and do A/B testing based on your LB configuration.
