import { FC, useContext, useEffect, useState } from "react";
import Icon from "@mdi/react";
import { mdiOpenInNew } from "@mdi/js";
import { Company } from "../../types/colors";
import ColorBlock from "../ColorBlock";
import { AppStateContext } from "../../context/AppStateContext";
import styles from "./Companies.module.css";

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
    <div className="pb-4">
      {dyeCompanies == null && <span>Loading colors...</span>}
      {dyeCompanies?.map((company) => (
        <div className="block" key={company.name}>
          <h3
            className={`${styles.companyName} subtitle has-background-black-bis is-4 is-size-5-mobile py-4 mb-1`}
          >
            {company.name}
            <a
              className="ml-2"
              href={company.siteHref}
              target="_blank"
              aria-label={`Open ${company.name} dye page in a new tab`}
              title={`Open ${company.name} dye page in a new tab`}
            >
              <Icon path={mdiOpenInNew} aria-hidden="true" size={0.67} />
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
