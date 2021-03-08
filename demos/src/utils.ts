import { fromRGB } from "hex-color-utils";

export const getImagePath = (fileName: string) => `/output/${fileName}`;
export const rgbToHex = (rgbArray: number[]): number => {
  const [r, g, b] = rgbArray.map((c) => c / 255);
  return fromRGB(r, g, b);
};
