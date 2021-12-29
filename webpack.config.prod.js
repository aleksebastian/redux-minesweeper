const CSSModuleLoader = {
  loader: "css-loader",
  options: {
    modules: true,
    localIdentName: "[name]_[local]_[hash:base64:5]",
    importLoaders: 2,
    camelCase: true,
    sourceMap: false, // turned off as causes delay
  },
};
// For our normal CSS files we would like them globally scoped
const CSSLoader = {
  loader: "css-loader",
  options: {
    modules: "global",
    importLoaders: 2,
    camelCase: true,
    sourceMap: false, // turned off as causes delay
  },
};
// Our PostCSSLoader
const autoprefixer = require("autoprefixer");
const PostCSSLoader = {
  loader: "postcss-loader",
  options: {
    ident: "postcss",
    sourceMap: false, // turned off as causes delay
    plugins: () => [
      autoprefixer({
        browsers: [">1%", "last 4 versions", "Firefox ESR", "not ie < 9"],
      }),
    ],
  },
};
// Standard style loader (prod and dev covered here)
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";
const styleLoader = devMode ? "style-loader" : MiniCssExtractPlugin.loader;

const CompressionPlugin = require("compression-webpack-plugin");
const zlib = require("zlib");

module.exports = {
  mode: "production",
  entry: __dirname + "/client/src/index.tsx",
  module: {
    rules: [
      {
        test: [/\.tsx$|.ts$/],
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          "style-loader",
          "@teamsupercell/typings-for-css-modules-loader",
          {
            loader: "css-loader",
            options: { modules: true },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: __dirname + "/client/dist",
  },
  devtool: "source-map",
  plugins: [
    new CompressionPlugin({
      filename: "[path][base].gz",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new CompressionPlugin({
      filename: "[path][base].br",
      algorithm: "brotliCompress",
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false,
    }),
  ],
};
