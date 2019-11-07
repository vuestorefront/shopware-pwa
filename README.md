# Shopware PWA
[![Build Status](https://travis-ci.org/DivanteLtd/shopware-pwa.svg?branch=master)](https://travis-ci.org/DivanteLtd/shopware-pwa)
[![Coverage Status](https://coveralls.io/repos/github/DivanteLtd/shopware-pwa/badge.svg)](https://coveralls.io/github/DivanteLtd/shopware-pwa) [![Greenkeeper badge](https://badges.greenkeeper.io/DivanteLtd/shopware-pwa.svg)](https://greenkeeper.io/)

[Documentation](https://shopware-pwa-docs.netlify.com/)

**This repository is not ready for external contributions**

## Installation 

### Quick setup

Just run `yarn`, and you're ready to develop.
Please remember to always during development have opened terminal with `yarn test --watch` command fired.

### Installation for using the package in some other project

1. Run `yarn`
2. Build package with types definition `yarn build --types`
3. Create symlink for local usage `yarn link-packages`
4. In another project (can be generated from vue-cli) link client package and install axios (nothing will happen if you already have axios there)

```bash
yarn link @shopware-pwa/shopware-6-client
yarn add axios
```
5. In main project file (`main.js`) setup shopware config

```js
import {setup} from "@shopware-pwa/shopware-6-client"

setup({
  endpoint: 'https://address-to-my-shopware-instance.com',
  accessToken: 'myaccesstoken'
})
```
6. Use ShopwareClient services around your project. Example:

```js
import { getCategories } from "@shopware-pwa/shopware-6-client"

// later in component

async mounted() {
  this.categories = await getCategories();
}
```

### Installation problems

**Q:** Problem with `yarn serve` on external project  
**A:** By default webpack resolves symlinks to their real location. 
Add `config.resolve.symlinks(false)` to your `vue.config.js` file ([read more here](https://cli.vuejs.org/guide/troubleshooting.html#symbolic-links-in-node-modules))

```js
module.exports = {
  chainWebpack: (config) => {
    config.resolve.symlinks(false)
  }
}
```
___

## Introduction to Shopware-PWA

### What is Shopware-PWA?

It is a product, that will allow Shopware users to easily setup headless storefront for Shopware 6 eCommerce systems. It will provide all the PWA benefits like app-like experience, on-mobile-installation, service worker caching and more. Shopware-PWA by default will be provided with ready-to-go theme built on StorefrontUI. 

It is a native integration dedicated for Shopware 6, which means all the Shopware developers will not have to learn totally new approaches and naming conventions. Goal of the product is to keep the entry threshold as low as possible to make the further implementations fast and simple. Product will be compatible with Shopware 6 Plugins Ecosystem.

### Tech stack

* [Vue Storefront](https://www.vuestorefront.io/)
* Shopware-6-Client based on Axios
* [StorefrontUI](https://www.storefrontui.io/)
* [VueJS](https://vuejs.org/)
* [Vuex](https://vuex.vuejs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Jest](https://jestjs.io/)
* [TypeDoc](https://typedoc.org/)
* [VuePress](https://vuepress.vuejs.org/)

### What is Shopware-6-Client Library?

One of the key components in Shopware-PWA architecture. It is a separate package built for TypeScript community to allow them to work with Shopware 6 API. It provides all the methods to work with SalesChannel-API of Shopware 6. Shopware-PWA uses that package for communication with Shopware backend.


### What is StorefrontUI?

It is a powerful design systems for UI layer of your eCommerce systems. Storefront UI is an independent, Vue.js-based, library of UI components for developers, designers, and agencies striving to build fabulous storefronts.  

Read more: https://www.storefrontui.io/

### Caching approach

In Vue Storefront 1 we provided full offline support. 

In Shopware-PWA we will go for service worker caching. That means the product will use Shopware 6 logic through API instead of recreating all of the business logic in the frontend layer. 

However, service workers will allow you to browse the catalog offline.
___

## Software engineering standards

Before starting the implementation of Shopware-PWA we’ve made a deep analysis of all our previous experience, that we earnt during the implement of Vue Storefront 1. After gathering all the lessons learnt, we decided bo build tech driven high quality product, that will meet the business needs.

### Style Guide

We follow official VueJS coding standards - https://vuejs.org/v2/style-guide/. 

We also setup Prettier (https://prettier.io/) on git pre-commit hook to automatically format all the code before pushing it to the remote repository. This way we make sure, that all the code’s been written using the same standards. It makes the process of learning the codebase of the product much easier and smoother for all the new developers.

### Coding standards

#### DO

##### Designing

* Always start working on a task by designing a view (define goals → state → actions).
* Every team member must accept "API interface".

##### Coding

* Follow official Vue.js style guide https://vuejs.org/v2/style-guide/
* Use Prettier locally.
* Run Linter before commit.
* Always change data by mutations.
* Log interactions with cache as this is hard to debug.
* Use Chrome debugger. Do not leave thousands of console.log().
* Use async awaits instead of promises.

##### Testing

* Write tests in Jest.
* Create one test file per method.

##### Tools

* Use axios for handling http requests.
* Experiment with Live Share for pair programming.

##### Code review

* Two people code review.

##### Environment

* Always fix failing builds in CI as the top priority.

##### Committing

* Self-CR before commit. Do not assume others will check your dirty work.
* Delete pointless console.log() before commit.
* Meet commit message criteria to auto-generate change log. 

#### DO NOT

* Do not keep tokens in Vuex.
* Do not use EventBus.
* Do not make direct calls to UI from Vuex.
* Do not create callbacks hell. Do not overuse promises. 

### Definition of Ready

#### User Stories

* Simplified User Story format to create Github issues is used - I want to `<goal>` So that `<reason>`.
* Milestone / epic is assigned (the milestone / epic provides team members with background information and additional business value).
* Acceptance criteria are listed.
* Dependencies are identified and no external dependencies would block the item from being completed (e.g. missing decision / information / implementation from other departments / development teams or missing tools).
* Technical requirements are listed.
* User story is estimated in story points (1, 2, 3, 5, 8, 13, 21, ?).
* User story is small enough to be completed in one sprint.
* Team knows what to do, and do not see any blocking points.

#### Bugs

* Current behavior is explained.
* Steps to reproduce are explained.
* Expected behavior is explained.
* If possible, screenshot or gif is provided.

### Definition of Done

##### User Story

* All acceptance criteria are fulfilled.
* Code does not destroy build.
* All unit tests pass.
* Code meets our Coding standards.
* Code is merged to develop branch.
* User story is verified by QA in develop branch.
* User story is tested on the newest browsers and newest-1 versions.
* At least minimal documentation is created.

##### Bugs

* Regression unit test is created.

### Pipeline & Continuous integration / delivery / deployment

We use TravisCI for continuous integration tool. In the pipeline we run a few basic checks, we check if the unit tests coverage did not decrease and we rebuild the application to verify if the new code does not break up the build.

You may find the whole history: https://travis-ci.org/DivanteLtd/shopware-pwa

Test eCommerce Page will be automatically deployed to following environment...

### Test coverage

In early stages of the development, we decided to keep 99% percent of unit tests code coverage. That means you will not be suprised by changed behaviour of the methods in your storefront product. If you break it, you will be notified by the tests.

In the next phases of development we will make the next decisions associated with testing. We will probably cover critical paths with end2end testing.

Right now for testing we use Jest framework - https://jestjs.io/.

### Greenkeeper - How do we keep dependencies up to date?

In Shopware-PWA project, we setup Greenkeeper for keeping all the dependencies up to date. In 2019, all the software development projects rely on many other tools and packages. It is close to impossible to keep all the dependencies up to date for a human being because that would take way too much time and it is very tiring and boring process. Because of that most projects suffered from using older version of dependent libraries. In fact, if you do not keep your dependencies up to that on a daily basis and you try to update these after longer period of time you usually end up with some crashes and you need to spend a few hours on getting the project up. 

Greenkeeper solves that problem by updating your dependencies automatically. After update it tests the application after all the automated tests in your application and if it is successful or not, you get full information about the result of an update. If it is successful then Greenkeeper creates ready-to-merge pull requests, that updates the dependency.

Read more: https://greenkeeper.io/

### Auto-generated technical documentation

Shopware-PWA automatically generates documentation and deploys it to https://shopware-pwa-docs.netlify.com/. Documentation is based on TypeDoc.

After the first months of development we will tidy all the information in the technical documentation. 

Read more: https://typedoc.org/

### Versioning

Versioning of Shopware-PWA is not dependent on Shopware 6 versioning. We will stick to semantic versioning. As we build the package - all the packages for Shopware 7 (and so on) will have separate versioning.

### Change log

We experimentally use conventional commit messages to automatically generate the change log. https://www.conventionalcommits.org

___

## Checklists

### Performance QA Checklist

* Bundle size verified with `webpack-bundle-analyzer`.
* Size lower than 300 kB for JS loaded immediately.
* Everything, that may exceed 300 KB must be lazy loaded.
___

## Instructions for 3-party tools

### Faker
faker.js - generate massive amounts of fake data in the browser and node.js

#### Sources
* [GitHub](https://github.com/marak/faker.js)
* [Playground](https://cdn.rawgit.com/Marak/faker.js/master/examples/browser/index.html)

#### Installation

```
yarn add faker
```

#### How to use
faker can be used by importing it with  `import faker from "faker"`  or import only the selected methods which are grouped by functionalities, here is a list of them:

-   address
-   commerce
-   company
-   database
-   date
-   finance
-   git
-   hacker
-   helpers
-   image
-   internet
-   lorem
-   name
-   phone
-   random
-   system
-   vehicle

##### Real world example:
```js
import { name, address, random, phone, internet } from "faker";

const customerData = {
  salutationId: random.uuid(),
  firstName: name.firstName(),
  lastName: name.lastName(),
  password: internet.password(8),
  email: internet.email(),
  billingAddress: {
    countryId: random.uuid(),
    street: address.streetName(),
    zipcode: address.zipCode(),
    city: address.city(),
    phoneNumber: phone.phoneNumber()
  }
}
```

___