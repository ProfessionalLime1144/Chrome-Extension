const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');


module.exports = {
  mode: "production",
  devtool: 'cheap-module-source-map',
  entry: {
    contentScript: path.resolve(__dirname, "../src/contentScript"),
    background: path.resolve(__dirname, "../src/background.js"),
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js"
  },
  // Change the source map mode from eval to source-map
  // devtool: "source-map",
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, "../src/manifest.json"), to: 'manifest.json' },
      ],
    }),
    new Dotenv({
      path: path.resolve(__dirname, "../.env"),
    }),
  ],
}