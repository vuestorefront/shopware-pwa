# Translations & Snippets

In this chapter you'll learn how to work with snippets, locales and translations and what all of those terms mean in the context of Shopware PWA.

The guide is structured into multiple sections answering the following questions

- How are snippets handled and how do snippet files work
- How do I add my custom snippets to my project or correctly override existing ones
- How can I use Shopware to manage my application snippets

## Snippet files

Shopware PWA comes prepackaged with several snippet files which can be used in your project. Whenever you run

```bash
$ shopware-pwa languages
```

the CLI will collect all files and merge them into a single file **per locale** located in

```
.shopware-pwa/sw-plugins/locales/[locale-code].json
```

Depending on the currently selected language, the application will automatically pick the correct snippet file and make those snippets available in your components.

### Plugins

Not only Shopware PWA itself can serve snippets, plugins also can. In order to provide snippets along with your plugin, just create a `locales` directory within the plugin PWA resources root. ([Find out more about plugin resources](/landing/concepts/plugins))

### Structure

Snippets files are simple collections of key value pairs. You can also apply a nested structure. Snippet keys can be natural. An example:

```json
// This (or similar) is a subset of your
// '.shopware-pwa/sw-plugins/locales/en-GB.json' file
// after running shopware-pwa languages

{
  "page": {
    "title": "Shopware PWA"
  },
  "account": {
    "register": "Register"
  },
  "Review": "Review",
  "Search for products": "Search for products"
}
```

:::warning
Whilst snippet keys are case-sensitive and can contain space characters, they **must not** contain the period `.` character or other special characters.

`"account.heading"` and `"Need support?"` are **invalid** snippet keys.

**Additionally**, they have to fulfill the [JSON Spec](https://www.json.org/json-en.html)
:::

## Custom snippets

Obviously, you'll come to a point where you require customized snippets within your application. Either to override existing ones or because you're introducing new ones within your custom components. You can add custom snippets by creating snippet files inside the `locales` directory of your project.

A custom snippet file might look like this:

```json
// locales/en-GB.json

{
  "page": {
    "title": "My fabulous Online Store"
  },
  "account": {
    "register": "Sign In"
  },
  "Review": "Rate this!",
  "Search for products": "Go find Something!"
}
```

Once you've added that file, all you need to do is restart your Dev-Server and all changes will be applied automatically.

## Management in Shopware

You can also leverage your Shopware Backend (more precisely, the admin panel) to manage snippets for PWA. In order to allow snippet management, we've prepared a helper command and this guide to make your life easier.

Why? - Well, because synchronizing snippets can be a cumbersome, tedious and annoying matter. But it doesn't have to be. You just have to be aware of a couple key ideas.

### When are snippets changed?

Snippet changes are not applied during runtime. Any change of snippets in a production environment requires a rebuild of the PWA. This is a highly opinionated statement, but we believe that snippets do not belong to the state of the application and, hence shouldn't be part of the data transferred between Shopware and the PWA at runtime. This has some implications.

### Where are snippets kept?

When we're using Shopware to manage our snippets, it is not clearly defined which part "owns" the snippets. Is it the PWA application's snippet files or rather Shopware's database? Or both? We take the following considerations:

- The single source of truth for all snippets is located in `.shopware-pwa/sw-plugins/locales/*.json`
- The single source of truth for custom snippets is located in `locales/*.json`
- Shopware acts as a snippet manager and snippets are synced (between Shopware and PWA) using CLI commands

## CLI Command

The `shopware-pwa snippets` command helps receiving snippets (pull) from Shopware and sending them to Shopware (push).

```
$ shopware-pwa snippets
```

### Arguments

| Argument     | Description                                      |
| :----------- | :----------------------------------------------- |
| `--username` | Admin user name with privileges to read snippets |
| `--password` | Admin user password                              |

### Options

| Option         | Description                                        |
| :------------- | :------------------------------------------------- |
| `--keep-local` | Prioritize local snippets when merging with remote |
| `--export`     | Push local snippets to Shopware                    |
| `--ci`         | No interactive CLI (suppress questions)            |

### Description

Without options, it pulls all snippets from Shopware and merges them with your project locale files located in `locales`, giving priority to the snippets coming from Shopware.

When executed with `--keep-local`, it switches the priority.

When executed with `--export`, it **also** pushes snippets located in `locales` to Shopware **after** doing the obove.

Run with both options to override all snippets in Shopware with local ones.

### Usage

:::warning
When you intend to use snippets in PWA, **do not** create them in the Admin Panel. This will break the synchronization mechanism between Shopware and the PWA and may result in loss of snippets.

Instead, create them in your PWA project `locales/*.json` and then export them to Shopware.
:::

#### 1. Initially sync your snippets with Shopware

```
$ shopware-pwa snippets --export
```

Now, log in to your Admin Panel, navigate to **Settings** > **Snippets** and select a snippet set.

To filter for pwa snippets, open the filtering dialog from the right toolbar, expand the _Author_ section and hit the switch next to `app/pwa`. You can see all the snippets you've exported.

Change some snippet values by clicking the snippet name and editing the fields in the **Translations** card.

#### 2. Import the changed snippets to your project

```
$ shopware-pwa snippets
```

Confirm, that your `locales/*.json` files contain the modified values from Shopware.

Whenever you add new entries to your `locales/*.json` file make sure to follow Step 1.

#### 3. To override snippets in Shopware with your local values

```
$ shopware-pwa snippets --keep-local --export
```

## Known limitations / issues

The current implementation does have some limitations and issues which we are aware of:

- When there are multiple snippet sets with the same locale configured in Shopware, the management won't work.
- We have not yet tested to which limit the snippet import works
