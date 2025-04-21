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
    <div className={`block mb-0`}>
      <div
        className={`${styles.companyNameContainer} is-clickable px-4 has-background-black-bis is-flex is-justify-content-space-between is-align-items-center`}
        onClick={handleNameContainerClick}
      >
        <h3 className={`subtitle is-4 is-size-5-mobile py-4 mb-0`}>
          {company.name}
          <a
            className="ml-2"
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
            className={`button is-small`}
            ref={buttonRef}
            type="button"
            aria-label={isExpanded ? "collapse colors" : "expand colors"}
            title={isExpanded ? "collapse colors" : "expand colors"}
            onClick={handleToggleButtonClick}
          >
            <Icon
              path={mdiChevronDown}
              className={`${styles.toggleButtonIcon} icon`}
              aria-hidden="true"
              size="1.25rem"
              rotate={!isExpanded ? 180 : undefined}
            />
          </button>
        </div>
      </div>
      <div className="is-clipped" ref={colorGridContainerRef}>
        <div
          className={`${styles.colorGrid} grid is-gap-1 px-4 py-1`}
          ref={colorGridRef}
          aria-hidden={!isExpanded}
        >
          {company.colors.map((color) => (
            <div className="cell" key={color.id}>
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
