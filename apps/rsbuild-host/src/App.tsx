import React from "react";
import ReactDOM from "react-dom";
import { init } from "@module-federation/runtime";
// import { MicroFrontend } from "./MicroFrontend";

import "./App.css";
import { MicroFrontend } from "./MicroFrontend";

const initValue = init({
  name: "container",
  remotes: [
    {
      name: "rsbuild",
      alias: "rsbuild",
      entry: "https://localhost.lcp.ai:3002/remoteEntry.js"
    }
  ],
  // plugins: [
  //   {
  //     name: 'custom-plugin',
  //     beforeInit(args) {
  //       return args
  //     },
  //     init(args) {
  //       console.log('init: ', args)
  //       return args
  //     },
  //     beforeLoadShare(args) {
  //       console.log('beforeLoadShare: ', args)

  //       return args
  //     },
  //   },
  // ],
  shared: {
    react: {
      version: "18.2.0",
      scope: "default",
      lib: () => React,
      shareConfig: {
        singleton: true,
        requiredVersion: "18.2.0"
      }
    },
    "react-dom": {
      version: "18.2.0",
      scope: "default",
      lib: () => ReactDOM,
      shareConfig: {
        singleton: true,
        requiredVersion: "18.2.0"
      }
    }
  }
});
console.log("initValue: ", initValue);
export const App = () => {
  const [module, setModule] = React.useState<string>();
  return (
    <div className="w-full border">
      <h1 className="text-6xl">Rs* module federation</h1>
      <div className="flex gap-3 w-full">
        <div className="border border-red-500">
          <h2 className="text-2xl">rsbuild</h2>
          <div className="w-1/2">
            {module ? (
              <MicroFrontend path="rsbuild/App" />
            ) : (
              <button onClick={() => setModule("rsbuild/App")}>Load</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
