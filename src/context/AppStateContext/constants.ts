import { AppStateData } from "./AppStateContext";

export const DEFAULT_APP_STATE_DATA: AppStateData = {
  dyeStyle: "liquid",
  selectedColor: null,
  shirt: {
    spiralDirection: "cw",
    numSpirals: 2,
    spirals: [],
  },
};
