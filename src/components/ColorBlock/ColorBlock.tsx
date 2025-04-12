import { FC, MouseEventHandler, useContext } from "react";
import { Color } from "../../types/globals";
import "./ColorBlock.css";
import { buildIceDyeSwatchUrl } from "../../utils/dharma";
import { AppStateContext } from "../../context/appStateContext";

type Props = {
  color: Color;
  isSelected?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const ColorBlock: FC<Props> = ({ color, isSelected, onClick }) => {
  const { dyeStyle: style } = useContext(AppStateContext);

  return (
    <div
      className={`color-container ${isSelected ? "color-container--selected" : ""}`}
    >
      <span className="is-size-6 color-container__name">{color.name}</span>
      <button
        className="color-container__color-block"
        type="button"
        onClick={onClick}
        style={{
          backgroundColor: color.hexCode,
          backgroundImage:
            style === "ice" ? `url(${buildIceDyeSwatchUrl(color)})` : undefined,
        }}
      />
    </div>
  );
};
export default ColorBlock;
