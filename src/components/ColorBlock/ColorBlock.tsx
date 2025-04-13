import { FC, MouseEventHandler, useContext } from "react";
import { Color } from "../../types/colors";
import styles from "./ColorBlock.module.css";
import { AppStateContext } from "../../context/AppStateContext";

type Props = {
  color: Color;
  isSelected?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const ColorBlock: FC<Props> = ({ color, isSelected, onClick }) => {
  const { dyeStyle: style } = useContext(AppStateContext);

  return (
    <div
      className={`${styles.container} ${isSelected ? styles.containerSelected : ""}`}
    >
      <span className={`is-size-6 ${styles.name}`}>{color.name}</span>
      <button
        className={`${styles.colorBlock}`}
        type="button"
        onClick={onClick}
        style={{
          backgroundColor: color.hexCode,
          backgroundImage:
            style === "ice" && color.iceDyeImgSrc
              ? `url(${color.iceDyeImgSrc})`
              : undefined,
        }}
      />
    </div>
  );
};
export default ColorBlock;
