module.exports = {
  map: true,

  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    'postcss-for': {},
    'postcss-for-variables': {},

    'postcss-preset-env': {
      stage: 3,
      preserve: false,
      features: {
        'nesting-rules': true
      }
    }
  }
}
