module.exports = (ctx) => ({
  map: ctx.options.map,

  parser: ctx.options.parser,

  autoprefixer: { browsers: 'last 2 versions' },

  'local-plugins': true,

  plugins: [
    require('postcss-import')({
      path: [
        "vendor/normalize.css/",
        "vendor/animate.css/",
        "vendor/fontawesome/css/",
        "vendor/material-design-icons-iconfont/dist/"
      ]
    }),

    require('postcss-url')(),

    // require('cssnano')(),

    require('postcss-reporter')(),

    require('postcss-flexibility')(),

    require('postcss-cssnext')({
      warnForDuplicates: false
    }),

    require('postcss-mixins')(),

    require('postcss-extend')(),

    /*
     * default: path to example
     */

    require('postcss-assets')({
      relative: 'example/css/',
      basePath: 'admin/postcss/',
      loadPaths: ['example/imgs/']
    }),

    /*
     * assets settings for admin case
     */

    /*
    require('postcss-assets')({
      relative: '../css/',
      basePath: 'admin/postcss/',
      loadPaths: ['../imgs/']
    }),
    */

    require('postcss-discard-comments')(),

    require('lost')()
  ]
})
