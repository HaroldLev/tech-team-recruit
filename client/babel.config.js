module.exports = {
  plugins: [
    '@babel/plugin-transform-class-properties'
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          browsers: [
            'last 2 Chrome versions',
            'last 2 Firefox versions',
            'last 2 Edge versions',
            'last 2 Opera versions',
            'last 2 Safari versions',
            'last 2 iOS versions',
          ],
        },
        useBuiltIns: 'entry',
        corejs: '3.9',
      },
    ],
    [
      '@babel/preset-react',
      {
        useSpread: true,
        runtime: 'automatic',
      },
    ],
    '@babel/preset-typescript',
  ],
};
