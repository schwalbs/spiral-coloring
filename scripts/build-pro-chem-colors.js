import { parse } from "node-html-parser";

const proChemPageStr = await fetch(
  "https://prochemicalanddye.com/pro-mx-fiber-reactive-dyes/",
).then((response) => response.text());

const doc = parse(proChemPageStr, "text/html");

// eslint-disable-next-line
const colors = doc
  .querySelectorAll("table tr")
  .map((productTableRowElement, index) => {
    const cellElements = productTableRowElement.querySelectorAll("td");

    if (productTableRowElement.closest("thead")) {
      return {};
    }

    const id = cellElements[3].textContent.trim();
    const name = cellElements[1].textContent.replace(
      /(\s*(PRO )?MX Reactive Dye( "NEW")? +[0-9A-z]+ +|\([A-z ]+\))/g,
      "",
      ``,
    );
    const color = {
      category: "red",
      displayOrder: index,
      hexCode: "#11111",
      id,
      name,
    };

    // const threeChipImgUrl = cellElements[0]
    //   .querySelector("[data-url]")
    //   .getAttribute("data-url");

    return color;
  });

// const formattedColors = {
//   name: "Pro Chem & Dye",
//   colors,
// };
