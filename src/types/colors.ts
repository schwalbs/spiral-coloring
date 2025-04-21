import type { CSSProperties } from "react";

export type Color = {
  hexCode: string;
  id: string;
  name: string;
  iceDyeImgSrc?: string;
};

export type Company = {
  colors: Array<Color>;
  name: string;
  siteHref: string;
  iceDyeImageStyles?: {
    backgroundSize?: CSSProperties["backgroundSize"];
    backgroundPosition?: CSSProperties["backgroundPosition"];
  };
};

export type DyeStyle = "liquid" | "ice";
