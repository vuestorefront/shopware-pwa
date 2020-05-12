---
sidebar: auto
---

# Contribution Guide

## How to start

Before you start contributing, you should fork this repository and pick up the issue. 

**Issues, labeled with `core-team`, `shopware-task` are reserved for Shopware-PWA Core Team Members and Shopware Core Team**. 

To find community tasks [click here](https://github.com/DivanteLtd/shopware-pwa/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+-label%3A%22Shopware+Task%22+-label%3A%22Core+Team%22+) or use following filter in the issues:

``` 
is:open is:issue -label:"Shopware Task" -label:"Core Team" 
```

After choosing the task, you can solve the problem and create a pull request (PR). Feature requests should be discussed on our Slack channel (please see the link in [README.md](https://github.com/DivanteLtd/shopware-pwa)). After the discussion, please create the issue describing your request.

**Github Project Broad is intended only for core developers.**

**Please read the code of conduct and follow it in all your interactions with the project.** 

Thank you for your interest and engagement! :)

You may want to read:

- [See the file structure explained](./STRUCTURE.md)
- [Project documentation / General README.md](./README.md)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

## Branches

For all of the codebase changes please create a new branch. Its name should fit into this template: `<task type eg. feat, fix, chore>/<package eg. cli, client, theme, if there is a global task this part can be omitted>/<short task description is written in kebab-case>-<issue number (also optional)>`, here are some examples:

- `feat/theme/add-carousel-to-product-details`
- `chore/update-project-dependencies`
- `fix/cli/missing-dependencies-#233`

## Commits

After resolving the pull request, all the commits will be automatically squashed into one. Any commit messages, which do not fit [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) convention would be not included in the list of commit messages. We do not recommend to squash the commits after opening the PR manually. To update your branch to the current master please use `git merge`.

## Tests

We keep 100% test coverage for our packages (except `default-theme`). Before opening a pull request, make sure all tests pass and coverage does not decrease. For further information please read the documentation.

Please, remember to always during development have opened terminal with `yarn test --watch` command fired.

## Pull requests

There is a Pull Request template, that contributors should follow. To merge a branch into master at least one core team member must accept the changes. All continuous integration checks must pass. Note that, only Shopware-PWA Core Team Members are allowed to accept pull requests.

If you face any problems during the implementation of the complex issue, feel free to implement just a part of it and ask for help in the comment. It's OK if you can only handle styling/tests/whatever. 

In case of any problems feel free to contact us in comments or our Slack channel. :)
