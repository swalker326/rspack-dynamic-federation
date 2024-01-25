import { loadRemote } from "@module-federation/runtime/.";
import React from "react";

export function MicroFrontend({ path }: { path: string }) {
  //@ts-expect-error This errors because the return value of loadRemote is not what React.lazy expects
  const Component = React.lazy(() => loadRemote(path));
  return (
    <>
      <React.Suspense fallback="Loading System">
        <Component />
      </React.Suspense>
    </>
  );
}
