import React from "react";
import { Swatch } from "./App";
import { fromRGB } from "hex-color-utils";

interface Props {
  swatches: Swatch[];
}

const getImagePath = (fileName: string) => `/output/${fileName}`;

const rgbToHex = (rgbArray: number[]): number => {
  const [r, g, b] = rgbArray.map((c) => c / 255);
  return fromRGB(r, g, b);
};

const ImageWithSwatch = (s: Swatch) => (
  <div className="image-with-swatch">
    <h1>{s.id}</h1>
    <img src={getImagePath(s.file)}></img>
    <div
      className="swatch"
      style={{ backgroundColor: `#${rgbToHex(s.dominantColour).toString(16)}` }}
    ></div>
    <code>{`#${rgbToHex(s.dominantColour).toString(16)}`}</code>
  </div>
);

export const NoSort: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <div>
      <div>
        <code>Swatches loaded: {props.swatches.length}</code>
      </div>
      <div>{props.swatches.map((s) => s && ImageWithSwatch(s))}</div>
    </div>
  );
};

export default NoSort;
