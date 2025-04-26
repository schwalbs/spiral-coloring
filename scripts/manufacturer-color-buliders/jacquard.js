import { parse } from "node-html-parser";
import getHexCodeFromImage from "./utils/getHexCodeFromImage.js";
import getColorBuilderLogger from "./utils/getColorBuilderLogger.js";

const log = getColorBuilderLogger("jacquard", "green");

async function buildJacquardColors() {
  log("starting");
  log("fetching dye page");

  const pageStr = await fetch(
    "https://www.jacquardproducts.com/procion-mx",
  ).then((response) => response.text());

  const doc = parse(pageStr, "text/html");

  const hexCodePromises = [];

  log("parsing page to build colors array");
  const colors = doc
    .querySelectorAll(".sqs-gallery-block-grid")[0]
    ?.querySelectorAll(".slide")
    .map((slideElement) => {
      const slideText =
        slideElement.querySelector(".image-slide-title").textContent;
      const { id, name } =
        /^(?<id>[0-9]+) (?<name>[A-z ]+)/.exec(slideText.trim())?.groups ?? {};

      const color = {
        hexCode: "#000000",
        id,
        name,
      };

      const colorImgUrl = slideElement
        .querySelector("img")
        .getAttribute("data-src");
      hexCodePromises.push(
        getHexCodeFromImage(colorImgUrl).then((hexCode) => {
          color.hexCode = hexCode;
        }),
      );

      return color;
    });

  log("waiting to rseolve hex codes");
  await Promise.all(hexCodePromises);

  log("finished");

  return {
    name: "Jacquard",
    siteHref: "https://www.jacquardproducts.com/procion-mx",
    colors,
  };
}

export default buildJacquardColors;
