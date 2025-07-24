import { cn } from "../../../lib/utils";
import React from "react";

export function GridBackground({children}) {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center bg-black rounded-3xl overflow-hidden ">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )} />
      {/* Radial gradient for the container to give a faded look */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-black rounded-3xl"></div>
        {children}
    </div>
  );
}
