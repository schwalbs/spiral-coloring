import { parse } from "node-html-parser";
import chalk from "chalk";
import getHexCodeFromImage from "./utils/getHexCodeFromImage.js";

const log = (message) => {
  console.log(`${chalk.yellow("[pro-chem]")} ${message}`);
};

async function buildProChemColors() {
  log("starting");
  log("fetching dye page");
  const proChemPageStr = await fetch(
    "https://prochemicalanddye.com/pro-mx-fiber-reactive-dyes/",
  ).then((response) => response.text());

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
      const name = cellElements[1].textContent.replace(
        /(\s*(PRO )?MX Reactive Dye( "NEW")? +[0-9A-z]+ +|\([A-z ]+\))/g,
        "",
        ``,
      );

      const colorImgUrl = cellElements[0]
        .querySelector("img")
        .getAttribute("data-src");

      const color = {
        hexCode: "#000000",
        id,
        name,
        iceDyeImgSrc: colorImgUrl.replace(/-[0-9]+x[0-9]+\.jpg$/g, ".jpg"),
      };

      hexCodePromises.push(
        getHexCodeFromImage(colorImgUrl).then((hexCode) => {
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
