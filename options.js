module.exports = {
  appDir: 'src',
  baseUrl: 'js/',
  mainConfigFile: 'src/js/core.js',
  dir: 'www',
  keepBuildDir: true,
  modules: [
    {
      name: 'core',
      include: [
          'jquery',
          'underscore',
          'backbone',
          'handlebars',
          'hbs',
          'i18nprecompile',
          'json2',
          'Class'
      ]
    },
    {
        name: 'room',
        exclude: ['core']
    },
    {
        name: 'lobby',
        exclude: ['core']
    }
  ]
};