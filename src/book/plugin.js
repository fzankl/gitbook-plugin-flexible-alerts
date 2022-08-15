function findAlertSetting(input, key, fallback, callback) {
  const match = (input || '').match(new RegExp(`${key}:(([^\\r\\n|]*))`));
  if (!match) {
    return callback ? callback(fallback) : fallback;
  }

  return callback ? callback(match[1]) : match[1];
}

require(['gitbook', 'jQuery'], function (gitbook, $) {
  gitbook.events.bind('page.change', function () {
    const options = gitbook.state.config.pluginsConfig['flexible-alerts'];

    $('blockquote').each(function () {
      const origin = $(this).html();
      const content = origin.replace(/\[!(\w*)((?:\|\w*:.*)*?)\]([\s\S]*)/g, (match, key, settings, value) => {
        const config = options[key.toLowerCase()];

        if (!config) {
          return match;
        }

        // Style configuration
        const style = findAlertSetting(settings, 'style', options.style);
        let isIconVisible = findAlertSetting(settings, 'iconVisibility', 'visible', (value) => value !== 'hidden');
        let isLabelVisible = findAlertSetting(settings, 'labelVisibility', 'visible', (value) => value !== 'hidden');
        let label = findAlertSetting(settings, 'label', config.label);
        const icon = findAlertSetting(settings, 'icon', config.icon);
        const className = findAlertSetting(settings, 'className', config.className);

        // Label can be language specific and could be specified via user configuration
        if (typeof label === 'object') {
          const language = gitbook.state.innerLanguage;

          if (language && Object.prototype.hasOwnProperty.call(label, language)) {
            label = label[language];
          } else {
            isLabelVisible = false;
            isIconVisible = false;
          }
        }

        const iconTag = `<i class="${icon}"></i>`;

        return (
          `<div class="alert ${style} ${className}">
              <p class="title">
                  ${isIconVisible ? iconTag : ''}
                  ${isLabelVisible ? label : ''}
              </p>
              <p>${value}
            </div>`
        );
      });

      // Do not change blockquotes without alert indicator.
      if (content !== origin) {
        $(this).replaceWith(content);
      }
    });
  });
});
