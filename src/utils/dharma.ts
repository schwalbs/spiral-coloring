import { DHARMA_ICE_DYE_URL_PREFIX } from "../constants";
import { Color } from "../types/colors";

export const buildIceDyeSwatchUrl = (color: Color): string =>
  `${DHARMA_ICE_DYE_URL_PREFIX}/pr-ice-dye-color-chip-${color.id.toLowerCase()}.jpg`;
