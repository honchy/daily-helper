const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
      }
    ]
  },
  resolve: {
    alias: {
      "@service": path.join(PROJECT_ROOT, "./src/service"),
      "@window": path.join(PROJECT_ROOT, "./src/window")
    }
  },
  plugins: [new CleanWebpackPlugin()]
};

const WebProcessConfig = {
  entry: {
    "page/main/index": "./src/page/main"
  },
  output: {
    filename: "[name].js",
    path: path.join(OUTPUT_PATH, "web-resource")
  },
  mode,
  devtool: "cheap-source-map",
  target: "electron-renderer",
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
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          mode === "production" ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              localsConvention: "dashesOnly",
              modules: {
                localIdentName: "[name]__[local]--[hash:base64:5]"
              },
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("cssnext"), require("precss")]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|svg|ttf)$/,
        loader: "url-loader",
        options: {
          limit: -1,
          name: "[name]@[hash].[ext]",
          outputPath: "web-resource/asset"
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "page/main/index.html",
      chunks: ["page/main/index"]
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules|dist/
  }
};
module.exports = [NodeProcessConfig, WebProcessConfig];
