import { FC, useContext, useEffect, useState } from "react";
import { Company } from "../../types/colors";
import ColorBlock from "../ColorBlock";
import { AppStateContext } from "../../context/AppStateContext";
import styles from "./Colors.module.css";

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
          <div className={`${styles.colorGrid} grid is-gap-1`}>
            {company.colors.map((color) => (
              <div className="cell" key={color.id}>
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
