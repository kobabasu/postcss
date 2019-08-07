module.exports = {
  map: true,

  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    'postcss-for-variables': {},
    'postcss-for': {},

    'postcss-preset-env': {
      stage: 3,
      preserve: false,
      features: {
        'nesting-rules': true
      }
    }
  }
}
