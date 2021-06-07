# Shopware PWA

## Video demo

[![See video demo!](https://divante.com/github/shopware-pwa/shopware-pwa-miniature.png)](https://youtu.be/t2JJgvvxMG8)

## Join the community on Discord

If you have any questions or ideas feel free to join our discord: https://discord.vuestorefront.io.

## Introduction to Shopware-PWA

### What is Shopware-PWA?

It is a product, that will allow Shopware users to quickly set up a headless storefront for Shopware 6 eCommerce systems. It will provide all the PWA benefits like app-like experience, on-mobile-installation, service worker caching and more. Shopware-PWA by default will is equipped with a ready-to-go theme built on StorefrontUI.

It is a native integration dedicated for Shopware 6, which means all the Shopware developers will not have to learn new approaches and naming conventions. The goal of the product is to keep the entry threshold as low as possible to make further implementations fast and straightforward. The product will be compatible with the Shopware 6 Plugins Ecosystem.

### Tech stack

- [Vue Storefront](https://www.vuestorefront.io/)
- Shopware-6-Client based on Axios
- [StorefrontUI](https://www.storefrontui.io/)
- [VueJS](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)
- [TypeDoc](https://typedoc.org/)
- [VuePress](https://vuepress.vuejs.org/)

### What is Shopware-6-Client Library?

This is one of the critical components in Shopware-PWA architecture. It is a separate package built for TypeScript community to allow them to work with Shopware 6 API. It provides all the methods to work with SalesChannel-API of Shopware 6. Shopware-PWA uses that package for communication with Shopware backend.

### What is StorefrontUI?

It is an excellent design system for the UI layer of your eCommerce systems. Storefront UI is an independent, Vue.js-based, the library of UI components for developers, designers, and agencies striving to build fabulous storefronts.

Read more: https://www.storefrontui.io/.

### Caching approach

In Vue Storefront 1, we provided full offline support.

In Shopware-PWA we will go for a service worker caching. That means the product will use Shopware 6 logic through API instead of recreating all of the business logic in the frontend layer.

However, service workers will allow you to browse the catalogue offline.

---

## Software engineering standards

Before starting the implementation of Shopware-PWA, we’ve made an in-depth analysis of all our previous experience, that we earned during the implement of Vue Storefront 1. After gathering all the lessons learnt, we decided to build a tech-driven high-quality product, that will meet the business needs.

### Style Guide

We follow official VueJS coding standards - https://vuejs.org/v2/style-guide/.

We also setup Prettier (https://prettier.io/) on git pre-commit hook to automatically format all the code before pushing it to the remote repository. This way, we make sure that all the code’s been written using the same standards. It makes the process of learning the codebase of the product much easier and smoother for all the new developers.

### Coding standards

#### DO

##### Designing

- Always start working on a task by designing a view (define goals → state → actions).
- Every team member must accept "API interface".

##### Coding

- Follow official Vue.js style guide https://vuejs.org/v2/style-guide/
- Use Prettier locally.
- Run Linter before commit.
- Always change data by mutations.
- Log interactions with cache as this are hard to debug.
- Use Chrome debugger. Do not leave thousands of console.log().
- Use async awaits instead of promises.

##### Testing

- Write tests in Jest.
- Create one test file per method.

##### Tools

- Use Axios for handling HTTP requests.
- Experiment with Live Share for pair programming.

##### Code review

- At least one core team member must do a code review

##### Environment

- Always fix failing builds in CI as the top priority.

##### Committing

- Self-CR before commit. Do not assume others will check your dirty work.
- Delete pointless console.log() before commit.
- Adjust to commit message criteria to auto-generate changelog.

#### DO NOT

- Do not keep tokens in Vuex.
- Do not use EventBus.
- Do not make direct calls to UI from Vuex.
- Do not create callbacks hell. Do not overuse promises.

### Definition of Ready

#### User Stories

- Simplified User Story format to describe the issue is used - e.g., I want to `<goal>` So that `<reason>`.
- Epic (label) is assigned (the epic provides team members with background information and additional business value).
- Acceptance criteria are listed.
- Dependencies are identified, and no external dependencies would block the item from being completed (e.g. missing decision/information/implementation from other departments/development teams or missing tools).
- The user story is small enough to be completed in one sprint.
- The team knows what to do and do not see any blocking points.

#### Bugs

- The current behaviour is explained.
- Steps to reproduce are explained.
- The expected behaviour is defined.
- If possible, screenshot or gif is provided.

### Definition of Done

##### User Story

- All acceptance criteria are fulfilled.
- Code does not destroy build.
- All unit tests pass.
- Code meets our Coding standards.
- QA verifies the user story.
- The user story is tested on the newest browsers and newest-1 versions.
- At least minimal documentation is created.

##### Bugs

- Regression unit test is created.

### Pipeline & Continuous integration / delivery / deployment

We use CircleCI for continuous integration tool. In the pipeline, we run a few necessary checks, and we check if the unit tests coverage did not decrease and we rebuild the application to verify if the new code does not break up the build.

### Test coverage

In the early stages of the development, we decided to keep 100% of unit tests code coverage. That means you will not be surprised by the changed behaviour of the methods in your storefront product. If you break it, you will be notified by the tests.

In the next phases of development, we will make the following decisions associated with testing. We will probably cover critical paths with end2end testing.

Right now, for testing, we use the Jest framework - https://jestjs.io/.

### Versioning

Versioning of Shopware-PWA is not dependent on Shopware 6 versioning. We will stick to semantic versioning. As we build the package - all the packages for Shopware 7 (and so on) will have separate versioning.

### Change log

We experimentally use conventional commit messages to generate the changelog automatically. https://www.conventionalcommits.org

---

## Checklists

### Performance QA Checklist

- Bundle size verified with `webpack-bundle-analyzer`.
- Size lower than 300 kB for JS loaded immediately.
- Everything that may exceed 300 KB must be lazy-loaded.
