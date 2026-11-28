import { FC, MouseEventHandler, useContext } from "react";
import { Color, Company } from "../../../types/colors";
import { AppStateContext } from "../../../context/AppStateContext";
import ColorSwatch from "../../../shared/ui/ColorSwatch";

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
  const { dyeStyle } = useContext(AppStateContext);

  return (
    <ColorSwatch
      hexCode={color.hexCode}
      imageSrc={dyeStyle === "ice" ? color.iceDyeImgSrc : undefined}
      imageStyles={iceDyeImgStyles}
      label={color.name}
      selected={isSelected}
      onClick={onClick}
    />
  );
};
export default ColorBlock;
