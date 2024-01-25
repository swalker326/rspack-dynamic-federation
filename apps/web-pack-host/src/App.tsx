import React from "react";
import ReactDOM from "react-dom";
import { init } from "@module-federation/runtime";

import "./index.scss";
import { MicroFrontend } from "./MicroFrontend";

const initValue = init({
  name: "container",
  remotes: [
    {
      name: "rsbuild",
      alias: "rsbuild",
      entry: "http://localhost:3002/remoteEntry.js"
    },
    {
      name: "rspack",
      alias: "rspack",
      entry: "http://localhost:3003/remoteEntry.js"
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
      version: "18.0.0",
      scope: "default",
      lib: () => React,
      shareConfig: {
        singleton: true,
        requiredVersion: "^1.0.0"
      }
    },
    "react-dom": {
      version: "18.0.0",
      scope: "default",
      lib: () => ReactDOM,
      shareConfig: {
        singleton: true,
        requiredVersion: "^18.0.0"
      }
    }
  }
});
console.log("initValue: ", initValue);
const App = () => (
  <div className="w-full border">
    <h1 className="text-6xl">Rs* module federation</h1>
    <div className="flex gap-3 w-full">
      <div className="border border-red-500">
        <h2 className="text-2xl">rsbuild</h2>
        <div className="w-1/2">
          <MicroFrontend path="rsbuild/App" />
        </div>
      </div>
      <div className="border border-red-500">
        <h2 className="text-2xl">rsbuild</h2>
        <div className="w-1/2">
          <MicroFrontend path="rspack/App" />
        </div>
      </div>
    </div>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
