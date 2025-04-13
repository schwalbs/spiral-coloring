import * as prettier from "prettier";
import * as fs from "fs";
import * as path from "path";
import { sortFn as byColor } from "color-sorter";

import buildDharmaColors from "./build-colors-dharma.js";
import buildProChemColors from "./build-colors-pro-chem.js";

const MANUFACTURER_BUILDERS = {
  dharma: buildDharmaColors,
  ["pro-chem"]: buildProChemColors,
};

const manufacturerArgs = process.argv.slice(2);

const getFilteredBuilders = () => {
  return manufacturerArgs.reduce((acc, m) => {
    const builder = MANUFACTURER_BUILDERS[m];
    if (!builder) {
      console.log(`No builder for manufacturer '${m}'`);
      return acc;
    }

    return [...acc, builder];
  }, []);
};

const colorBuilders =
  manufacturerArgs.length > 0
    ? getFilteredBuilders()
    : Object.values(MANUFACTURER_BUILDERS);

if (colorBuilders.length === 0) {
  console.warn(
    `No builders found for manufacturers [${manufacturerArgs.join(",")}]. Exiting.`,
  );
  process.exit(0);
}

const manufacturers = await Promise.all(colorBuilders.map((c) => c()));
manufacturers.map((manufacturer) => {
  manufacturer.colors.sort((a, b) => byColor(a.hexCode, b.hexCode));

  return manufacturer;
});

const output = await prettier.format(JSON.stringify(manufacturers), {
  parser: "json-stringify",
});

fs.writeFile(
  path.join(import.meta.dirname, "../public/colors-compiled.json"),
  output,
  (error) => {
    if (error) console.error(error);
  },
);
