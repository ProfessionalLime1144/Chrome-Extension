const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: "production",
  devtool: 'cheap-module-source-map',
  entry: path.resolve(__dirname, "../src/contentScript"),
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "contentScript.js"
  },
  // Change the source map mode from eval to source-map
  devtool: "source-map",
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, "../src/manifest.json"), to: 'manifest.json' },
      ],
    }),
  ],
}
