var styleConfiguration = {
    note: {
        callout: {
            icon: '<i class="fa fa-info-circle"></i>',
            className: 'alert callout info'
        },
        flat: {
            icon: '<i class="fa fa-info-circle"></i>',
            className: 'alert flat info'
        }
    },
    tip: {
        callout: {
            icon: '<i class="fa fa-lightbulb-o"></i>',
            className: 'alert callout tip'
        },
        flat: {
            icon: '<i class="fa fa-lightbulb-o"></i>',
            className: 'alert flat tip'
        } 
    },
    warning: {
        callout: {
            icon: '<i class="fa fa-exclamation-triangle"></i>',
            className: 'alert callout warning'
        },
        flat: {
            icon: '<i class="fa fa-exclamation-triangle"></i>',
            className: 'alert flat warning'
        }
    },
    danger: {
        callout: {
            icon: '<i class="fa fa-ban"></i>',
            className: 'alert callout danger'
        },
        flat: {
            icon: '<i class="fa fa-ban"></i>',
            className: 'alert flat danger'
        } 
    }  
};

function findAlertSetting(input, key, fallback, callback) {
    var match = (input || '').match(new RegExp(`${key}:(([\\w\\s]*))`));

    if (!match) {
        return callback ? callback(fallback) : fallback;
    }

    return callback ? callback(match[1]) : match[1];
}

require(["gitbook", "jQuery"], function(gitbook, $) {
    gitbook.events.bind("page.change", function() {
        var gitBookConfiguration = gitbook.state.config.pluginsConfig['flexible-alerts'];

        $('blockquote').each(function() {
            var origin = $(this).html();
            var content = origin.replace(/\[!(\w*)((?:\|[\w*:[\w\s]*)*?)\]([\s\S]*)/g, (match, key, settings, value) => {
                // Style configuration
                var styleKey = findAlertSetting(settings, 'style', gitBookConfiguration['style']);
                var style = styleConfiguration[key.toLowerCase()][styleKey];
                
                // Heading configuration
                var isIconVisible = findAlertSetting(settings, 'iconVisibility', 'visible', (value) => value !== 'hidden');
                var isLabelVisible = findAlertSetting(settings, 'labelVisibility', 'visible', (value) => value !== 'hidden');
                var label = findAlertSetting(settings, 'label', gitBookConfiguration[key.toLowerCase()]);

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

                return (
                    `<div class="${style.className}">
                        <p class="title">${isIconVisible ? style.icon : ''}${isLabelVisible ? label : ''}</p><p>${value}
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
