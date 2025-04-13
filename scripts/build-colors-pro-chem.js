import { parse } from "node-html-parser";
import getHexCodeFromImage from "./utils/getHexCodeFromImage.js";

async function buildProChemColors() {
  const proChemPageStr = await fetch(
    "https://prochemicalanddye.com/pro-mx-fiber-reactive-dyes/",
  ).then((response) => response.text());

  const doc = parse(proChemPageStr, "text/html");

  const hexCodePromises = [];

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

      const color = {
        hexCode: "#000000",
        id,
        name,
      };

      const colorImgUrl = cellElements[0]
        .querySelector("img")
        .getAttribute("data-src");
      hexCodePromises.push(
        getHexCodeFromImage(colorImgUrl).then((hexCode) => {
          color.hexCode = hexCode;
        }),
      );

      return [...acc, color];
    }, []);

  await Promise.all(hexCodePromises);

  return {
    name: "Pro Chem & Dye",
    colors,
  };
}

export default buildProChemColors;
