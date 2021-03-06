const path = require("path");
const CssPluginClass = require("extract-text-webpack-plugin"); //css 提出打包
const HtmlTemplatePlugin = require("html-webpack-plugin"); // html模板，自动引进js和css
const copyWebpackPlugin = require("copy-webpack-plugin");

const ROOT_PATH = path.resolve(__dirname, "./");
console.log(ROOT_PATH);
const BUILD_PATH = path.resolve(ROOT_PATH, "output");
const SRC_PATH = path.resolve(ROOT_PATH, "src");
const STATIC_PATH = path.resolve(ROOT_PATH, "static");
const JS_NAME = "js/[name].js";
const CSS_NAME = "css/[name].css";
const CSS_CLASS_NAME = "[name]_[local]_[hash:base64:4]";
const cssPlugin = new CssPluginClass(CSS_NAME, { allChunks: true });
const htmlPlugin = new HtmlTemplatePlugin({
  filename: path.resolve(BUILD_PATH, "index.html"),
  template: path.resolve(ROOT_PATH, "template", "index.html")
});
const copyPlugin = new copyWebpackPlugin([
  {
    from: path.resolve(STATIC_PATH),
    to: path.resolve(BUILD_PATH)
  }
]);
const TSFILEPATH = path.resolve(ROOT_PATH, "src", "react-typescript-todolists");

module.exports = {
  mode: "development",
  devtool: "eval",
  entry: {
    app: path.resolve(SRC_PATH, "app.js")
  },
  output: {
    filename: JS_NAME,
    path: BUILD_PATH,
    publicPath: "./" //所有打包资源的基础路径
  },
  plugins: [cssPlugin, htmlPlugin, copyPlugin],
  watch: true,
  watchOptions: {
    aggregateTimeout: 500,
    ignored: /node_modules/,
    poll: 0812
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        include: SRC_PATH,
        exclude: path.resolve(ROOT_PATH, "node_modules")
      },
      {
        test: /\.(ts|tsx)$/,
        loader: "awesome-typescript-loader",
        include: TSFILEPATH, //解析这个目录下的.ts/,tsx文件
        exclude: path.resolve(ROOT_PATH, "node_modules")
      },
      {
        test: /\.(css|less)$/,
        include: SRC_PATH,
        loader: CssPluginClass.extract({
          fallback: "style-loader",
          use: [
            {
              // loader: "typings-for-css-modules-loader", //这个方案实现的样式文件的模块化很不优雅
              loader: "css-loader",
              options: {
                sourceMap: true,
                import: true,
                modules: true,
                localIdentName: CSS_CLASS_NAME,
                importLoaders: 2
                // namedExport: true
              }
            },
            "postcss-loader",
            "less-loader"
          ],
          publicPath: path.resolve(BUILD_PATH, "css")
        })
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.(png|jpe?g|gif|wav)$/,
        use: ["url-loader?limit=10240&name=img/[hash:8].[name].[ext]"]
      }
    ]
  }
};
