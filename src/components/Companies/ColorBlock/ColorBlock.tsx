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
      className={`${styles.container} ${isSelected ? styles.containerSelected : ""} is-flex is-flex-direction-column is-justify-content-space-between p-1 is-clipped`}
      style={{
        backgroundColor: color.hexCode,
        backgroundImage:
          style === "ice" && color.iceDyeImgSrc
            ? `url(${color.iceDyeImgSrc})`
            : undefined,
        ...iceDyeImgStyles,
      }}
    >
      <span
        className={`${styles.name} is-size-6 is-size-7-mobile has-background-black-bis py-2 px-1`}
      >
        {color.name}
      </span>
    </button>
  );
};
export default ColorBlock;
