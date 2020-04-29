---
sidebar: auto
---

# CMS

::: tip
This documentation does not explain how to create custom pages that contain static content or use non-cms related endpoints. You can follow the Nuxt.js documentation on [pages](https://nuxtjs.org/guide/views/#pages) as Shopware PWA is a Nuxt.js project.
:::

# Intro

[[toc]]

During the implementation of shopware-pwa and even more during our constant exchange with community members it appeared that we are lacking a clear explanation of the internal structure of the Shopware CMS and how it translates to the PWA application.

In this guide I will assume you have a general knowledge of

 * Content management in Shopware 6 using Shopping Experiences
 * Setting up shopware-pwa

## Structure

So let's start easy, by taking a look at the page structure as provided by the Shopware Store API (earlier Sales-Channel API).

```js
page: {
	sections: [{
		blocks: [{
			slots: [{
				"slot": "content",
				"type": "product-listing",
				...
			}]
		}, ...]
	}, ...]
}
```

It is a tree where the root node is a page. Each page can have multiple sections. Each section can contain multiple blocks. Each block can have zero or more slots where each slot contains exactly one element. Easy as that.

Let's go through these structural components step by step, before we discuss the structure based on this page:

![Storefront](./../assets/storefront.png)

### Page

A page serves as a wrapper and contains all content information as well as a `type` which denotes whether it serves as a

* Category / Listing page
* Shop page
* Static page

### Section

Defines a horizontal container segment within your page which can be either:

* Two-Columns which we refer to as `sidebar` and `content` or
* A single column

### Block

A block represent a unit spanning an entire row which can provide custom layout and stylings. For UI purposes blocks are clustered into categories such as:

* Text
* Images
* Commerce
* Video

Each block can contain none up to multiple **slots**. To be more clear, I will use an example - take the following block:

```js {2,4}
block: {
	type: "text-hero",
	slots: [{
		type: "text",
		slot: "content",
		config: {
			content: {
				source: "static",
				value: "Hello World"
			}
		},
	}]
}
```

Pretty clear what this will look like - we will have a hero block, containing the text "Hello World". But having `type: "text-hero"` and `"type": "text"` in this nested structure might feel somewhat redundant you might think - of course there will be a text shown.

Let's take a step back and look at another example:

```js {2,4}
block: {
	type: "text-hero",
	slots: [{
		type: "image",
		slot: "content",
		config: {
			media: {
				source: "static",
				value: "ebc314b11cb74c2080f6f27f005e9c1d"
			}
		},
		data: {
			media: {
				url: "https://my-shop-host.com/media/ab/cd/ef/image.jpg"
			}
		}
	}]
}
```

Well, now we still have the `text-hero` block but suddenly it contains an image. That is due to the internal structure of our CMS and the generic purpose of blocks. The **slots** defined by a block are abstract. In the examples shown above, the text-hero block only contains one slot, named `content`.

### Elements

Elements are the "primitives" in our tree hierarchical of structural components. Elements have no knowledge of their context and usually just contain very little markup. Ultimately and most importantly, elements are rendered inside the slots of their "parent" blocks.

Types of elements comprise

* text
* image
* product-listing
* video


### Wrap-up

Now that we have a proper understanding of all the components involved, we can look at the page shown before. I've used color coding to highlight the different types of components.

 * **Page** blue
 * **Section** yellow (*opposed to the horizontal one, the dotted vertical line indicates the column separation, not a separate section*)
 * **Block** green
 * **Element** purple

![Storefront](./../assets/storefront_structure.png)


## Implementation and Extension

After that introduction we can start finding our way around `shopware-pwa`. After you have initialized a new project using the `shopware-pwa init` command, you will find a directory named `/cms` in your root. This will be your working area for the custom theme. Let's put that aside at the beginning and take a look into the internals to help us understand the process.

:::warning NOTE
The CMS implementation as well as the extension mechanism for it is part of the default-theme implementation. If you are creating a custom theme from scratch, be aware that you won't be able to use the mechanics described below.
:::

### Discovery

> If you want to skip the internals, [go to "Adding blocks and elements"](#adding-blocks-and-elements)

First, we switch into the default theme that comes with Shopware PWA.

```sh
cd node_modules/@shopware-pwa/packages/default-theme
```

If you are familiar with Nuxt.js you will probably recognize directories like `/pages`, `/components` or `/assets`. These files serve as a blueprint for your theme.

There is one directory named `/cms`. The internal structure of that directory is closely resembles the structure followed in the Shopware cure. Sections, blocks and elements are located in their resepective directories and you will have an easy time understanding it if you know Shopware and its CMS. Take a look into the different directories to get familiar with the structure.

::: tip MENTAL GLUE
Naming convention dictates the `cms/[section|element|block]/[component-type].vue` scheme for all CMS components.
:::

#### Resolving

Recall [what Showpare responds](#block) to your application when calling the API. It provides a `type` parameter for every section, block and element like `"text-hero"` or `"product-listing"`. Now we need to translate this to our components. It's no more than a mapping inside the `cmsMap.json` file. The app will take care of the rest.

:::details cmsMap.json

```json
{
  "sections": {
    "default": "CmsSectionDefault",
    "sidebar": "CmsSectionSidebar"
  },
  "blocks": {
    "text-on-image": "CmsBlockTextOnImage",
    "sidebar-filter": "CmsBlockDefault",
    "product-listing": "CmsBlockDefault",
    "image-text": "CmsBlockTextOnImage",
    "image": "CmsBlockDefault",
    "image-cover": "CmsBlockImageCover",
    "category-navigation": "CmsBlockCategoryNavigation",
    "image-bubble-row": "CmsBlockImageBubbleRow"
  },
  "elements": {
    "product-box": "CmsElementProductCard",
    "product-slider": "CmsElementProductSlider",
    "image": "CmsElementImage",
    "text": "CmsElementText",
    "vimeo-video": "CmsElementVideoVimeo",
    "youtube-video": "CmsElementVideoYoutube",
    "product-listing": "CmsElementProductListing",
    "category-navigation": "CmsElementCategoryNavigation",
    "sidebar-filter": "CmsElementCategorySidebarFilter"
  }
}
```

:::

Before we move on, we have to understand how we resolve the configuration (more specifically, the content of each block) internally. We will take the `image-bubble-row` as an example. An image bubble row contains three slots named `left`, `right` and `center`. The available slots have been defined in the Shopware Administration implementation of each block.

::: details How do I tell which slots my block contains?
The "single source of truth" for block and element configurations (i.e. their slots and defaults) are based on their respective Shopware Administration implementations.

For a reference, you can take a look at [this example showing such an implementation](https://github.com/shopware/platform/blob/master/src/Administration/Resources/app/administration/src/module/sw-cms/blocks/image/image-bubble-row/index.js) or the documentation on adding [custom elements](https://docs.shopware.com/en/shopware-platform-dev-en/how-to/custom-cms-element) and [custom blocks](https://docs.shopware.com/en/shopware-platform-dev-en/how-to/custom-cms-block) to Shopware.
:::

In the example below there is an image element rendered inside each slot:

![image bubble row with three images](./../assets/bubble-image.png)

The specific part of the API response that contains the `image-bubble-row` block will look similar to this:

```json {6,13,20}
{
  "type": "image-bubble-row",
  "slots": [
    {
      "type": "image",
      "slot": "center",
      "config": { ... },
      "fieldConfig": [ ... ],
      "data": { ... }
    },
    {
      "type": "image",
      "slot": "left",
      "config": { ... },
      "fieldConfig": [ ... ],
      "data": { ... }
    },
    {
      "type": "image",
      "slot": "right",
      "config": { ... },
      "fieldConfig": [ ... ],
      "data": { ... }
    }
  ]
}
```

You can see, that for every slot within the `image-bubble-block` there is one object provided. We refer to these objects as the **slot configuration**.

Each of these objects also contains a `type` field specifying the type of cms element yielded for that slot. By default there would be three images, but one could also be of `type: text`. It's totally up to the user to configure that and we have to be aware of that. A corresponding case could look like this:

![image-bubble-row containing a text element](./../assets/bubble-text.png)

For that reason, we introduced a generic element (namely `CmsGenericElement` in `cms/CmsGenericElement.vue`) which will resolve the correct element type and render it based on the configuration:

```vue
<template>
  <div class="cms-block-image-bubble-row">
    <CmsGenericElement
    	:content="getLeftContent"
    	class="cms-block-image-bubble-row__image" />
    <CmsGenericElement
    	:content="getCenterContent"
    	class="cms-block-image-bubble-row__image" />
    <CmsGenericElement
    	:content="getRightContent"
    	class="cms-block-image-bubble-row__image" />
  </div>
</template>
```

The identical pattern is applied to resolve the correct block types within cms sections and sections types within cms pages.

This will have us set up for our custom implementation.