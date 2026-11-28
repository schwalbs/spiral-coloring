import { FC, useContext } from "react";
import { AccordionContent, AccordionItem } from "@schwalbs/friggle-components";
import ColorBlock from "../ColorBlock";
import { type Company } from "../../../types/colors";
import { AppStateContext } from "../../../context/AppStateContext";
import CompanyHeader from "../../../shared/ui/CompanyHeader";
import SwatchGrid from "../../../shared/ui/SwatchGrid";

const CompanyDyes: FC<{ company: Company }> = ({ company }) => {
  const { set, selectedColor } = useContext(AppStateContext);

  return (
    <AccordionItem value={company.name}>
      <CompanyHeader name={company.name} siteHref={company.siteHref} />
      <AccordionContent>
        <SwatchGrid>
          {company.colors.map((color) => (
            <div key={color.id}>
              <ColorBlock
                color={color}
                iceDyeImgStyles={company.iceDyeImageStyles}
                isSelected={color.id === selectedColor?.id}
                onClick={() => {
                  set.selectedColor(color);
                }}
              />
            </div>
          ))}
        </SwatchGrid>
      </AccordionContent>
    </AccordionItem>
  );
};

export default CompanyDyes;
