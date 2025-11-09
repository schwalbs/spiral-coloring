import { FC, MouseEventHandler, useContext, useRef, useState } from "react";
import Icon from "@mdi/react";
import { mdiChevronDown, mdiOpenInNew } from "@mdi/js";
import styles from "./CompanyDyes.module.css";
import ColorBlock from "../ColorBlock";
import { type Company } from "../../../types/colors";
import { AppStateContext } from "../../../context/AppStateContext";
import animateExpandCollapse from "../../../utils/animateExpandCollapse";

const CompanyDyes: FC<{ company: Company }> = ({ company }) => {
  const { set, selectedColor } = useContext(AppStateContext);
  const [isExpanded, setIsExpanded] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const colorGridContainerRef = useRef<HTMLDivElement>(null);
  const colorGridRef = useRef<HTMLDivElement>(null);

  const handleToggleButtonClick: MouseEventHandler = (event) => {
    event.stopPropagation();

    setIsExpanded((prev) => !prev);

    const colorGridContainerElement = colorGridContainerRef.current;
    const colorGridElement = colorGridRef.current;
    if (!colorGridElement || !colorGridContainerElement) {
      return;
    }

    animateExpandCollapse(
      colorGridContainerElement,
      isExpanded ? "collapse" : "expand",
      colorGridElement.clientHeight,
    );
  };

  const handleNameContainerClick = () => {
    buttonRef.current?.click();
  };

  const handleCompanyPageLinkClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div className={`mb-0`}>
      <div
        className={`${styles.companyNameContainer} px-4 d-flex justify-content-between align-items-center bg-dark`}
        onClick={handleNameContainerClick}
      >
        <h3 className={`h4 py-4 mb-0`}>
          {company.name}
          <a
            className="ms-2"
            href={company.siteHref}
            target="_blank"
            aria-label={`Open ${company.name} dye page in a new tab`}
            title={`Open ${company.name} dye page in a new tab`}
            onClick={handleCompanyPageLinkClick}
          >
            <Icon path={mdiOpenInNew} aria-hidden="true" size="1rem" />
          </a>
        </h3>
        <div>
          <button
            className={`btn btn-sm btn-outline-light`}
            ref={buttonRef}
            type="button"
            aria-label={isExpanded ? "collapse colors" : "expand colors"}
            title={isExpanded ? "collapse colors" : "expand colors"}
            onClick={handleToggleButtonClick}
          >
            <Icon
              path={mdiChevronDown}
              className={`${styles.toggleButtonIcon}`}
              aria-hidden="true"
              size="1.25rem"
              rotate={!isExpanded ? 180 : undefined}
            />
          </button>
        </div>
      </div>
      <div className="overflow-hidden" ref={colorGridContainerRef}>
        <div
          className={`${styles.colorGrid} px-4 py-1`}
          ref={colorGridRef}
          aria-hidden={!isExpanded}
        >
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
        </div>
      </div>
    </div>
  );
};

export default CompanyDyes;
