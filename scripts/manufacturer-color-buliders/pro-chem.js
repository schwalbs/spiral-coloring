import { parse } from "node-html-parser";
import getHexCodeFromImage from "./utils/getHexCodeFromImage.js";
import getColorBuilderLogger from "./utils/getColorBuilderLogger.js";

const log = getColorBuilderLogger("pro-chem", "yellow");

async function buildProChemColors() {
  log("starting");
  log("fetching dye page");
  const proChemPageStr = await fetch(
    "https://prochemicalanddye.com/pro-mx-fiber-reactive-dyes/",
  ).then((response) => response.text());

  const doc = parse(proChemPageStr, "text/html");

  const hexCodePromises = [];

  log("parsing page to build colors array");
  // TODO the table we pull from uses a scroll event to load more columns. Figure out how to get that data
  /*
    await fetch("https://prochemicalanddye.com/wp-admin/admin-ajax.php", {
        "referrer": "https://prochemicalanddye.com/pro-mx-fiber-reactive-dyes/",
        "body": "action=wpt_load_both&table_id=520994&others%5Bpage_number%5D=2&others%5BisMob%5D=false&others%5Btype%5D=load_more&others%5Breset_search_clicked%5D=no",
        "method": "POST",
        "mode": "cors"
    });
  */
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
