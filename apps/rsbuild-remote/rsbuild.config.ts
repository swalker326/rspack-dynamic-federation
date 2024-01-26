import fs from "fs";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
// import mfConfig from "./modulefederation.config";
// import { dependencies } from "./package.json";
import rspack from "@rspack/core";
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync("./localhost.lcp.ai-key.pem"),
      cert: fs.readFileSync("./localhost.lcp.ai.pem")
    },
    host: "localhost.lcp.ai",
    port: 3002
  },
  performance: {
    chunkSplit: {
      strategy: "all-in-one"
    }
  },
  tools: {
    rspack: {
      output: {
        publicPath: "auto"
      },
      plugins: [
        new rspack.container.ModuleFederationPlugin({
          name: "rsbuild",
          exposes: {
            "./App": "./src/App"
          },
          remotes: {
            host: "host@https://localhost.lcp.ai:3000/remoteEntry.js"
          },
          filename: "remoteEntry.js"
          // shared: {
          //   ...dependencies,
          //   react: {
          //     singleton: true,
          //     requiredVersion: dependencies["react"]
          //   },
          //   "react-dom": {
          //     singleton: true,
          //     requiredVersion: dependencies["react-dom"]
          //   }
          // }
        })
      ]
    }
  },
  plugins: [pluginReact()]
});
