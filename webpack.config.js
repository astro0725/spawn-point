const path = require("path");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  // The entry point file described above
  entry: "./src/index.js",
  // The location of the build folder described above
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.handlebars$/,
        loader: "handlebars-loader",
      },
    ],
  },
  optimization: {
    minimize: true,
  },
};
