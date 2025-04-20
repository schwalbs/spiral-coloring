import { FC, useContext, useRef, useState } from "react";
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
  const colorGridRef = useRef<HTMLDivElement>(null);
  const colorGridExpandedHeight = useRef(0);

  const handleToggleButtonClick = () => {
    setIsExpanded((prev) => !prev);

    const colorGridElement = colorGridRef.current;

    if (!colorGridElement) {
      return;
    }

    if (isExpanded) {
      colorGridExpandedHeight.current = colorGridElement.clientHeight;
    }

    animateExpandCollapse(
      colorGridElement,
      isExpanded ? "collapse" : "expand",
      colorGridExpandedHeight.current,
    );
  };

  const handleNameContainerClick = () => {
    buttonRef.current?.click();
  };

  const handleCompanyPageLinkClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div className="block is-clipped">
      <div
        className={`is-clickable is-flex is-justify-content-space-between is-align-items-center`}
        onClick={handleNameContainerClick}
      >
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
            onClick={handleCompanyPageLinkClick}
          >
            <Icon path={mdiOpenInNew} aria-hidden="true" size={0.67} />
          </a>
        </h3>
        <div>
          <button
            className={`button`}
            ref={buttonRef}
            type="button"
            onClick={handleToggleButtonClick}
          >
            <Icon
              path={mdiChevronDown}
              className={`${styles.toggleButtonIcon} icon`}
              aria-hidden="true"
              size={1}
              rotate={!isExpanded ? 180 : undefined}
            />
          </button>
        </div>
      </div>
      <div
        className={`${styles.colorGrid} grid is-gap-1`}
        ref={colorGridRef}
        aria-hidden={!isExpanded}
      >
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
  );
};

export default CompanyDyes;
