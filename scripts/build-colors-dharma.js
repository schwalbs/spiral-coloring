export default async function buildDharmaColors() {
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
  const allColors = colorSections.reduce((allColorsBuilder, colorCategory) => {
    const categoryPositions = Object.keys(colorCategory.variants);

    const categoryColors = categoryPositions.map((key) => {
      const color = colorCategory.variants[key];

      return {
        name: color.textval
          .replace(/(^[A-Za-z0-9]+ : | - .*$|\*|\(\w\))/g, "")
          .trim(),
        hexCode: colorHexCodeByColor[color.vcode] ?? "#ffffff",
        id: color.vcode,
      };
    });

    return [...allColorsBuilder, ...categoryColors];
  }, []);

  return {
    name: "Dharma Trading Company",
    colors: allColors,
    siteHref:
      "https://www.dharmatrading.com/dyes/dharma-fiber-reactive-procion-dyes.html",
  };
}
