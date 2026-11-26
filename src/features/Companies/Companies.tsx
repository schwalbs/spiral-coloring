import { FC, useEffect, useState } from "react";
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
    <div className="pb-4">
      {dyeCompanies == null && <span>Loading colors...</span>}
      {dyeCompanies?.map((company) => (
        <CompanyDyes company={company} key={company.name} />
      ))}
    </div>
  );
};

export default Colors;
