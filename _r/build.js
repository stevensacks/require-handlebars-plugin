({
    appDir: "../src",
    baseUrl: "js/",
    dir: "../bin",
    //Comment out the optimize line if you want
    //the code minified by UglifyJS
    optimize: "none",

    optimizeCss: "standard",
    // optimize: "none",
    // inlining ftw
    inlineText: true,

    pragmasOnSave: {
        //removes Handlebars.Parser code (used to compile template strings) set
        //it to `false` if you need to parse template strings even after build
        excludeHbsParser : true,
        // kills the entire plugin set once it's built.
        excludeHbs: true,
        // removes i18n precompiler, handlebars and json2
        excludeAfterBuild: true
    },

    paths: {
        jquery: 'lib/jquery.1.8.3',
        underscore: 'lib/underscore',
        handlebars: 'lib/Handlebars',
        hbs: 'lib/hbs',
        i18nprecompile: 'lib/i18nprecompile',
        json2: 'lib/json2'
    },

    locale: "en_us",

    // default plugin settings, listing here just as a reference
    hbs : {
        templateExtension : 'hbs',
        // if disableI18n is `true` it won't load locales and the i18n helper
        // won't work as well.
        disableI18n : false
    },

    modules: [
        {
            name: 'room',
            exclude: ['jquery']
        }
    ]
})
