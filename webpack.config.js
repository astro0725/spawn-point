const path = require("path");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  // The entry point file described above
  entry: "./src/index.js",
  devServer: {
    proxy: {
      '/routes': {
        target: 'http://localhost:3001', 
        secure: false
      }
    }
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
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
  // The location of the build folder described above
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
};
