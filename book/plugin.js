function findAlertSetting(input, key, fallback, callback) {
    var match = (input || '').match(new RegExp(`${key}:(([\\w\\s]*))`));

    if (!match) {
        return callback ? callback(fallback) : fallback;
    }

    return callback ? callback(match[1]) : match[1];
}

require(["gitbook", "jQuery"], function(gitbook, $) {
    gitbook.events.bind("page.change", function() {
        var options = gitbook.state.config.pluginsConfig['flexible-alerts'];

        $('blockquote').each(function() {
            var origin = $(this).html();
            var content = origin.replace(/\[!(\w*)((?:\|[\w*:[\w\s]*)*?)\]([\s\S]*)/g, (match, key, settings, value) => {
                var config = options[key.toLowerCase()]

                if (!config) {
                    return match;
                }
                
                // Style configuration
                var style = findAlertSetting(settings, 'style', options['style']);
                var isIconVisible = findAlertSetting(settings, 'iconVisibility', 'visible', (value) => value !== 'hidden');
                var isLabelVisible = findAlertSetting(settings, 'labelVisibility', 'visible', (value) => value !== 'hidden');
                var label = findAlertSetting(settings, 'label', config['label']);
                var icon = findAlertSetting(settings, 'icon', config['icon']);
                var className = findAlertSetting(settings, 'className', config['className']);

                // Label can be language specific and could be specified via user configuration
                if (typeof label === 'object') {
                    var language = gitbook.state.innerLanguage;

                    if (language && label.hasOwnProperty(language)) {
                        label = label[language];
                    } else {
                        isLabelVisible = false;
                        isIconVisible = false;
                    }
                }

                var iconTag = `<i class="${icon}"></i>`;

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
        })
    });
});
