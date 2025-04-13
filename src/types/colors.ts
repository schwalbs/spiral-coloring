export type Color = {
  displayOrder: number;
  hexCode: string;
  id: string;
  name: string;
};

export type Company = {
  colors: Array<Color>;
  name: string;
  siteHref: string;
};

export type DyeStyle = "liquid" | "ice";
