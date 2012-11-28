module.exports = {
  appDir: 'src',
  baseUrl: 'js/',
  mainConfigFile: 'src/js/common.js',
  dir: 'www',
  modules: [
    {
      name: 'common',
      include: [
          'jquery',
          'underscore',
          'handlebars',
          'hbs',
          'i18nprecompile',
          'json2',
          'Class'
      ]
    },
    {
        name: 'app/room',
        exclude: ['common']
    },
    {
        name: 'app/lobby',
        exclude: ['common']
    }
  ]
};