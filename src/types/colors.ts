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
};

export type DyeStyle = "liquid" | "ice";
