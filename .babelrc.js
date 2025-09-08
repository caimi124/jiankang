module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-env': {
          targets: {
            chrome: '91',
            firefox: '90',
            safari: '14',
            edge: '91'
          },
          modules: false,
          useBuiltIns: false,
          corejs: false
        }
      }
    ]
  ],
  plugins: []
}