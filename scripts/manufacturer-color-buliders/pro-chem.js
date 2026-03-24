import { parse } from "node-html-parser";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import getHexCodeFromImage from "./utils/getHexCodeFromImage.js";
import getColorBuilderLogger from "./utils/getColorBuilderLogger.js";

const log = getColorBuilderLogger("pro-chem", "yellow");

async function buildProChemColors() {
  log("starting");
  log("reading local page file");
  const proChemPageStr = readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), "pro-chem-page.html"),
    "utf8",
  );

  const doc = parse(proChemPageStr, "text/html");

  const hexCodePromises = [];

  log("parsing page to build colors array");
  const colors = doc
    .querySelectorAll("table tr")
    .reduce((acc, productTableRowElement) => {
      const cellElements = productTableRowElement.querySelectorAll("td");

      if (productTableRowElement.closest("thead")) {
        return acc;
      }

      const id = cellElements[3].textContent.trim();
      const trimmedName = cellElements[1].textContent
        .replace(/\n/g, "")
        .replace(/ +/g, " ")
        .trim();
      const name = trimmedName
        .replace(/(\s*(PRO )?MX Reactive Dye( "NEW")?|\([A-z ]+\))/g, "")
        .trim();

      const colorImgUrl = cellElements[0]
        .querySelector("img")
        .getAttribute("data-src");

      if (!colorImgUrl) {
        return acc;
      }

      const imgFilename = colorImgUrl.split("/").pop();
      const localImgPath = join(
        dirname(fileURLToPath(import.meta.url)),
        "../../public/pro-chem-images",
        imgFilename,
      );
      const iceDyeFilename = imgFilename.replace(
        /-[0-9]+x[0-9]+\.jpg$/g,
        ".jpg",
      );

      const color = {
        hexCode: "#000000",
        id,
        name,
        iceDyeImgSrc: `/spiral-coloring/pro-chem-images/${iceDyeFilename}`,
      };

      hexCodePromises.push(
        getHexCodeFromImage(localImgPath).then((hexCode) => {
          color.hexCode = hexCode;
        }),
      );

      return [...acc, color];
    }, []);

  log("waiting to resolve hex codes");
  await Promise.all(hexCodePromises);

  log("finished");

  return {
    name: "Pro Chem & Dye",
    siteHref: "https://prochemicalanddye.com/pro-mx-fiber-reactive-dyes/",
    colors,
    iceDyeImageStyles: {
      backgroundSize: "350%",
      backgroundPosition: "top right",
    },
  };
}

export default buildProChemColors;
