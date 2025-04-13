import { FC, useContext, useEffect, useState } from "react";
import { Company } from "../../types/globals";
import ColorBlock from "../ColorBlock";
import { AppStateContext } from "../../context/AppStateContext/AppStateContext";
import "./Colors.css";

/**
 * TODO: add jaquard https://www.jacquardproducts.com/procion-mx
 * TODO: add pro chemical https://prochemicalanddye.com/
 * TODO: add custom colors https://customcoloursinc.storenvy.com/
 * TODO: add happy cat dyes https://www.happycattiedye.com/shop/category/dyes
 * TODO: add grateful dyes https://www.grateful-dyes.com/fabric-dyes/
 * TODO: add section collapse
 */
const Colors: FC = () => {
  const { selectedColor, set } = useContext(AppStateContext);
  const [dyeCompanies, setDyeCompanies] = useState<Company[] | null>(null);

  useEffect(() => {
    (async () => {
      const loadedColorsRequest = await fetch(
        "/spiral-coloring/colors-compiled.json",
      );
      const loadedColors = await loadedColorsRequest.json();

      setDyeCompanies(loadedColors);
    })();
  }, []);

  return (
    <div className="colors">
      {dyeCompanies == null && <span>Loading colors...</span>}
      {dyeCompanies?.map((company) => (
        <div className="block" key={company.name}>
          <h3 className="subtitle is-4 is-size-5-mobile is-underlined">
            <a href={company.siteHref} target="_blank">
              {company.name}
            </a>
          </h3>
          <div className="colors__color-grid grid is-gap-1">
            {company.colors.map((color) => (
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
