// const rspack = require("@rspack/core");
// const refreshPlugin = require("@rspack/plugin-react-refresh");
// const isDev = process.env.NODE_ENV === "development";
// /**
//  * @type {import('@rspack/cli').Configuration}
//  */
// module.exports = {
// 	context: __dirname,
// 	entry: {
// 		main: "./src/main.tsx"
// 	},
// 	resolve: {
// 		extensions: ["...", ".ts", ".tsx", ".jsx"]
// 	},
// 	module: {
// 		rules: [
// 			{
// 				test: /\.svg$/,
// 				type: "asset"
// 			},
// 			{
// 				test: /\.(jsx?|tsx?)$/,
// 				use: [
// 					{
// 						loader: "builtin:swc-loader",
// 						options: {
// 							sourceMap: true,
// 							jsc: {
// 								parser: {
// 									syntax: "typescript",
// 									tsx: true
// 								},
// 								transform: {
// 									react: {
// 										runtime: "automatic",
// 										development: isDev,
// 										refresh: isDev
// 									}
// 								}
// 							},
// 							env: {
// 								targets: [
// 									"chrome >= 87",
// 									"edge >= 88",
// 									"firefox >= 78",
// 									"safari >= 14"
// 								]
// 							}
// 						}
// 					}
// 				]
// 			}
// 		]
// 	},
// 	plugins: [
// 		new rspack.DefinePlugin({
// 			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
// 		}),
// 		new rspack.ProgressPlugin({}),
// 		new rspack.HtmlRspackPlugin({
// 			template: "./index.html"
// 		}),
// 		isDev ? new refreshPlugin() : null
// 	].filter(Boolean)
// };

const rspack = require("@rspack/core");
const {
  container: { ModuleFederationPlugin }
} = require("@rspack/core");

const path = require("path");
const deps = require("./package.json").dependencies;
const isDev = process.env.NODE_ENV === "development";

module.exports = {
  entry: "./src/main.tsx",
  mode: "development",
  publicPath: "auto",
  target: "web",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist")
    },
    https: true,
    host: "localhost.lcp.ai",
    port: process.env.PORT || 3003
  },
  output: {
    publicPath: "auto"
  },
  optimization: {
    minimize: false
  },
  externals: {
    "zen_main/Auth": "zen_main/Auth"
  },
  resolve: {
    tsConfigPath: path.resolve(__dirname, "tsconfig.json"),
    extensions: ["...", ".ts", ".tsx", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: "asset"
      },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              sourceMap: true,
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx: true
                },
                transform: {
                  react: {
                    runtime: "automatic",
                    development: isDev,
                    refresh: isDev
                  }
                }
              },
              env: {
                targets: [
                  "chrome >= 87",
                  "edge >= 88",
                  "firefox >= 78",
                  "safari >= 14"
                ]
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "rspack",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.tsx"
      },
      shared: {
        react: {
          requiredVersion: deps.react,
          import: "react", // the "react" package will be used a provided and fallback module
          shareKey: "react", // under this name the shared module will be placed in the share scope
          shareScope: "default", // share scope with this name will be used
          singleton: true // only a single version of the shared module is allowed
        },
        "react-dom": {
          requiredVersion: deps["react-dom"],
          singleton: true // only a single version of the shared module is allowed
        }
      }
    }),
    new rspack.HtmlRspackPlugin({
      template: "./index.html"
    })
  ]
};
