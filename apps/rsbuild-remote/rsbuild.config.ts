import fs from "fs";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import mfConfig from "./modulefederation.config";
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
  source: {
    //@ts-expect-error not sure why this is not working
    preEntry: false
  },
  performance: {
    //@ts-expect-error not sure why this is not working
    chunkSplit: {
      override: {
        chunks: "async",
        minSize: 30000
      }
    }
  },
  tools: {
    rspack: {
      output: {
        publicPath: "auto"
      },
      plugins: [new rspack.container.ModuleFederationPlugin(mfConfig)]
    }
  },
  plugins: [pluginReact()]
});
