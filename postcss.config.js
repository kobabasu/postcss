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

    require('cssnano')(),

    require('postcss-reporter')(),

    require('postcss-cssnext')({
      warnForDuplicates: false
    }),

    require('postcss-assets')({
      relative: 'example/css/',
      basePath: 'admin/postcss/',
      loadPaths: ['example/imgs/']
    }),

    require('postcss-discard-comments')(),

    require('lost')()
  ]
})
