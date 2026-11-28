import type { CSSProperties, FC, MouseEventHandler } from "react";
import type { Company } from "../../types/colors";

type Props = {
  hexCode: string;
  imageSrc?: string;
  imageStyles?: Company["iceDyeImageStyles"];
  label: string;
  selected?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

/** A selectable dye swatch painted from raw dye data (hex color, optional ice-dye image). */
const ColorSwatch: FC<Props> = ({
  hexCode,
  imageSrc,
  imageStyles,
  label,
  selected = false,
  onClick,
}) => {
  // Dye colors are runtime data, so they cannot be theme tokens.
  const style: CSSProperties = {
    backgroundColor: hexCode,
    backgroundImage: imageSrc ? `url(${imageSrc})` : undefined,
    ...imageStyles,
  };

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      style={style}
      className={`focus-ring flex size-full cursor-pointer flex-col justify-between overflow-hidden rounded-md border-2 p-1 transition-colors duration-fast ease-standard ${
        selected ? "border-foreground" : "border-transparent"
      }`}
    >
      <span className="mb-12 w-full rounded-sm bg-scrim px-1 py-2 text-start text-sm text-scrim-foreground">
        {label}
      </span>
    </button>
  );
};

export default ColorSwatch;
