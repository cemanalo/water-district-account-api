const path = require("path");
const fs = require("fs");
const nodeExternals = require("webpack-node-externals");

const getHandlers = () => {
  const handlersBaseDir = "./src/handlers/";
  const handlers = fs.readdirSync(path.resolve(__dirname, handlersBaseDir));
  const entryPoint = handlers.reduce((acc, filename) => {
    const key = filename.split(".")[0];
    acc[key] = `./src/handlers/${filename}`;
    return acc;
  }, {});
  console.log({ handlers: entryPoint });
  return entryPoint;
};

module.exports = {
  mode: "development",
  entry: getHandlers(),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name]/[name].js",
    path: path.resolve(__dirname, ".dist"),
    libraryTarget: "commonjs2",
  },
  devtool: "eval-source-map",
  externals: [nodeExternals()],
  externalsPresets: {
    node: true, // in order to ignore built-in modules like path, fs, etc.
  },
  target: "node",
};
