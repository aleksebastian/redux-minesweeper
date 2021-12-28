module.exports = {
  mode: "development",
  entry: __dirname + "/client/src/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
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
  devServer: {
    static: __dirname + "/client/dist",
    compress: true,
    // open: true,
    // To open with your browser of choice comment line above and uncomment lines below
    open: {
      app: {
        name: "Brave Browser",
      },
    },
  },
};
