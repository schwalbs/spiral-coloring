import { createContext, FC, PropsWithChildren, useMemo, useState } from "react";
import { Color, ColorStyle } from "../types/globals";

type SelectedColorContextState = {
  colorStyle: ColorStyle;
  selectedColor: Color | null;
  setColorStyle: (nextStyle: ColorStyle) => void;
  setSelectedColor: (nextColor: Color | null) => void;
};

export const SelectedColorContext = createContext<SelectedColorContextState>({
  colorStyle: "liquid",
  selectedColor: null,
  setColorStyle: () => {},
  setSelectedColor: () => {},
});

export const SelectedColorContextProvider: FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [colorStyle, setColorStyle] = useState<ColorStyle>("liquid");
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);

  const contextState = useMemo<SelectedColorContextState>(
    () => ({ colorStyle, selectedColor, setColorStyle, setSelectedColor }),
    [colorStyle, selectedColor],
  );

  return (
    <SelectedColorContext.Provider value={contextState}>
      {children}
    </SelectedColorContext.Provider>
  );
};
