const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({
  output: {
    publicPath: "https://localhost.lcp.ai:3001/"
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"]
  },
  devServer: {
    port: 3001,
    historyApiFallback: true,
    host: "localhost.lcp.ai",
    https: true
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "web_pack_host",
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"]
        }
      }
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html"
    })
  ]
});
