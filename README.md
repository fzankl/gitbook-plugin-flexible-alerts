# GitBook Plugin: Modern Alerts

This GitBook Plugin converts blockquotes into beautiful alerts.

![Modern Alerts](.github/readme.png)

## Installation

### Step #1 - Update book.json file

1. In you gitbook's book.json file, add `modern-alerts` to plugins list.
2. In pluginsConfig, set base value which is base path to your github or gitlab or other code repo. Trailing slash is NOT required.
3. By default link label will be "Edit This Page". You can change it using plugin config label.

Sample `book.json` file for gitbook version 2.0.0+

```json
{
  "plugins": [
    "modern-alerts"
  ]
}
```

Sample `book.json` file for gitbook version 2.0.0+ and custom headings

```json
{
  "plugins": [
    "modern-alerts"
  ],
  "pluginsConfig": {
    "modern-alerts": {
      "style": "callout",
      "note": "Hinweis",
      "tip": "Tipp",
      "warning": "Warnung",
      "danger": "Achtung"
    }
  }
}
```

Sample `book.json` file for gitbook version 2.0.0+  and multilingual headings

```json
{
  "plugins": [
    "modern-alerts"
  ],
  "pluginsConfig": {
    "modern-alerts": {
      "style": "callout",
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

Note: Above snippet can be used as complete `book.json` file, if your book doesn't have one yet.

### Step #2 - gitbook commands

1. Run `gitbook install`. It will automatically install `modern-alerts` gitbook plugin for your book. This is needed only once.
2. Build your book (`gitbook build`) or serve (`gitbook serve`) as usual.

## Usage

### Note

```markdown
> [!NOTE]
> An alert of type 'note' using global style 'callout'.
```

### Tip

```markdown
> [!TIP]
> An alert of type 'note' using global style 'callout'.
```

### Warning

```markdown
> [!WARNING]
> An alert of type 'note' using global style 'callout'.
```

### Danger

```markdown
> [!DANGER]
> An alert of type 'note' using global style 'callout'.
```

## Troubleshooting

Please create an [issue](https://github.com/zanfab/gitbook-plugin-modern-alerts/issues) for bugs and contributions.

## How this work?

## Changelog
01/04/2019 - Initial release