import { toHSLArray } from "hex-color-utils";
import React, { useState } from "react";
import { Swatch } from "./App";
import { getImagePath, rgbToHex } from "./utils";

interface Props {
  swatches: Swatch[];
  debug: boolean;
}

export enum HSL {
  Hue,
  Saturation,
  Lightness,
}

const getHsl = (color: number[]) => toHSLArray(rgbToHex(color));

const sortSwatches = (swatches: Swatch[], index = 0): Swatch[] =>
  swatches
    .filter((s) => s !== null)
    .sort((a, b) => {
      // const [hA, _sA, _lA] = getHsl(a.dominantColour);
      // const [hB, _sB, _lB] = getHsl(b.dominantColour);
      // return hA - hB;
      return getHsl(a.dominantColour)[index] - getHsl(b.dominantColour)[index];
    });

const getNameForSortingType = (value: HSL) => {
  switch (value) {
    case HSL.Hue: {
      return "hue";
    }
    case HSL.Saturation: {
      return "saturation";
    }
    case HSL.Lightness: {
      return "lightness";
    }
    default: {
      return "unknown/error";
    }
  }
};

export const SimpleSort: React.FunctionComponent<Props> = (props: Props) => {
  const [sortBy, setSortBy] = useState(HSL.Hue);

  const sorted = sortSwatches(props.swatches, sortBy);

  return (
    <div>
      <div className="ui">
        <button
          onClick={() => {
            setSortBy((sortBy + 1) % 3);
          }}
        >
          Switch sorting type
        </button>
        <div>Currently: {getNameForSortingType(sortBy).toUpperCase()}</div>
      </div>

      {sorted.map((s) => (
        <div className="image-with-swatch">
          <img src={getImagePath(s.file)}></img>
          {props.debug && (
            <div
              className="swatch"
              style={{
                backgroundColor: `#${rgbToHex(s.dominantColour).toString(16)}`,
              }}
            ></div>
          )}
          {props.debug && (
            <code>{JSON.stringify(getHsl(s.dominantColour), null, 2)}</code>
          )}
        </div>
      ))}
    </div>
  );
};
export default SimpleSort;
