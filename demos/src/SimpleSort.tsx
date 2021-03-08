import React, { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { Size, Swatch } from "./App";
import { getImagePath } from "./utils";

interface Props {
  canvasSize: Size;
  swatches: Swatch[];
}

export const SimpleSort: React.FunctionComponent<Props> = (props: Props) => {
  const app = new PIXI.Application({
    width: props.canvasSize.width,
    height: props.canvasSize.height,
    backgroundColor: 0x000055,
  });

  app.start();
  const ref: React.MutableRefObject<HTMLDivElement | null> = useRef(null);

  loadResources(props).then((resources) => {
    console.log("loaded resources OK:", resources);
    initGraphics(props, app);
  });

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

const loadResources = (
  props: Props
): Promise<Partial<Record<string, PIXI.ILoaderResource>>> =>
  new Promise((resolve, reject) => {
    const loader = new PIXI.Loader();

    props.swatches.forEach((s) => {
      if (s) {
        loader.add(`img_${s.id}`, getImagePath(s.file));
      }
    });

    loader.load((loaders, resources) => {
      resolve(resources);
    });
  });

const initGraphics = async (props: Props, app: PIXI.Application) => {};
