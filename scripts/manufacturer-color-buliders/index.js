import buildDharmaColors from "./dharma.js";
import buildJacquardColors from "./jacquard.js";
import buildProChemColors from "./pro-chem.js";

export default {
  dharma: buildDharmaColors,
  jacquard: buildJacquardColors,
  ["pro-chem"]: buildProChemColors,
};
