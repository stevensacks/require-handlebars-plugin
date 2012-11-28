requirejs.config({
    baseUrl: './js',

    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        }
    },
    paths: {
        jquery: 'lib/jquery.1.8.3',
        underscore: 'lib/underscore',
        handlebars: 'lib/Handlebars',
        hbs: 'lib/hbs',
        i18nprecompile: 'lib/i18nprecompile',
        json2: 'lib/json2',
        'Class': 'app/utils/Class'
    },

    locale: "en_us",

    // default plugin settings, listing here just as a reference
    hbs : {
        templateExtension : 'hbs',
        // if disableI18n is `true` it won't load locales and the i18n helper
        // won't work as well.
        disableI18n : false
    }
});