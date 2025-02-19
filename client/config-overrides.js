const { override, addWebpackResolve, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
  addWebpackResolve({
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  }),
  addWebpackModuleRule({
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  })
);
