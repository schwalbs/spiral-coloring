import * as fs from "fs";
import * as path from "path";
import * as prettier from "prettier";
import { sortFn as byColor } from "color-sorter";

const [colorsRaw, colorsDetailsRaw] = await Promise.all(
  [
    "https://www.dharmatrading.com/templates/eng/html/colorwizards/procion-col.js",
    "https://www.dharmatrading.com/json/products/down/950/6/3796-AA.js",
  ].map((url) => fetch(url).then((response) => response.json())),
);

const objToArray = (obj) =>
  Array.from({ ...obj, length: Object.keys(obj).length });

const colorDetails = colorsDetailsRaw.linksdown[950][0].variants;
const colorHexCodeByColor = colorDetails.reduce(
  (hexCodeMapBuilder, colorDetail) => {
    return {
      ...hexCodeMapBuilder,
      [colorDetail.vcode]: colorDetail.colorsample_rgb,
    };
  },
  {},
);

const colorSections = objToArray(colorsRaw);
const allColors = colorSections
  .reduce((allColorsBuilder, colorCategory) => {
    const categoryPositions = Object.keys(colorCategory.variants);

    const categoryColors = categoryPositions
      .map((key) => {
        const color = colorCategory.variants[key];

        return {
          name: color.textval
            .replace(/(^[A-Za-z0-9]+ : | - .*$|\*|\(\w\))/g, "")
            .trim(),
          hexCode: colorHexCodeByColor[color.vcode] ?? "#ffffff",
          id: color.vcode,
          displayOrder: parseInt(key),
        };
      })
      .sort((a, b) => a.displayOrder - b.displayOrder);

    return [...allColorsBuilder, ...categoryColors];
  }, [])
  .sort((a, b) => byColor(a.hexCode, b.hexCode));

const formattedOutput = await prettier.format(
  JSON.stringify([
    {
      name: "Dharma Trading Company",
      colors: allColors,
      siteHref:
        "https://www.dharmatrading.com/dyes/dharma-fiber-reactive-procion-dyes.html",
    },
  ]),
  { parser: "json-stringify" },
);

// TODO inject instead of overwrite
fs.writeFile(
  path.join(import.meta.dirname, "../public/colors-compiled.json"),
  formattedOutput,
  (error) => {
    if (error) console.error(error);
  },
);
