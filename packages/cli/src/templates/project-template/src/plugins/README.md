# PLUGINS

**This directory is not required, you can delete it if you don't want to use it.**

This directory contains Javascript or TypeScript plugins that you want to run before mounting the root Vue.js application.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/guide/plugins).

## Auto-register .js and .ts plugins

All files with `.js` or `.ts` extension, located under `src/plugins` path of your project - will be AUTOMATICALLY registered as a Nuxt plugin (`client` or `server` suffixes of the plugin filenames are still valid).

That means that **you don't need to do it manually** using dedicated entires in `nuxt.config.js` because it will be loaded twice.

## Disable auto-register

In order to avoid auto-registration of the plugins, keep a plugin in a different place (not in `src/plugins`) and register it on your own via entry in `nuxt.config.js` file.
