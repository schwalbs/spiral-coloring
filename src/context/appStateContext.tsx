import { createContext, FC, PropsWithChildren, useMemo, useState } from "react";
import { Color, ColorStyle } from "../types/globals";

type AppStateData = {
  dyeStyle: ColorStyle;
  selectedColor: Color | null;
  shirt: {
    numSpirals: number;
    spirals: Array<Color | undefined>;
  };
};

export type AppState = AppStateData & {
  set: {
    dyeStyle: (nextStyle: ColorStyle) => void;
    numSpirals: (numSpirals: number) => void;
    selectedColor: (nextColor: Color | null) => void;
    spiralColor: (spiralIndex: number, color: Color) => void;
  };
};

export const AppStateContext = createContext<AppState>({} as unknown as never);

export const AppStateContextProvider: FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [appStateData, setAppStateData] = useState<AppStateData>({
    dyeStyle: "liquid",
    selectedColor: null,
    shirt: {
      numSpirals: 2,
      spirals: [],
    },
  });

  const appState: AppState = useMemo(
    () => ({
      ...appStateData,
      set: {
        dyeStyle: (nextStyle) => {
          setAppStateData((prevState) => ({
            ...prevState,
            dyeStyle: nextStyle,
          }));
        },
        numSpirals: (numSpirals) => {
          setAppStateData((prevState) => ({
            ...prevState,
            shirt: {
              ...prevState.shirt,
              numSpirals,
            },
          }));
        },
        selectedColor: (nextColor) => {
          setAppStateData((prevState) => ({
            ...prevState,
            selectedColor: nextColor,
          }));
        },
        spiralColor: (spiralIndex, color) => {
          setAppStateData((prevState) => {
            const spiralsCopy = [...prevState.shirt.spirals];
            spiralsCopy[spiralIndex] = color;

            return {
              ...prevState,
              shirt: {
                ...prevState.shirt,
                spirals: spiralsCopy,
              },
            };
          });
        },
      },
    }),
    [appStateData],
  );

  return (
    <AppStateContext.Provider value={appState}>
      {children}
    </AppStateContext.Provider>
  );
};
