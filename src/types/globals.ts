export type Color = {
  category: string;
  displayOrder: number;
  hexCode: string;
  id: string;
  name: string;
};

export type ColorCategory = {
  name: string;
  colors: Array<Color>;
};

export type ColorStyle = "liquid" | "ice";
