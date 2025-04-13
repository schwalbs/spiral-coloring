import { type FC, type PropsWithChildren, useMemo, useState } from "react";
import AppStateContext, {
  type AppState,
  type AppStateData,
} from "./AppStateContext";

const AppStateContextProvider: FC<PropsWithChildren> = ({ children }) => {
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

export default AppStateContextProvider;
