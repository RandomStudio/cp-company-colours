import React from "react";
import * as PIXI from "pixi.js";
import { Swatch } from "./App";

interface Props {
  swatches: Swatch[];
}

const getImagePath = (fileName: string) => `/output/${fileName}`;

export const SimpleSort: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <div>
      <code>Swatches loaded: {props.swatches.length}</code>

      <img src={getImagePath(props.swatches[0].file)}></img>
    </div>
  );
};

export default SimpleSort;
