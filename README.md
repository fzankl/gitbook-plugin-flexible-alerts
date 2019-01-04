# GitBook Plugin: Modern Alerts

This GitBook Plugin converts blockquotes into beautiful alerts. Look and feel can be configured so the alerts fit your needs (some examples are shown below).

![Sample alerts created with plugin 'modern-alerts'](https://user-images.githubusercontent.com/44210522/50688702-ea774f00-1026-11e9-9281-ca615cb466f5.jpg)

## Installation

### Step #1 - Update book.json file

1. In you gitbook's book.json file, add `modern-alerts` to plugins list.
2. In pluginsConfig, set base value which is base path to your github or gitlab or other code repo. Trailing slash is NOT required.
3. By default style 'callout' and headings 'Note', 'Tip', 'Warning', 'Attention' will be used. You can change it using plugin configuration via `book.json` or for a single alert in your markdown files.

**Sample `book.json` file for gitbook version 2.0.0+**

```json
{
  "plugins": [
    "modern-alerts"
  ]
}
```

**Sample `book.json` file for gitbook version 2.0.0+ and style `flat` instead of `callout`**

```json
{
  "plugins": [
    "modern-alerts"
  ],
  "pluginsConfig": {
    "modern-alerts": {
      "style": "flat"
    }
  }
}
```

**Sample `book.json` file for gitbook version 2.0.0+ and custom headings**

```json
{
  "plugins": [
    "modern-alerts"
  ],
  "pluginsConfig": {
    "modern-alerts": {
      "note": "Hinweis",
      "tip": "Tipp",
      "warning": "Warnung",
      "danger": "Achtung"
    }
  }
}
```

**Sample `book.json` file for gitbook version 2.0.0+  and multilingual headings**

```json
{
  "plugins": [
    "modern-alerts"
  ],
  "pluginsConfig": {
    "modern-alerts": {
      "note": {
          "de": "Hinweis",
          "en": "Note"
      },
      "tip": {
          "de": "Tipp",
          "en": "Tip"
      },
      "warning": {
          "de": "Warnung",
          "en": "Warning"
      },
      "danger": {
          "de": "Achtung",
          "en": "Attention"
      }
    }
  }
}
```

Note: Above snippets can be used as complete `book.json` file, if one of these matches your requirements and your book doesn't have one yet.

### Step #2 - gitbook commands

1. Run `gitbook install`. It will automatically install `modern-alerts` gitbook plugin for your book. This is needed only once.
2. Build your book (`gitbook build`) or serve (`gitbook serve`) as usual.

## Usage

To use the plugin just modify an existing blockquote and prepend a line matching pattern `[!type]`, using on of following types. Please see code snippets for working alerts.

* NOTE
* TIP
* WARNING
* DANGER

```markdown
> [!NOTE]
> An alert of type 'note' using global style 'callout'.
```

```markdown
> [!NOTE|style:flat]
> An alert of type 'note' using alert specific style 'flat' which overrides global style 'callout'.
```

As you can see in the second snippet output can be configured on alert level also. Supported options are listed in following table:

| Key            | Allowed value |
| --------------- | ---- |
| style | callout, flat |
| label  | any text |
| labelVisibility | visible (default), hidden |
| iconVisibility  | visible (default), hidden |

Multiple options can be used for single alerts as shown below:

```markdown
> [!NOTE|style:flat|label:My own heading|iconVisibility:false]
> An alert of type 'note' using alert specific style 'flat' which overrides global style 'callout'. In addition, this alert uses an own heading and hides specific icon.
```

![Custom alert](https://user-images.githubusercontent.com/44210522/50689970-04676080-102c-11e9-9cbc-8af129cb988c.png)

## Troubleshooting

If alerts do no look as expected, check if your `book.json` as well as alerts in Markdown are valid according to this documentation.

## Changelog
01/04/2019 - Initial release