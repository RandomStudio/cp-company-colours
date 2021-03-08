import React from "react";
import * as PIXI from "pixi.js";
import { Swatch } from "./App";

interface Props {
  swatches: Swatch[];
}

export const SimpleSort: React.FunctionComponent<Props> = (props: Props) => {
  return <div>Swatches loaded: {props.swatches.length}</div>;
};

export default SimpleSort;
