# Contributing Guidelines

## How to start

Before you start contributing, you should fork this repository and pick up the issue. **Issues, that label is `core-team`, `shopware-task` are only reserved for core team members or Shopware team**, for available task you can search using this query:

``` 
is:open is:issue -label:"Shopware Task" -label:"Core Team" 
```

After choosing the task, you can solve the problem and create a pull request (PR). Any features request should be discussed on our slack channel (link is in general project README.md) and then should be created an issue for them.

**Github Project Broad is intended only for core developers.**

**Please note we have a code of conduct, please follow it in all your interactions with the project.** 

Thank you for your interest in, and engagement!

You may also want to read:

- General project README.md
- Project documentation
-  [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

## Branches

For any new feature should be created a new branch, which name should fit this template: `<task type eg. feat, fix, chore>/<package eg. cli, client, theme, if there is a global task this part can be ommited>/<short task description written in kebab-case>-<issue number (also optional)>` `, here are some examples:

- `feat/theme/add-carousel-to-product-details`
- `chore/update-project-dependancies`
- `fix/cli/missing-dependancies-#233`

## Commits

All commits after resolving the PR are squashed to one, so any commit messages that not fit to [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) convention would be not included in the commit messages list. We also recommend you to not squash commits after opening the PR, to update your branch with current master you should use `git merge`.

## Tests

We are trying to keep 100% test coverage for our packages (except default-theme), so before creating new PR make sure that all tests are passed and coverage does not decrease. For further information please, read the documentation.

## Pull requests

There is a Pull Request template, that any contributor should follow. To merge a branch into master there must be two accepted code reviews and all checks have to be passed. Note that only the core team member can accept the PR

If you can't handle some parts of the issue feel free to ask in the comment. It's absolutely OK if you can only handle styling/tests/whatever. 
