module.exports = (ctx) => ({
  map: ctx.options.map,

  parser: ctx.options.parser,

  autoprefixer: { browsers: 'last 2 versions' },

  'local-plugins': true,

  plugins: [
    require('postcss-import')({
      path: [
        // npmでnormalize.cssだけインストールしているため、
        // 以下はデフォルトでは不要。node_modulesは自動で読み込まれる
        // bower経由でインストールした場合は以下のようにする。
        //
        // "vendor/normalize.css/",
        // "vendor/animate.css/",
        // "vendor/fontawesome/css/",
        // "vendor/material-design-icons-iconfont/dist/"
      ]
    }),

    require('postcss-url')(),

    require('postcss-for-variables')(),

    require('postcss-for')(),

    require('postcss-cssnext')({
      warnForDuplicates: false
    }),
  ]
})
