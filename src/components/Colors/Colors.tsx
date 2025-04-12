import { FC, useContext, useEffect, useState } from "react";
import { Color, ColorCategory } from "../../types/globals";
import ColorBlock from "../ColorBlock";
import { AppStateContext } from "../../context/appStateContext";
import "./Colors.css";

const byDisplayOrder = (a: Color, b: Color): number =>
  a.displayOrder - b.displayOrder;

/**
 * TODO: add jaquard https://www.jacquardproducts.com/procion-mx
 * TODO: add pro chemical https://prochemicalanddye.com/
 * TODO: add custom colors https://customcoloursinc.storenvy.com/
 * TODO: add happy cat dyes https://www.happycattiedye.com/shop/category/dyes
 * TODO: add grateful dyes https://www.grateful-dyes.com/fabric-dyes/
 */
const Colors: FC = () => {
  const { selectedColor, set } = useContext(AppStateContext);
  const [colorCategories, setColorCategories] = useState<
    ColorCategory[] | null
  >(null);

  useEffect(() => {
    (async () => {
      const loadedColorsRequest = await fetch(
        "/spiral-coloring/colors-compiled.json",
      );
      const loadedColors = await loadedColorsRequest.json();

      setColorCategories(loadedColors);
    })();
  }, []);

  return (
    <div className="colors">
      {colorCategories == null && <span>Loading colors...</span>}
      {colorCategories?.map((category) => (
        <div className="block" key={category.name}>
          <h3 className="subtitle is-4 is-size-5-mobile">{category.name}</h3>
          <div className="colors__color-grid grid is-gap-1">
            {category.colors.sort(byDisplayOrder).map((color) => (
              <div className="cell colors__color" key={color.id}>
                <ColorBlock
                  color={color}
                  isSelected={color.id === selectedColor?.id}
                  onClick={() => {
                    set.selectedColor(color);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Colors;
