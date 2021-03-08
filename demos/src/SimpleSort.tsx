import React, { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { Size } from "./App";

interface Props {
  canvasSize: Size;
}

export const SimpleSort: React.FunctionComponent<Props> = (props: Props) => {
  const app = new PIXI.Application({
    width: props.canvasSize.width,
    height: props.canvasSize.height,
    backgroundColor: 0x000055,
  });

  app.start();

  const ref: React.MutableRefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    if (ref.current) {
      console.log("append app view");
      ref.current.appendChild(app.view);
    }

    return () => {
      console.log("destroy PIXI app");
      app.destroy(true);
    };
  });
  return <div ref={ref}></div>;
};
export default SimpleSort;
