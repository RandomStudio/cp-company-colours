import { toHSLArray } from "hex-color-utils";
import React, { useState } from "react";
import { Swatch } from "./App";
import { getImagePath, rgbToHex } from "./utils";

interface Props {
  swatches: Swatch[];
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
  const [debug, setDebug] = useState(false);

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
        <div>
          <input
            id="showDebug"
            type="checkbox"
            value={debug === true ? "checked" : "unchecked"}
            onChange={(e) => setDebug(e.target.checked === true)}
          />
          <label htmlFor="showDebug">Debug</label>
        </div>
      </div>

      {sorted.map((s) => (
        <div
          className="image-with-swatch"
          style={{
            backgroundColor: `#${rgbToHex(s.dominantColour).toString(16)}`,
          }}
        >
          <img src={getImagePath(s.file)}></img>
          {debug && (
            <div
              className="swatch"
              style={{
                backgroundColor: `#${rgbToHex(s.dominantColour).toString(16)}`,
              }}
            ></div>
          )}
          {debug && (
            <code>{JSON.stringify(getHsl(s.dominantColour), null, 2)}</code>
          )}
        </div>
      ))}
    </div>
  );
};
export default SimpleSort;
