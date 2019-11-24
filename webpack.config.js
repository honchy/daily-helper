const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const PROJECT_ROOT = __dirname;
const OUTPUT_PATH = path.join(PROJECT_ROOT, "dist");
const mode =
  process.env.NODE_ENV === "development" ? "development" : "production";

const NodeProcessConfig = {
  entry: {
    main: "./src/main.js"
  },
  output: {
    filename: "[name].js",
    path: OUTPUT_PATH
  },
  mode,
  devtool: "cheap-source-map",
  target: "electron-main",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: "url-loader",
          options: {
            limit: -1,
            name: "[name]@[hash].[ext]"
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      "@service": path.join(PROJECT_ROOT, "./src/service"),
      "@window": path.join(PROJECT_ROOT, "./src/window")
    }
  },
  plugins: [
    new CleanWebpackPlugin()
    // new CopyWebpackPlugin([{ from: "./src/index.html" }])
  ]
};

module.exports = [NodeProcessConfig];
