# Versioning

The following part shows how we manage versions and branches in order to stay compatible with different API versions of Shopware and how we make sure to be able to provide backwards-compatible bugfixes.

## Introduction

Undertanding our versioning strategy requires a general understanding of git as a version control system as well as semantic versioning.

### Version number

The version number identifies a unique version of a certain project or package. It is usually separated into three parts, considered *major*, *minor* and *patch*. A new version is identified by a single commit which gets tagged as a certain version.

:::tip How do they look?
An exemplary version for Shopware PWA is

<span style="font-size: 2rem;">v0.2.1</span>

---

Worth noting - Shopware is adhering to a versioning scheme, where each components' significance is shifted one to the right. It looks like:

<span style="font-size: 2rem;">v6.3.0.1</span>

In that case, 3 is the major, 0 the minor and 1 the patch version. 6 is used to identify the "product family" and doesn't really have any meaning or implication.
:::

### Semantic versioning

So why do we do this? The three components of a version number are associated with strict promises regarding compatibility and functionality when they are incremented. Let's start with the smallest one:

#### Patch

Patch releases only contain small bugfixes or minor refactorings which don't interfere with the public API nor introduce any new incompabilites.

#### Minor

Minor releases can contain changes to the public API, however they have to be made in a backward-compatible, non-desctructive manner. New "features" are only included in minor releases


#### Major

Major releases contain API breaks, big refactorings, new modules or significant features. There is no guaranteed way to seamlessly upgrade from one major version to another.

## Why versioning?

Why couldn't we just have one number and incrementally increase it release by release? Great you're asking - unfortunately we can't have that. The main reason is that we don't just have to identify new releases. We also have to identify their compatibilities with regard to older versions. Let's look at an example:

### Example

With Version 6.3.0.0, Shopware dropped all API endpoints starting with `store-api/v1`.