import { FC, useEffect, useState } from "react";
import { Accordion } from "@schwalbs/friggle-components";
import { Company } from "../../types/colors";
import CompanyDyes from "./CompanyDyes";

const Colors: FC = () => {
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
    <>
      {dyeCompanies == null && <span>Loading colors...</span>}
      {dyeCompanies && (
        // Rendered only after load so defaultValue opens every company once.
        <Accordion
          multiple
          defaultValue={dyeCompanies.map((company) => company.name)}
        >
          {dyeCompanies.map((company) => (
            <CompanyDyes company={company} key={company.name} />
          ))}
        </Accordion>
      )}
    </>
  );
};

export default Colors;
