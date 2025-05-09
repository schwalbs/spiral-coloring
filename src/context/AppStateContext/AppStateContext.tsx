import { createContext } from "react";
import { Color, DyeStyle } from "../../types/colors";

export type AppStateData = {
  dyeStyle: DyeStyle;
  selectedColor: Color | null;
  shirt: {
    numSpirals: number;
    spiralDirection: "cw" | "ccw";
    spirals: Array<Color | undefined>;
  };
};

export type AppState = AppStateData & {
  set: {
    dyeStyle: (nextStyle: DyeStyle) => void;
    numSpirals: (numSpirals: number) => void;
    selectedColor: (nextColor: Color | null) => void;
    spiralColor: (spiralIndex: number, color: Color) => void;
    spiralColors: (colors: Array<Color | undefined>) => void;
    spiralDirection: (
      direction: AppStateData["shirt"]["spiralDirection"],
    ) => void;
  };
};

const AppStateContext = createContext<AppState>({} as unknown as never);

export default AppStateContext;
