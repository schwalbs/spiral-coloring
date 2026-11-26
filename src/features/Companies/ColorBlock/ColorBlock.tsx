import { FC, MouseEventHandler, useContext } from "react";
import { Color, Company } from "../../../types/colors";
import styles from "./ColorBlock.module.css";
import { AppStateContext } from "../../../context/AppStateContext";

type Props = {
  color: Color;
  isSelected?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  iceDyeImgStyles?: Company["iceDyeImageStyles"];
};

const ColorBlock: FC<Props> = ({
  color,
  iceDyeImgStyles,
  isSelected,
  onClick,
}) => {
  const { dyeStyle: style } = useContext(AppStateContext);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        ${styles.container}
        ${isSelected ? " border-light " : " border-transparent "}
        d-flex flex-column justify-content-between p-1 overflow-hidden rounded-2 btn border-2`}
      style={{
        backgroundColor: color.hexCode,
        backgroundImage:
          style === "ice" && color.iceDyeImgSrc
            ? `url(${color.iceDyeImgSrc})`
            : undefined,
        ...iceDyeImgStyles,
      }}
    >
      <span className={`${styles.name} small bg-dark text-white py-2 px-1`}>
        {color.name}
      </span>
    </button>
  );
};
export default ColorBlock;
