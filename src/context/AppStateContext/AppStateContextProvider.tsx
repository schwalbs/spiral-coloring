import { type FC, type PropsWithChildren, useMemo, useState } from "react";
import AppStateContext, {
  type AppState,
  type AppStateData,
} from "./AppStateContext";
import { DEFAULT_APP_STATE_DATA } from "./constants";

type Props = {
  initialState?: Partial<AppStateData>;
};

const AppStateContextProvider: FC<PropsWithChildren<Props>> = ({
  initialState,
  children,
}) => {
  const [appStateData, setAppStateData] = useState<AppStateData>({
    ...DEFAULT_APP_STATE_DATA,
    ...initialState,
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
        spiralColors: (colors) => {
          setAppStateData((prevState) => ({
            ...prevState,
            shirt: {
              ...prevState.shirt,
              spirals: colors,
            },
          }));
        },
        spiralDirection: (direction) => {
          setAppStateData((prevState) => ({
            ...prevState,
            shirt: {
              ...prevState.shirt,
              spiralDirection: direction,
            },
          }));
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
