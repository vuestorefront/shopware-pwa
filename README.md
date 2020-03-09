# Shopware PWA

[![Build Status](https://travis-ci.org/DivanteLtd/shopware-pwa.svg?branch=master)](https://travis-ci.org/DivanteLtd/shopware-pwa) [![Coverage Status](https://coveralls.io/repos/github/DivanteLtd/shopware-pwa/badge.svg?branch=master)](https://coveralls.io/github/DivanteLtd/shopware-pwa) [![Greenkeeper badge](https://badges.greenkeeper.io/DivanteLtd/shopware-pwa.svg)](https://greenkeeper.io/)

The only Official Progressive Web App for <a href="https://github.com/shopware/platform">Shopware 6</a>. 

About Shopware: 

<a href="https://github.com/shopware/platform">Shopware 6</a> is the next generation of open source eCommerce software based on bleeding-edge technologies powered by Symfony and Vue.js. Focused on an API-first approach Shopware provides more flexibility and less complexity


PS: Check [StorefrontUI](https://github.com/DivanteLtd/storefront-ui/) - our UI library for eCommerce.


## See it in action

<table>
  <tbody>
    <tr>
      <td align="center" valign="middle">
        <a href="http://shopware-pwa-faint-money.now.sh/">
          <img
            src="https://divante.co/open-graph/vuestorefront/GitHub-Readme-Try-Demo.png"
            alt="B2C Theme demo"
            style="width: 100px;">
        </a>
      </td>
      <td align="left" valign="top">
        Try out our open demo and if you like it <strong> first give us some star on Github ★</strong> and then contact us on <a href="https://slack.vuestorefront.io">#shopware-pwa channel @ Vue Storefront Official Slack</a> or via contributors@vuestorefront.io. <br /><br /> This demo site is connected to <a href="https://github.com/shopware/platform">Shopware 6</a>. <br />
      </td>
    </tr>
  </tbody>
</table>

## Video demo

[![See video demo!](https://divante.com/github/shopware-pwa/shopware-pwa-miniature.png)](https://youtu.be/t2JJgvvxMG8)

## Join the community on Slack

If you have any questions or ideas feel free to join our slack: https://vuestorefront.slack.com via [invitation link](https://join.slack.com/t/vuestorefront/shared_invite/enQtNTAwODYzNzI3MjAzLWFkZjc0YjVjODA1Y2I2MTdlNmM0NThjY2M5MzgzN2U2NzE4YmE2YzA4YTM0MTY3OWQzZjBhMjBlZDhmYjAyNGI)

## Getting started

### Documentation

See [the documentation](https://shopware-pwa-docs.netlify.com/#introduction-to-shopware-pwa) to get started.

### Quick start

#### Installation

```bash
yarn global add @shopware-pwa/cli
```

or

```bash
npm install -g @shopware-pwa/cli
```

#### Usage

Create a directory for your project and enter it

```bash
mkdir my-shopware-pwa
cd ./my-shopware-pwa
```

initialize project inside directory

```bash
shopware-pwa init
```

after this you're connected to our test shopware instance and ready to run project locally

```bash
yarn dev
```

Your application will be available on [http://localhost:3000](http://localhost:3000).  
Now you have complete ShopwarePWA project running locally.

##### Running Shopware PWA on custom Shopware instance

1. add new file `shopware-pwa.config.js` inside root of the newly created project
2. fill it with your needs, example:

```js
module.exports = {
  shopwareEndpoint: "https://shopware-2.vuestorefront.io/sales-channel-api/v1",
  shopwareAccessToken: "SWSCMUDKAKHSRXPJEHNOSNHYAG"
};
```

3. run again `shopware-pwa init` and then `yarn dev`


Read full instruction in `CHEATSHEET.md` file.

### Development

Just type `yarn` to install node dependencies and run the post-install script that links unpublished packages. Now, you're ready to develop. You can watch the compilation process by running `yarn dev` or `yarn dev:<package-name> `to specify the package that you will be working on.  

Please, remember to always during development have opened terminal with `yarn test --watch` command fired.  

To start working on the default-theme go to `./packages/default-theme` and run `yarn`. After installation type `yarn dev`. The project will be available in your browser at http://localhost:3000.

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

* Simplified User Story format to describe the issue is used - e.g. - I want to `<goal>` So that `<reason>`.
* Epic (label) is assigned (the epic provides team members with background information and additional business value).
* Acceptance criteria are listed.
* Dependencies are identified and no external dependencies would block the item from being completed (e.g. missing decision / information / implementation from other departments / development teams or missing tools).
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
* User story is verified by QA.
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

---

## Troubleshooting
Common issues with solutions are kept in [troubleshooting](./TROUBLESHOOTING.md) page.